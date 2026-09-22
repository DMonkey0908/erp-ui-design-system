/* ==========================================================================
   Goods receipt list — behaviour.

   Three things here are the point of the run, and each is a rule that is easy
   to have available and not apply:

   1. The waiting affordance is picked from the measured wait, not from how
      important the action feels.  core/08-feedback.md
   2. The optimistic hold announces its own rollback.  core/08-feedback.md
   3. Nothing lives behind hover, so the row action is in the DOM for every
      row at all times.  core/09-input.md
   ========================================================================== */

const RECEIPTS = [
    { id: 'GR-24817', supplier: 'Halvorsen Logistikk AS', warehouse: 'Rotterdam', state: 'received', lines: 42, value: 38420 },
    { id: 'GR-24818', supplier: 'Bergmann Verpackungen GmbH', warehouse: 'Duisburg', state: 'partial', lines: 17, value: 11250 },
    { id: 'GR-24819', supplier: 'Zakład Produkcyjny Wiśniewski', warehouse: 'Gdańsk', state: 'discrepancy', lines: 8, value: 4180 },
    { id: 'GR-24820', supplier: 'Halvorsen Logistikk AS', warehouse: 'Rotterdam', state: 'received', lines: 96, value: 72300 },
    { id: 'GR-24821', supplier: 'Cie. Maritime de Fos-sur-Mer', warehouse: 'Rotterdam', state: 'received', lines: 5, value: 2940 },
    { id: 'GR-24822', supplier: 'Bergmann Verpackungen GmbH', warehouse: 'Duisburg', state: 'partial', lines: 23, value: 15870 },
    { id: 'GR-24823', supplier: 'Nordfracht Spedition', warehouse: 'Gdańsk', state: 'received', lines: 61, value: 29610 },
    { id: 'GR-24824', supplier: 'Nordfracht Spedition', warehouse: 'Duisburg', state: 'discrepancy', lines: 12, value: 6480 },
];

const STATE_LABEL = {
    received: 'Received',
    partial: 'Partial',
    discrepancy: 'Discrepancy',
    'on-hold': 'On hold',
};

const held = new Set();

const $ = (id) => document.getElementById(id);
const rowsEl = $('rows');
const emptyEl = $('empty');
const noteEl = $('filterNote');
const clearEl = $('filterClear');

/* Intl, not string concatenation — core/06-i18n.md. Read the document's own
   language so a switched locale formats too. */
const nf = new Intl.NumberFormat(document.documentElement.lang || 'en');

let loadState = 'ready';   /* ready | loading | error */

/* ── Filtering ─────────────────────────────────────────────────────────── */

function activeFilters() {
    return {
        state: $('filterState').value,
        warehouse: $('filterWarehouse').value,
        q: $('filterSearch').value.trim().toLowerCase(),
    };
}

function visibleState(r) {
    return held.has(r.id) ? 'on-hold' : r.state;
}

function matches(r, f) {
    if (f.state && visibleState(r) !== f.state) return false;
    if (f.warehouse && r.warehouse !== f.warehouse) return false;
    if (f.q && !(r.id + ' ' + r.supplier).toLowerCase().includes(f.q)) return false;
    return true;
}

/* ── Rendering ─────────────────────────────────────────────────────────── */

function rowHtml(r) {
    const state = visibleState(r);
    const isHeld = state === 'on-hold';
    return `
    <tr data-id="${r.id}">
      <td><span class="receipt-id">${r.id}</span></td>
      <td class="truncate" title="${r.supplier}">${r.supplier}</td>
      <td>${r.warehouse}</td>
      <td><span class="pill" data-state="${state}">${STATE_LABEL[state]}</span></td>
      <td class="num">${nf.format(r.lines)}</td>
      <td class="num">${nf.format(r.value)}</td>
      <td class="col-action">
        <button class="row-action" type="button" data-hold="${r.id}"
                aria-pressed="${isHeld}"${inFlight.has(r.id) ? ' disabled' : ''}>${isHeld ? 'Release' : 'Hold'}</button>
      </td>
    </tr>`;
}

