/* ==========================================================================
   Deliveries — behaviour.

   Four things here are the point of the run:

   1. The keyboard never covers the field or the button that submits it.
      pack/03-components.md - the most common bug in this domain, and the one
      a desktop browser hides.
   2. The queued write survives being offline, and announces a failure rather
      than quietly reverting.  pack/04-lifecycle.md + core/08-feedback.md
   3. Draft input is persisted on change, not on a timer, because the process
      can die between any two frames.  pack/04-lifecycle.md
   4. Every gesture has a visible equivalent, and the row action is present
      for every row at all times.  core/09-input.md
   ========================================================================== */

const STOPS = [
    { n: 12, name: 'Nguyễn Thị Mai', addr: '48 Lý Thường Kiệt, Hoàn Kiếm', win: '13:00–15:00', state: 'next' },
    { n: 13, name: 'Trần Quốc Bảo', addr: 'Tầng 4, 221 Trần Duy Hưng', win: '13:00–15:00', state: 'late' },
    { n: 14, name: 'Phạm Hồng Vân', addr: '9 Ngõ 12 Đào Tấn', win: '15:00–17:00', state: 'queued' },
    { n: 15, name: 'Lê Minh Đức', addr: 'Kho B, KCN Thăng Long', win: '15:00–17:00', state: 'queued' },
];

const LABEL = { next: 'Next', late: 'Late', queued: 'Scheduled', done: 'Delivered', pending: 'Queued to send' };

const $ = (id) => document.getElementById(id);
const rowsEl = $('rows');
const emptyEl = $('empty');

let offline = false;
let editing = null;
let pending = new Map();      // stop number -> the change waiting for a network
let undoTimer = null;

/* ── Rendering ─────────────────────────────────────────────────────────── */

function rowHtml(s) {
    const queued = pending.has(s.n);
    const state = queued ? 'queued' : s.state;
    const win = queued ? pending.get(s.n).win : s.win;
    return `
    <li class="row">
      <span class="row-stop" aria-hidden="true">${s.n}</span>
      <span class="row-body">
        <span class="row-headline">${s.name}</span>
        <span class="row-subhead">${s.addr}</span>
        <span class="row-meta">
          <span class="status" data-state="${state}">${queued ? LABEL.pending : LABEL[state]}</span>
          <span class="row-time">${win}</span>
        </span>
      </span>
      <button class="row-action" type="button" data-stop="${s.n}"
              aria-label="Reschedule stop ${s.n}, ${s.name}">Move</button>
    </li>`;
}

function render() {
    rowsEl.innerHTML = STOPS.map(rowHtml).join('');
    rowsEl.hidden = STOPS.length === 0;
    $('listFooter').hidden = STOPS.length === 0;
    emptyEl.hidden = STOPS.length !== 0;
    $('startBtn').disabled = STOPS.length === 0;
}

/* Three cases, worded differently. On a phone there is no side panel to put
   the action in, so it lives inside the empty state, in the reachable arc. */
function showEmpty(kind) {
    const copy = {
        none: ['Nothing assigned yet', 'Your route appears here once dispatch releases it.', 'Check for a route'],
        done: ['All stops done', 'Nice. Anything added later shows up here.', 'Check for more'],
        error: ['Could not load your stops', 'We reached the server and it refused. Nothing was lost.', 'Try again'],
    }[kind];
    $('emptyTitle').textContent = copy[0];
    $('emptyBody').textContent = copy[1];
    $('emptyAction').textContent = copy[2];
}

/* ── The keyboard ──────────────────────────────────────────────────────── */

/* The visual viewport shrinks when the software keyboard opens. Inset the
   sheet by the covered height so the focused field AND the button that
   submits it stay visible. This does not reproduce in a desktop browser or on
   a simulator with a hardware keyboard attached, which is exactly why it
   ships broken so often. */
function trackKeyboard() {
    const vv = window.visualViewport;
    if (!vv) return;
    const apply = () => {
        const covered = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        document.documentElement.style.setProperty('--keyboard', covered + 'px');
        $('sheet').style.paddingBottom = covered ? covered + 'px' : '';
        if (covered && document.activeElement) {
            document.activeElement.scrollIntoView({ block: 'nearest' });
        }
    };
    vv.addEventListener('resize', apply);
    vv.addEventListener('scroll', apply);
}

/* ── The sheet ─────────────────────────────────────────────────────────── */

function openSheet(stopNumber) {
    const s = STOPS.find((x) => x.n === stopNumber);
    editing = s;
    $('sheetStop').textContent = `Stop ${s.n} — ${s.name}`;
    $('windowField').value = (pending.get(s.n) || s).win;

    /* Restore a draft note the process may have been killed in the middle of. */
    $('noteField').value = readDraft(s.n);

    $('sheet').classList.add('is-open');
    $('sheet').setAttribute('aria-hidden', 'false');
    $('scrim').classList.add('is-open');
    $('sheetCancel').focus();
}

function closeSheet() {
    $('sheet').classList.remove('is-open');
    $('sheet').setAttribute('aria-hidden', 'true');
    $('scrim').classList.remove('is-open');
    const btn = document.querySelector(`[data-stop="${editing?.n}"]`);
    editing = null;
    if (btn) btn.focus();
}

/* Save on change, not on a timer. A thirty-second autosave loses twenty-nine
   seconds of typing at the worst possible moment. */
