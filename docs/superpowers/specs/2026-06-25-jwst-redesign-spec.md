# JWST Space Explorer - UI Redesign Spec (PC Optimized)
Date: 2026-06-25

## 1. Mục tiêu (Objective)
- Chuyển đổi giao diện từ cấu trúc "Hộp chứa" (Panel-based) sang dạng "Lơ lửng" (Hologram/HUD-based) tối ưu cho không gian hiển thị rộng trên PC.
- Nâng cấp Landing Page trở nên điện ảnh, ấn tượng, đậm phong cách "Phòng Điều Khiển NASA" (Mission Control).

## 2. Chi tiết Thiết kế (Design Details)

### 2.1. Cải tiến Landing Page (`App.tsx`)
- **Background Animations**: Loại bỏ nền gradient cũ. Thay bằng hệ thống Lưới 3D (Grid) có góc nghiêng (perspective) trôi dần về phía trước.
- **Trung tâm (Centerpiece)**: Thêm một vòng tròn Hologram xoay chậm bằng CSS ngay giữa màn hình tạo cảm giác "Radar/Quả cầu không gian đang hoạt động".
- **Thanh tìm kiếm (Search Bar)**: Bỏ các input bo góc thô cứng. Chuyển thành dạng "Terminal prompt" (chỉ có dòng gạch dưới phát sáng màu Cyan) và chữ font monospace.

### 2.2. Left HUD & Tool Panel (`LeftHUD.tsx` & `App.tsx`)
- **Gỡ bỏ Component Thừa**: Xóa bỏ `FloatingPanel` bọc quanh LeftHUD.
- **Hologram Buttons (Các nút bấm công cụ)**:
  - **Trạng thái bình thường**: Không nền (transparent), không viền (no border). Chỉ có Icon nét mảnh màu Xanh ngọc (Cyan) hoặc Lục (Emerald) phát sáng (drop-shadow).
  - **Trạng thái Hover (chỉ có trên PC)**: Khi trỏ chuột vào, nút bấm sẽ phát ra vầng sáng (glow) mạnh hơn, kèm theo một đoạn Text mô tả (Tooltip) chạy ra theo chiều ngang với tốc độ cao.
- **Bố trí**: Nằm sát mép trái màn hình, xếp dọc cách đều nhau.

### 2.3. CSS Architecture (`index.css`)
Cần thêm các Utility Classes mới:
- `.hologram-btn`: Class chung cho các nút công cụ (outline icon, glow effect).
- `.neon-text-cyan`: Class chữ neon màu xanh ngọc.
- Khai báo thêm `@keyframes`: `hologram-spin` (vòng quay), `grid-perspective` (hiệu ứng không gian ảo 3D).

## 3. Các bước triển khai (Implementation Plan)
1. Cập nhật `index.css`: Thêm bộ biến màu Neon và các hiệu ứng Keyframes mới.
2. Refactor `App.tsx`: Cấu trúc lại Landing Page (HTML/CSS) theo phong cách 3D Grid và Terminal Search.
3. Refactor `LeftHUD.tsx`: Loại bỏ khung bọc, áp dụng `.hologram-btn` cho toàn bộ danh sách `controls`.
4. Refactor `App.tsx` (Phần layout chính): Loại bỏ `<FloatingPanel>` cho LeftHUD, để LeftHUD lơ lửng tự do bằng `position: absolute`.