/* The three empty cases are worded differently on purpose. Collapsing them
   into "No data" wastes the only moment the screen had the user's attention. */
function showEmpty(kind, detail) {
    const copy = {
        none: ['No receipts booked yet today', 'Book a delivery against a purchase order and it appears here.'],
        filtered: ['No receipt matches these filters', 'Widen the state or warehouse filter, or clear the search.'],
        error: ['The receipt list could not be loaded', detail || ''],
    }[kind];

    emptyEl.dataset.case = kind;
    emptyEl.innerHTML = `<strong>${copy[0]}</strong>${copy[1]}`;
    emptyEl.hidden = false;
}

function render() {
    if (loadState === 'loading') return;

    const f = activeFilters();
    const filtering = Boolean(f.state || f.warehouse || f.q);
    const list = RECEIPTS.filter((r) => matches(r, f));

    rowsEl.innerHTML = list.map(rowHtml).join('');

    emptyEl.hidden = true;
    if (list.length === 0) {
        showEmpty(RECEIPTS.length === 0 ? 'none' : 'filtered');
    }

    /* The live count, in a polite region: a screen reader user filters and
       otherwise hears nothing. core/05-accessibility.md */
    noteEl.textContent = filtering
        ? `${nf.format(list.length)} of ${nf.format(RECEIPTS.length)} receipts match`
        : `${nf.format(RECEIPTS.length)} receipts`;

    clearEl.hidden = !filtering;
}

/* ── Waiting ───────────────────────────────────────────────────────────── */

/* Skeleton rows at the real dimensions of what they replace. A spinner in a
   zero-height box guarantees the jump this exists to prevent. */
function skeletonRows(n) {
    const cell = (cls) => `<td><span class="skeleton-cell ${cls || ''}"></span></td>`;
    let out = '';
    for (let i = 0; i < n; i++) {
        out += '<tr aria-hidden="true">'
            + cell('is-short')
            + cell()
            + cell('is-short')
            + cell('is-short')
            + cell('is-right')
            + cell('is-right')
            + cell('is-short')
            + '</tr>';
    }
    return out;
}

function refresh() {
    const btn = $('refreshBtn');
    const started = Date.now();

    loadState = 'loading';
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
    emptyEl.hidden = true;
    noteEl.textContent = 'Loading receipts';

    /* The skeleton is only owed past a second. Below that it would appear and
       vanish, which reads as a stutter in an interface that was fast. So it
       is scheduled, not rendered immediately, and cancelled if the answer
       beats it. */
    const skeletonAt = setTimeout(() => {
        rowsEl.innerHTML = skeletonRows(RECEIPTS.length);
    }, 300);

    window.setTimeout(() => {
        clearTimeout(skeletonAt);
        loadState = 'ready';
        btn.removeAttribute('aria-busy');
        btn.disabled = false;
        render();
        /* Finish deliberately: an action that ends by having the busy state
           stop has no ending. */
        noteEl.textContent += ` · refreshed ${new Date().toLocaleTimeString(document.documentElement.lang || 'en')}`;
        void started;
    }, 1200);
}

/* ── The optimistic hold ───────────────────────────────────────────────── */

/* It qualifies on all three counts: it nearly always succeeds, nothing
   downstream has acted on it, and it is reversible here without a reload.
   What it therefore owes is an announced rollback. */

let toastTimer = null;

function announce(title, body) {
    const toast = $('toast');
    $('toastTitle').textContent = title;
    $('toastBody').textContent = body;
    toast.hidden = false;
    /* Next frame, so the transition has a start state to run from. */
    requestAnimationFrame(() => toast.classList.add('is-open'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(dismissToast, 8000);
}

function dismissToast() {
    const toast = $('toast');
    toast.classList.remove('is-open');
    clearTimeout(toastTimer);
    setTimeout(() => { toast.hidden = true; }, 200);
}

function commitHold(id, wantHeld) {
    /* Stand-in for the request. One receipt is rigged to fail, so the
       rollback path is exercised rather than assumed. */
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 'GR-24819' && wantHeld) {
                reject(new Error('receipt is mid-count at the dock'));
            } else {
                resolve();
            }
        }, 450);
    });
}