function saveDraft(n, text) {
    try { localStorage.setItem(`app.note.${n}`, text); } catch (_e) { }
}

function readDraft(n) {
    try { return localStorage.getItem(`app.note.${n}`) || ''; } catch (_e) { return ''; }
}

function clearDraft(n) {
    try { localStorage.removeItem(`app.note.${n}`); } catch (_e) { }
}

/* ── The write ─────────────────────────────────────────────────────────── */

/* Optimistic, and it qualifies on core's three counts: it nearly always
   succeeds, nothing downstream has acted on it, and it is reversible here.
   So what it owes is an announced rollback - and, offline, an honest "queued"
   rather than a success it cannot claim. */
function commit(stopNumber, win) {
    return new Promise((resolve, reject) => {
        if (offline) { resolve('queued'); return; }
        setTimeout(() => {
            if (stopNumber === 13) reject(new Error('dispatch has locked this stop'));
            else resolve('sent');
        }, 400);
    });
}

function reschedule() {
    const phone = $('phoneField').value.trim();
    if (phone.replace(/\D/g, '').length < 8) {
        $('phoneError').hidden = false;
        $('phoneField').setAttribute('aria-invalid', 'true');
        $('phoneField').focus();
        return;
    }
    $('phoneError').hidden = true;
    $('phoneField').removeAttribute('aria-invalid');

    const s = editing;
    const win = $('windowField').value;
    const previous = { win: s.win, state: s.state };

    pending.set(s.n, { win });
    clearDraft(s.n);
    closeSheet();
    render();
    refreshOfflineBanner();

    commit(s.n, win).then((how) => {
        if (how === 'sent') {
            s.win = win;
            s.state = 'queued';
            pending.delete(s.n);
            render();
            snack(`Stop ${s.n} moved to ${win}`, () => {
                s.win = previous.win;
                s.state = previous.state;
                render();
            });
        } else {
            /* Offline: it stays visibly queued. Never claim it was sent. */
            snack(`Stop ${s.n} will move when you are back online`, () => {
                pending.delete(s.n);
                render();
                refreshOfflineBanner();
            });
        }
        refreshOfflineBanner();
    }).catch((err) => {
        /* Restore it, say what failed, leave them able to retry. Reverting
           quietly is the one outcome worse than not being optimistic. */
        pending.delete(s.n);
        render();
        refreshOfflineBanner();
        snack(`Stop ${s.n} was not moved: ${err.message}`, null);
        const btn = document.querySelector(`[data-stop="${s.n}"]`);
        if (btn) btn.focus();
    });
}

function refreshOfflineBanner() {
    const banner = $('offlineBanner');
    if (!offline && pending.size === 0) { banner.hidden = true; return; }
    banner.hidden = false;
    $('offlineText').textContent = offline
        ? (pending.size
            ? `Offline — ${pending.size} change${pending.size > 1 ? 's' : ''} queued, showing stops from 08:12`
            : 'Offline — showing stops from 08:12')
        : `Sending ${pending.size} queued change${pending.size > 1 ? 's' : ''}`;
}

/* ── Snackbar ──────────────────────────────────────────────────────────── */

function snack(text, onUndo) {
    $('snackbarText').textContent = text;
    $('snackbarUndo').hidden = !onUndo;
    $('snackbarUndo').onclick = onUndo
        ? () => { onUndo(); hideSnack(); refreshOfflineBanner(); }
        : null;
    $('snackbar').classList.add('is-open');
    clearTimeout(undoTimer);
    undoTimer = setTimeout(hideSnack, 6000);
}

const hideSnack = () => $('snackbar').classList.remove('is-open');

/* ── Wiring ────────────────────────────────────────────────────────────── */

rowsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-stop]');
    if (btn) openSheet(Number(btn.dataset.stop));
});

$('sheetCancel').addEventListener('click', closeSheet);
$('scrim').addEventListener('click', closeSheet);
$('sheetConfirm').addEventListener('click', reschedule);
$('noteField').addEventListener('input', (e) => editing && saveDraft(editing.n, e.target.value));

/* The system back gesture, and its visible equivalent, close the same thing. */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editing) closeSheet();
});

/* Tabs preserve which one you were on across a relaunch. */
document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.tab').forEach((t) => t.removeAttribute('aria-current'));
        tab.setAttribute('aria-current', 'page');
        try { localStorage.setItem('app.tab', tab.dataset.tab); } catch (_e) { }
    });
});

/* A demo affordance for the run: toggle the network to exercise the queue. */
$('refreshBtn').addEventListener('click', () => {
    offline = !offline;
    refreshOfflineBanner();
    snack(offline ? 'Simulating offline' : 'Back online', null);
    if (!offline && pending.size) {
        setTimeout(() => {
            for (const [n, change] of pending) {
                const s = STOPS.find((x) => x.n === n);
                if (s) { s.win = change.win; s.state = 'queued'; }
            }
            pending.clear();
            render();
            refreshOfflineBanner();
            snack('Queued changes sent', null);
        }, 600);
    }
});

$('startBtn').addEventListener('click', () => {
    const s = STOPS.shift();
    render();
    if (STOPS.length === 0) showEmpty('done');
    snack(`Stop ${s.n} marked delivered`, () => { STOPS.unshift(s); render(); });
});

$('emptyAction').addEventListener('click', () => snack('Checked — nothing new', null));

trackKeyboard();
showEmpty('done');
render();
refreshOfflineBanner();
