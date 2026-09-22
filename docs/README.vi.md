# UI Design Ecosystem

**Các hệ thiết kế giao diện theo từng lĩnh vực, đóng gói thành skill cho Claude, Gemini và GPT.**

[![License: MIT](https://img.shields.io/badge/License-MIT-b3121b.svg)](../LICENSE)
[![Packs](https://img.shields.io/badge/packs-1%20stable-b3121b.svg)](#các-pack)
[![Build](https://img.shields.io/badge/dist-generated-b3121b.svg)](ARCHITECTURE.md)

🌐 [English](../README.md) · **Tiếng Việt**

---

Nhờ một trợ lý AI dựng trang admin, thường nhận lại một dashboard kiểu SaaS tiêu
dùng: khoảng trắng rộng, card pastel, mỗi module một màu. Nhờ nó dựng landing
page, nhiều khi cũng ra đúng thứ đó. Kết quả hội tụ vì trợ lý không có lập trường
về việc nó đang dựng *loại* giao diện nào.

Repo này đưa cho nó một lập trường. Mỗi **pack** là một hệ thiết kế cho một lĩnh
vực cụ thể, mang một luận điểm mà lĩnh vực khác sẽ bác bỏ — kèm token, số đo, và
lý do để hành động theo.

## Các pack

| Pack | Lĩnh vực | Trạng thái |
|---|---|---|
| [`erp`](../packs/erp/) | **ERP & back-office** — admin panel, console vận hành, dashboard nội bộ. Mật độ cao, chrome tối, content trắng. | `stable` |

Dự kiến, theo thứ tự tạm: consumer web, SaaS dashboard, mobile app, e-commerce,
desktop & tiện ích hệ thống, trang tài liệu. Chưa pack nào bắt đầu — em dựng nền
trước có chủ đích, để pack thứ hai tốn một phần nhỏ so với pack đầu. Xem
[`AUTHORING.md`](AUTHORING.md) để thêm pack mới.

## Cài đặt

Mọi thứ cài được nằm trong [`dist/`](../dist/), đã sinh sẵn và commit vào repo —
không cần chạy Node để dùng.

<details open>
<summary><b>Claude Code / Claude Desktop</b> — bản đầy đủ nhất</summary>

```bash
cp -r ./dist/claude/erp-ui-design ~/.claude/skills/erp-ui-design    # mọi dự án
cp -r ./dist/claude/erp-ui-design <dự-án>/.claude/skills/           # một dự án
```

```powershell
Copy-Item -Recurse ".\dist\claude\erp-ui-design" "$HOME\.claude\skills\erp-ui-design"
```

Claude tự gọi khi gặp việc liên quan, hoặc gọi tay bằng `/erp-ui-design`. Bản này
mang nhiều chi tiết nhất: Claude đọc `SKILL.md` trước rồi chỉ nạp file reference
nào cần, nên phần reference đi sâu được hơn mức một file phẳng cho phép.
</details>

<details>
<summary><b>Gemini</b> (CLI, Code Assist, Gems)</summary>

```bash
cp ./dist/gemini/erp.GEMINI.md ~/.gemini/GEMINI.md      # toàn cục
cp ./dist/gemini/erp.GEMINI.md <dự-án>/GEMINI.md        # theo dự án
```

Với **Gem**: dán toàn bộ file vào ô Instructions.
</details>

<details>
<summary><b>GPT</b> (Codex, Cursor, Custom GPT)</summary>

```bash
cp ./dist/gpt/erp.AGENTS.md <dự-án>/AGENTS.md
```

Nếu dự án đã có `AGENTS.md`, gộp các mục vào dưới heading `## UI`.

Với **Custom GPT**: dán khối trong dấu nháy từ
[`dist/gpt/erp.custom-gpt-instructions.md`](../dist/gpt/erp.custom-gpt-instructions.md)
vào ô **Instructions**, rồi upload
[`dist/gpt/erp.AGENTS.md`](../dist/gpt/erp.AGENTS.md) làm file **Knowledge**.

Tách đôi là cố ý. Ô Instructions giới hạn 8000 ký tự giữ phần **phán đoán** — hệ
thống phục vụ gì, từ chối gì, và những luật model hay nhớ sai. File Knowledge giữ
**số đo chính xác**. Một model đọc thang spacing từ trí nhớ sẽ cho ra thứ *gần
đúng*, mà gần đúng thì tệ hơn sai hẳn — nên instructions bắt nó trích dẫn thay vì
tự nhớ.
</details>

## Cách nó được dựng

```
core/            luật đúng cho MỌI giao diện    ─┐
packs/<id>/      thứ MỘT lĩnh vực quyết định     ├─→ tools/build.mjs ─→ dist/
                                                 ─┘
```

Tám lĩnh vực nhân ba định dạng trợ lý là hai mươi tư tài liệu phải bảo trì tay,
phần lớn nội dung trùng nhau, và chúng sẽ lệch nhau trong im lặng. Nên mỗi pack
chỉ viết một lần — luật core cộng lớp phủ lĩnh vực — còn mọi định dạng đều sinh
tự động.

**Core giữ phương pháp, không giữ giá trị.** "Mỗi màu nhấn cần một giá trị cho
mỗi bề mặt" là core; `#b3121b` thì không. Build ép buộc điều này: một mã màu cứng
nằm trong đoạn văn của core sẽ làm build fail.

**Một pack không bao giờ lặp lại luật của core.** Nó trỏ tới và chỉ thêm hệ quả
riêng của lĩnh vực. Pack được phép *override* một luật core, với điều kiện khai
báo và biện hộ — mâu thuẫn trong im lặng mới là thứ giết một hệ như thế này.

```bash
npm run build     # sinh lại dist/
npm run check     # validate + kiểm dist/ có còn khớp nguồn (CI chạy cái này)
```

Lý do đầy đủ, và các quyết định còn bỏ ngỏ, nằm trong
[`ARCHITECTURE.md`](ARCHITECTURE.md).

## Core ép tuân thủ gì, dù bạn đang dựng cái gì

Khoảng tám mươi luật trải trên token, typography, layout, motion, accessibility,
i18n, charts và review — mỗi luật kèm hệ quả. Vài ví dụ:

- **Mỗi màu nhấn cần một giá trị cho mỗi bề mặt.** Màu thương hiệu chọn để đọc
  trên nền trắng sẽ tàng hình trên nền gần đen. Lỗi phổ biến nhất của giao diện
  chrome tối là tab đang chọn tô bằng màu nhấn của nền sáng — đúng brand, không
  thấy gì.
- **`font-variant-numeric: tabular-nums` cho mọi con số.** Chữ số tỉ lệ làm một
  cột số nhảy sóng mỗi lần refresh.
- **`min-width: 0` cho grid child.** Mặc định là `min-width: auto`, nên một table
  rộng sẽ kéo giãn track và đẩy navigation ra khỏi màn hình.
- **Phục hồi trạng thái trước lần paint đầu.** Sidebar thu gọn hay ngôn ngữ đã
  chọn mà áp sau khi paint thì người dùng thấy layout tự sửa ở mỗi lần điều hướng.
- **`opacity: revert` dưới `prefers-reduced-motion` không trả lại giá trị của
  bạn.** Nó lùi về mặc định của trình duyệt là `1`.
- **Trục giá trị bắt đầu từ 0 khi so sánh độ lớn.** Một trục bị cắt sẽ sống lâu
  hơn cuộc trò chuyện lẽ ra đã giải thích cho nó.

## Bộ này KHÔNG phải gì

Không phải component library. Không có file React, không có gì để `npm install`
như một dependency, không có Tailwind config. Nó là một **đặc tả** — token, số
đo, lý do — để trợ lý sinh code khớp hệ thiết kế bằng framework nào cũng được.

Đổi lại: nó không bao giờ lệch phiên bản với runtime, và dùng cho HTML thuần dễ
như dùng cho React.

## Về nội dung

Mọi token, số đo và đoạn code trong pack `erp` được đọc ra từ code đang chạy,
không phải bịa. Phần failure modes cũng là thật — mỗi mục đều đã xảy ra, gồm cả
palette drift trong chính các trang cũ của hệ nguồn. Một tài liệu chỉ ghi lại
phần đã đánh bóng sẽ không giúp ai tránh được cái bẫy đã sập.

Thứ **chưa** được kiểm chứng là phần đóng gói: chưa ai cài bản skill sinh ra rồi
dựng một màn hình từ đầu đến cuối bằng nó. Hãy coi phần trải nghiệm sử dụng là
chưa xác minh cho tới khi đó.

## Góp ý

Issue và pull request đều hoan nghênh, tiếng Anh hoặc tiếng Việt.

Tiêu chuẩn cho một luật mới là **lý do**, không phải sở thích — nếu bạn nói được
điều gì sẽ hỏng khi thiếu nó, tốt nhất là điều bạn đã tận mắt thấy hỏng, thì nó
thuộc về đây. Tiêu chuẩn cho một pack mới là **một luận điểm mà lĩnh vực khác sẽ
bác bỏ**; xem [`AUTHORING.md`](AUTHORING.md).

Sửa ở `core/` hoặc `packs/`, không bao giờ sửa `dist/`. Chạy `npm run build` rồi
commit kết quả; CI sẽ fail pull request nào có `dist/` lệch nguồn.

## Giấy phép

MIT — xem [LICENSE](../LICENSE). Dùng, sửa, phát hành lại, kể cả cho mục đích
thương mại; chỉ cần giữ dòng bản quyền.
