# ERP UI Design System — skill pack cho Claude, Gemini và GPT

Bộ hướng dẫn thiết kế giao diện ERP, rút ra từ front end của **một hệ ERP đang
chạy production** — file token, file shell, và năm page stylesheet của nó.

Mục tiêu: đưa cho bất kỳ trợ lý AI nào cũng dựng được giao diện ERP nhất quán
với hệ thiết kế này — không phải mô tả chung chung, mà là token, số đo, và lý do
đằng sau từng quyết định.

---

## Ý tưởng cốt lõi được rút ra

> **Chrome tối, content trắng, màu nhấn chỉ để báo trạng thái và hành động.**

Sidebar và topbar gần đen, lùi ra sau. Mọi bề mặt chứa thứ người dùng đọc, so
sánh hoặc sửa — card, table, dropdown, form — đều trắng. Một màu nhấn duy nhất
đánh dấu tab đang chọn, nút chính, và series trên biểu đồ. Hết.

Đây là điểm phân biệt ERP với dashboard tiêu dùng. Dashboard dùng màu để tạo
cảm xúc; ERP dùng màu như **tín hiệu** — để khi có gì đó đỏ lên thì nó thật sự
có nghĩa. Tiêu màu nhấn vào trang trí là tiêu mất công cụ duy nhất để nói
"nhìn chỗ này".

Toàn bộ hệ thống tối ưu cho **lần dùng thứ hai trăm**, không phải ấn tượng đầu.

---

## Cấu trúc thư mục

```
erp-ui-design-system/
├── README.md                     ← file này
│
├── claude/erp-ui-design/         ← SKILL cho Claude (bản gốc, đầy đủ nhất)
│   ├── SKILL.md                  frontmatter + nguyên tắc + bảng điều hướng
│   ├── references/
│   │   ├── 01-foundations.md     token, typography, spacing, radius, motion
│   │   ├── 02-shell.md           grid layout, sidebar, topbar, responsive, i18n
│   │   ├── 03-components.md      card, button, form, table, tile, pill, tooltip
│   │   ├── 04-charts.md          SVG chart, gradient theo thang giá trị, a11y
│   │   └── 05-checklist.md       checklist review + các lỗi đã gặp thật
│   └── assets/
│       ├── theme.css             file token, copy thẳng vào dự án mới
│       └── shell-skeleton.html   khung trang, kèm script chống nhấp nháy
│
├── gemini/GEMINI.md              bản gộp một file cho Gemini
│
└── gpt/
    ├── AGENTS.md                 bản gộp một file cho Codex/Cursor
    └── custom-gpt-instructions.md  bản rút gọn 7997 ký tự cho Custom GPT
```

---

## Cài đặt

### Claude Code / Claude Desktop

Chạy từ gốc repo này sau khi clone:

```powershell
# Dùng cho mọi dự án
Copy-Item -Recurse ".\claude\erp-ui-design" "$HOME\.claude\skills\erp-ui-design"

# Hoặc chỉ một dự án
Copy-Item -Recurse ".\claude\erp-ui-design" "<đường-dẫn-dự-án>\.claude\skills\erp-ui-design"
```

Claude tự gọi skill khi gặp việc liên quan (dựng admin panel, review giao diện
nội bộ, làm dashboard vận hành). Gọi tay bằng `/erp-ui-design`.

Đây là bản **đầy đủ nhất**. Claude đọc `SKILL.md` trước, rồi chỉ nạp file
reference nào cần cho việc đang làm — nên nó mang được nhiều chi tiết hơn hai
bản kia mà không tốn context.

### Gemini

```powershell
# Toàn cục
Copy-Item ".\gemini\GEMINI.md" "$HOME\.gemini\GEMINI.md"

# Hoặc đặt ở gốc dự án của anh
Copy-Item ".\gemini\GEMINI.md" "<đường-dẫn-dự-án>\GEMINI.md"
```

Dùng được cho **Gemini Gem**: dán toàn bộ nội dung vào ô Instructions.

### GPT

**Codex / Cursor / công cụ đọc `AGENTS.md`:**

```powershell
Copy-Item ".\gpt\AGENTS.md" "<đường-dẫn-dự-án>\AGENTS.md"
```

Nếu repo đã có `AGENTS.md`, gộp các mục vào dưới một heading `## UI`.