const inFlight = new Set();

function toggleHold(id) {
    /* A second click while the first is in flight would race the rollback and
       leave the row showing whichever request happened to land last. */
    if (inFlight.has(id)) return;
    inFlight.add(id);

    const wantHeld = !held.has(id);

    /* Render the new state immediately, keeping the previous one. */
    if (wantHeld) held.add(id); else held.delete(id);
    render();

    commitHold(id, wantHeld).then(() => {
        inFlight.delete(id);
        render();
    }).catch((err) => {
        inFlight.delete(id);
        /* Restore it, say what failed, and leave the user able to retry.
           Reverting quietly is the one thing that is worse than not having
           been optimistic at all. */
        if (wantHeld) held.delete(id); else held.add(id);
        render();
        announce(
            `${id} was not put on hold`,
            `The server refused: ${err.message}. Nothing changed — you can try again.`
        );
        const btn = document.querySelector(`[data-hold="${id}"]`);
        if (btn) btn.focus();
    });
}

/* ── Wiring ────────────────────────────────────────────────────────────── */

['filterState', 'filterWarehouse', 'filterSearch'].forEach((id) => {
    $(id).addEventListener('input', render);
});

clearEl.addEventListener('click', () => {
    $('filterState').value = '';
    $('filterWarehouse').value = '';
    $('filterSearch').value = '';
    render();
    $('filterSearch').focus();
});

rowsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-hold]');
    if (btn) toggleHold(btn.dataset.hold);
});

/* A full navigation to the current URL re-runs every page script and throws
   away unsaved state. pack/02-shell.md */
document.querySelector('.sidebar-nav').addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (item && item.classList.contains('is-active')) e.preventDefault();
});

/* The account menu. Opening it moves focus in; Escape closes it and gives
   focus back to the trigger. */
const menuBtn = $('userMenuBtn');
const menuEl = $('userMenu');

function setMenu(open) {
    menuEl.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) menuEl.querySelector('.dropdown-item').focus();
}

menuBtn.addEventListener('click', () => {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('click', (e) => {
    if (!menuEl.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});

$('refreshBtn').addEventListener('click', refresh);
$('toastClose').addEventListener('click', dismissToast);

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    dismissToast();
    if (menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
    }
});

/* Sidebar collapse: the class goes on <html> so the pre-paint script and the
   runtime toggle agree on which element owns the state. */
$('sidebarToggle').addEventListener('click', () => {
    const collapsed = document.documentElement.classList.toggle('sb-collapsed');
    $('sidebarToggle').setAttribute('aria-expanded', String(!collapsed));
    $('sidebarToggle').querySelector('.toggle-label').textContent = collapsed ? 'Expand' : 'Collapse';
    try {
        localStorage.setItem('app.sidebar.collapsed', collapsed ? '1' : '0');
    } catch (_e) { /* storage unavailable */ }
});

/* Never animate on resize: a grid-template transition plus a window drag is a
   visibly lagging interface. core/04-motion.md */
let resizeTimer = null;
window.addEventListener('resize', () => {
    const shell = $('shell');
    shell.classList.add('is-resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => shell.classList.remove('is-resizing'), 150);
});

/* Keep the toggle's label honest with whatever the pre-paint script decided. */
(function syncToggle() {
    const collapsed = document.documentElement.classList.contains('sb-collapsed');
    $('sidebarToggle').setAttribute('aria-expanded', String(!collapsed));
    $('sidebarToggle').querySelector('.toggle-label').textContent = collapsed ? 'Expand' : 'Collapse';
})();

render();
