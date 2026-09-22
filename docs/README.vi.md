# ERP UI Design System

**Hệ thiết kế giao diện cho phần mềm nghiệp vụ mật độ cao, nền chrome tối — đóng gói thành skill cho Claude, Gemini và GPT.**

[![License: MIT](https://img.shields.io/badge/License-MIT-b3121b.svg)](../LICENSE)
[![Claude Skill](https://img.shields.io/badge/Claude-Skill-b3121b.svg)](../claude/erp-ui-design/SKILL.md)
[![GEMINI.md](https://img.shields.io/badge/Gemini-GEMINI.md-b3121b.svg)](../gemini/GEMINI.md)
[![AGENTS.md](https://img.shields.io/badge/GPT-AGENTS.md-b3121b.svg)](../gpt/AGENTS.md)

🌐 [English](../README.md) · **Tiếng Việt**

---

Nhờ một trợ lý AI dựng trang admin, thường nhận lại một dashboard kiểu SaaS tiêu
dùng: khoảng trắng rộng, card màu pastel, mỗi module một màu. Nhìn ảnh chụp thì
dễ chịu, nhưng sai việc. Phần mềm nội bộ được dùng tám tiếng một ngày bởi những
người đã được đào tạo để dùng nó.

Repo này đưa cho trợ lý thứ còn lại — token, số đo, và lý do đằng sau một front
end ERP thật — để nó sinh ra phần mềm vận hành thay vì phần mềm để ngắm. Rút từ
một hệ đang chạy production, không phải bịa ra cho demo.

## Ý tưởng cốt lõi

> **Chrome tối, content trắng, màu nhấn chỉ để báo trạng thái và hành động.**

Sidebar và topbar gần đen, lùi ra sau. Mọi bề mặt chứa thứ người dùng đọc, so
sánh hoặc sửa — card, table, dropdown, form — đều trắng. Một màu nhấn duy nhất
đánh dấu tab đang chọn, nút chính, và series trên biểu đồ. Hết.

Dashboard tiêu dùng dùng màu để tạo cảm xúc. ERP dùng màu như **tín hiệu** — để
khi có gì đó đỏ lên thì nó thật sự có nghĩa. Tiêu màu nhấn vào trang trí là tiêu
mất công cụ duy nhất để nói "nhìn chỗ này".

Toàn bộ hệ thống tối ưu cho **lần dùng thứ hai trăm**, không phải ấn tượng đầu.

## Bắt đầu nhanh

Clone về, rồi chạy dòng tương ứng với trợ lý của bạn từ gốc repo.

<details open>
<summary><b>Claude Code / Claude Desktop</b> — bản đầy đủ nhất</summary>

```bash
# Dùng cho mọi dự án
cp -r ./claude/erp-ui-design ~/.claude/skills/erp-ui-design

# Hoặc chỉ một dự án
cp -r ./claude/erp-ui-design <dự-án-của-bạn>/.claude/skills/erp-ui-design
```

```powershell
# Windows
Copy-Item -Recurse ".\claude\erp-ui-design" "$HOME\.claude\skills\erp-ui-design"
```

Claude tự gọi skill khi gặp việc liên quan — dựng admin panel, review giao diện
nội bộ, thiết kế dashboard vận hành. Gọi tay bằng `/erp-ui-design`.

Bản này mang nhiều chi tiết nhất. Claude đọc `SKILL.md` trước, rồi chỉ nạp file
reference nào cần cho việc đang làm, nên phần reference có thể đi sâu hơn mức
một file phẳng cho phép.
</details>

<details>
<summary><b>Gemini</b> (CLI, Code Assist, Gems)</summary>

```bash
cp ./gemini/GEMINI.md ~/.gemini/GEMINI.md            # toàn cục
cp ./gemini/GEMINI.md <dự-án-của-bạn>/GEMINI.md      # theo dự án
```

Với **Gem**: dán toàn bộ nội dung file vào ô Instructions.
</details>

<details>
<summary><b>GPT</b> (Codex, Cursor, Custom GPT)</summary>

```bash
cp ./gpt/AGENTS.md <dự-án-của-bạn>/AGENTS.md
```

Nếu dự án đã có `AGENTS.md`, gộp các mục vào dưới một heading `## UI`.

Với **Custom GPT**: dán khối trong dấu nháy từ
[`gpt/custom-gpt-instructions.md`](../gpt/custom-gpt-instructions.md) vào ô
**Instructions**, rồi upload [`gpt/AGENTS.md`](../gpt/AGENTS.md) làm file
**Knowledge**.

Việc tách đôi này là cố ý. Ô Instructions giới hạn 8000 ký tự giữ phần **phán
đoán** — hệ thống phục vụ mục đích gì, từ chối gì, và những luật mà model hay
nhớ sai. File Knowledge giữ phần **số đo chính xác**. Một model đọc thang spacing
từ trí nhớ sẽ cho ra thứ *gần đúng*, mà gần đúng thì tệ hơn sai hẳn — nên phần
instructions bắt nó trích dẫn thay vì tự nhớ lại.
</details>

## Bên trong có gì

```
erp-ui-design-system/
├── claude/erp-ui-design/            ← bản gốc, chi tiết nhất
│   ├── SKILL.md                     nguyên tắc + mở file reference nào
│   ├── references/
│   │   ├── 01-foundations.md        token, thang chữ, spacing, radius, motion
│   │   ├── 02-shell.md              grid layout, sidebar, topbar, responsive, i18n
│   │   ├── 03-components.md         card, button, form, table, tile, pill, tooltip
│   │   ├── 04-charts.md             SVG chart, gradient theo thang giá trị, a11y
│   │   └── 05-checklist.md          checklist review + các lỗi đã gặp thật
│   └── assets/
│       ├── theme.css                file token — copy thẳng vào dự án mới
│       └── shell-skeleton.html      khung trang, kèm script chống nhấp nháy
├── gemini/GEMINI.md                 bản gộp một file
└── gpt/
    ├── AGENTS.md                    bản gộp một file
    └── custom-gpt-instructions.md   bản 7997 ký tự cho Custom GPT
```

`claude/erp-ui-design/references/` là **bản gốc**. `GEMINI.md` và `AGENTS.md`
giống hệt nhau về nội dung — cùng một hệ thiết kế, hai tên file, vì hai công cụ
tìm hai tên khác nhau. Sửa ở references trước, rồi đồng bộ sang hai bản gộp; bản
Custom GPT rút gọn thì sửa tay.

## Một vài luật nó bắt tuân thủ

Khoảng ba mươi luật, mỗi luật kèm lý do. Vài luật đổi kết quả ngay lập tức:

- **Mỗi màu nhấn cần hai giá trị, một cho mỗi bề mặt.** Màu thương hiệu chọn để
  đọc trên nền trắng sẽ tàng hình trên nền gần đen. Lỗi phổ biến nhất của ERP
  nền tối là tab đang chọn tô bằng màu nhấn của nền trắng — đúng brand, và không
  thấy gì.
- **`font-variant-numeric: tabular-nums` cho mọi con số.** Chữ số tỉ lệ làm một
  cột số nhảy sóng mỗi lần refresh. Đây là dòng CSS đáng giá nhất trong cả hệ.
- **Chừa sẵn viền active trên mọi dòng.** Viền trái chỉ thêm cho dòng đang chọn
  sẽ làm mọi label nhảy ngang khi đổi lựa chọn.
- **`min-width: 0` cho grid item.** Grid child mặc định `min-width: auto`, nên
  một table rộng sẽ kéo giãn cột và đẩy sidebar ra khỏi màn hình.
- **Phục hồi trạng thái trước lần paint đầu.** Sidebar thu gọn hay label đã dịch
  mà áp sau khi paint thì người dùng sẽ thấy layout tự sửa lại ở mỗi lần điều
  hướng.
- **Danger không phải màu thương hiệu.** Khi brand là đỏ, một lỗi tô đỏ brand
  không phân biệt được với nút chính.

## Dành cho sản phẩm đa ngôn ngữ

Phần shell coi i18n là chuyện cấu trúc, không phải việc làm sau: đánh dấu node
thay vì template chuỗi, giữ ngôn ngữ gốc trong HTML để trang vẫn đọc và review
được khi chưa chạy lớp dịch, một lớp chắn trước khi paint để trang đã dịch không
nhấp nháy tiếng Anh trước, và chừa khoảng 35% chiều rộng cho các ngôn ngữ dài
hơn tiếng Anh.

## Đổi màu thương hiệu

Bộ này để sẵn một sắc crimson (`#b3121b`) làm màu nhấn mẫu.

1. Sửa cụm `--brand*` ở đầu `assets/theme.css`.
2. **Tính lại `--brand-on-dark`** — bước hay bị bỏ qua nhất. Đây là *cùng một*
   màu thương hiệu, được đẩy sáng lên tới mức đọc được trên nền gần đen.
   `#b3121b` trên `#0a0a0c` là không đọc được. Mọi màu nhấn đều cần cả hai.
3. Tính lại các bậc alpha `--brand-a08` … `--brand-a35` từ RGB mới.
4. Nếu màu thương hiệu mới là **xanh dương**, đảo luật "info không dùng xanh" —
   lúc đó info chuyển sang xám trung tính.

Không file nào khác cần đụng tới.

## Bộ này KHÔNG phải gì

Nó không phải component library. Không có file React, không có gì để
`npm install`, không có Tailwind config. Nó là một **đặc tả** — token, số đo, và
lý do — để trợ lý sinh ra code khớp với hệ thiết kế, bằng framework nào cũng
được.

Đổi lại: nó không bao giờ lệch phiên bản với runtime, và dùng cho HTML thuần dễ
như dùng cho React.

## Về nội dung

Mọi token, số đo và đoạn code trong bộ này được đọc ra từ code đang chạy, không
phải bịa. Phần failure modes trong `05-checklist.md` cũng là thật — mỗi mục đều
đã xảy ra, gồm cả:

- màu nhấn dùng sai bề mặt (tab active tàng hình trên sidebar tối)
- viền chỉ thêm khi active, làm mọi label nhảy 3px
- `opacity: revert` dưới `prefers-reduced-motion` âm thầm thành `1`
- gradient vùng để mặc định `objectBoundingBox`, khiến hai biểu đồ khác hẳn độ
  lớn trông y như nhau
- **palette drift** — các trang viết trước khi có file token vẫn còn hex thô
  (`#e0e7ff`, `#3730a3`): một màu indigo không tồn tại trong bảng màu, trong một
  hệ đã tuyên bố rõ là không có màu xanh dương

Mục cuối nằm trong bộ skill **vì** nó là lỗi của chính hệ nguồn. Một tài liệu
chỉ ghi lại phần đã đánh bóng sẽ không giúp ai tránh được cái bẫy đã sập.

## Góp ý

Issue và pull request đều hoan nghênh, tiếng Anh hoặc tiếng Việt.

Tiêu chuẩn cho một luật mới là **lý do**, không phải sở thích. Nếu bạn nói được
điều gì sẽ hỏng khi không có luật đó — tốt nhất là điều bạn đã tận mắt thấy hỏng
— thì nó thuộc về đây. Sửa vào `claude/erp-ui-design/references/` trước, rồi
đồng bộ sang các bản gộp.

## Giấy phép

MIT — xem [LICENSE](../LICENSE). Dùng, sửa, phát hành lại, kể cả cho mục đích
thương mại; chỉ cần giữ lại dòng bản quyền.

---

*Rút từ một front end ERP đang chạy production, 09/2026.*