**Custom GPT:** mở `gpt/custom-gpt-instructions.md`, dán khối trong dấu ```` ``` ````
vào ô **Instructions**, rồi **upload `gpt/AGENTS.md` làm Knowledge file**.

Việc tách đôi này là cố ý. Ô Instructions (giới hạn 8000 ký tự) giữ phần
**phán đoán** — hệ thống phục vụ mục đích gì, từ chối gì, và những luật mà model
hay nhớ sai. Knowledge file giữ phần **số đo chính xác**. Một model đọc thang
spacing từ trí nhớ sẽ cho ra thứ *gần đúng*, mà gần đúng thì tệ hơn sai hẳn —
nên Instructions bắt nó trích từ Knowledge thay vì diễn giải lại.

---

## Bản nào là gốc

`claude/erp-ui-design/references/` là **bản gốc**. `gemini/GEMINI.md` và
`gpt/AGENTS.md` giống hệt nhau về nội dung — cùng một hệ thiết kế, hai tên file
khác nhau vì hai công cụ đọc hai tên khác nhau.

Khi cần sửa: sửa ở `references/` trước, rồi đồng bộ xuống hai file gộp. Bản
Custom GPT rút gọn thì tách riêng, sửa tay.

---

## Đổi màu thương hiệu

Bộ này để sẵn một sắc đỏ crimson làm màu mẫu (`#b3121b`). Đổi sang màu khác:

1. Sửa cụm `--brand*` ở đầu `assets/theme.css`.
2. **Tính lại `--brand-on-dark`** — bước hay bị bỏ qua nhất. Đây là *cùng một
   màu thương hiệu* nhưng đã được đẩy sáng lên để đọc được trên nền gần đen.
   `#b3121b` đặt trên `#0a0a0c` là không đọc được. Mọi màu nhấn đều cần hai giá
   trị, một cho nền trắng và một cho nền tối.
3. Tính lại các bậc alpha `--brand-a08` … `--brand-a35` từ RGB mới.
4. Nếu màu thương hiệu mới là **xanh dương**, đảo luật "info không dùng xanh" —
   lúc đó info chuyển sang xám trung tính.

Không file nào khác cần đụng tới.

---

## Bộ này KHÔNG làm gì

Nói rõ để khỏi mất thời gian: đây không phải component library. Không có file
React, không có package để `npm install`, không có Tailwind config. Nó là
**đặc tả** — token, số đo, và lý do — để trợ lý AI sinh ra code khớp với hệ
thiết kế, bằng bất kỳ framework nào.

Đổi lại thì nó không bao giờ lệch phiên bản với runtime, và dùng được cho cả
HTML thuần lẫn React.

---

## Độ tin cậy của nội dung

Mọi token, số đo và đoạn CSS trong bộ này được đọc ra từ code thật đang chạy,
không phải bịa. Phần "failure modes" trong `05-checklist.md` cũng vậy — mỗi mục
là một lỗi đã xảy ra thật trong repo hoặc trong lúc làm việc trên nó, kể cả:

- màu nhấn dùng sai bề mặt (tab active tàng hình trên sidebar đen),
- viền chỉ thêm khi active làm chữ nhảy 3px,
- `opacity: revert` dưới `prefers-reduced-motion` âm thầm thành `1`,
- gradient để mặc định `objectBoundingBox` khiến hai biểu đồ khác hẳn độ lớn
  trông y như nhau,
- **palette drift**: các trang viết trước khi có `theme.css` vẫn còn hex thô
  (`#e0e7ff`, `#3730a3`) — một màu indigo không tồn tại trong bảng màu, trong
  một hệ thống đã tuyên bố "không có màu xanh dương". Đây là cách hệ thiết kế
  chết dần, và nó đang có thật trong một page stylesheet cũ của repo nguồn.

Điểm cuối cùng đáng nói riêng: nó nằm trong bộ skill **vì** nó là lỗi của chính
repo nguồn. Một bộ hướng dẫn chỉ mô tả phần đẹp sẽ không giúp ai tránh được cái
bẫy đã sập.

---

## Giấy phép

MIT — xem [LICENSE](LICENSE). Dùng, sửa, phát hành lại, kể cả cho mục đích thương mại,
chỉ cần giữ lại dòng bản quyền.

---

*Rút từ một hệ ERP đang chạy production, 09/2026.*
