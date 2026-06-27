# BÁO CÁO TÓM TẮT
**Tên đề tài:** NGHIÊN CỨU VÀ XÂY DỰNG NỀN TẢNG KHÁM PHÁ VŨ TRỤ (JWST SPACE EXPLORER) TÍCH HỢP TRÍ TUỆ NHÂN TẠO (AI) VÀ THỰC TẾ ẢO TRONG GIÁO DỤC THIÊN VĂN HỌC (STEAM)

**Lĩnh vực:** Phần mềm tin học

---

## TÓM TẮT
Trong kỷ nguyên công nghệ 4.0, giáo dục STEM/STEAM đóng vai trò cốt lõi. Tuy nhiên, việc giảng dạy thiên văn học thường gặp rào cản do thiếu các công cụ trực quan, tương tác cao khiến học sinh khó hình dung các khái niệm không gian phức tạp.
Từ thực tế đó, em đã thực hiện đề tài xây dựng phần mềm **JWST Space Explorer**. Đây là một nền tảng web mô phỏng đài quan sát không gian dựa trên dữ liệu của Kính viễn vọng Không gian James Webb (JWST). Hệ thống bao gồm: Buồng lái phi thuyền 3D tương tác, Bộ lọc nhiếp ảnh thiên văn (Astrophotography Camera) có đóng dấu watermark, Cỗ máy thời gian (Hubble-to-JWST Slider) so sánh sự tiến hóa vũ trụ, Hiệu ứng thấu kính hấp dẫn (Gravitational Lensing) và Phòng trưng bày 3D VR không gian. Đặc biệt, hệ thống tích hợp Lõi dữ liệu AI (AI Data Core) với giao diện Desktop Neo Kinpaku, hỗ trợ giải đáp trực tiếp các câu hỏi phức tạp của người dùng.
Đề tài không chỉ giúp phổ cập kiến thức thiên văn học một cách sinh động, mà còn là công cụ hữu ích cho giáo viên và học sinh yêu thích khám phá khoa học vũ trụ, mang lại một giải pháp giáo dục trực quan, hiệu quả, chi phí thấp (hoàn toàn chạy trên trình duyệt Web).

---

## I. GIỚI THIỆU CHUNG
### 1. Đặt vấn đề nghiên cứu
#### 1.1. Sự cần thiết của nghiên cứu
Thiên văn học là một trong những môn học hấp dẫn nhưng cũng mang tính trừu tượng cao nhất. Hiện nay, việc tiếp cận các dữ liệu vũ trụ sâu thẳm như của kính viễn vọng James Webb (JWST) đối với học sinh chủ yếu qua sách báo và hình ảnh 2D tĩnh. Điều này hạn chế khả năng tương tác và sự hứng thú của thế hệ trẻ.
Một hệ thống có khả năng mô phỏng, tương tác 3D và đưa người dùng vào vai một "phi hành gia" khám phá dữ liệu vũ trụ thực tế, kết hợp trợ lý AI để hỏi đáp, sẽ giải quyết triệt để vấn đề này.

#### 1.2. Các đề tài nghiên cứu trước đây và sản phẩm trên thị trường
Hiện nay có một số ứng dụng như NASA's Eyes hay Stellarium. Tuy nhiên, NASA's Eyes đòi hỏi cấu hình máy tương đối tốt và nặng về mặt học thuật chuyên sâu. Stellarium thiên về quan sát bầu trời đêm từ Trái Đất. Rất hiếm có nền tảng web nào chuyên biệt hóa trải nghiệm tương tác với dữ liệu JWST kết hợp AI Chatbot và các công cụ thực hành (như lọc ảnh thiên văn) dành cho môi trường web giáo dục mở.

### 2. Mục tiêu và giải pháp của nghiên cứu
#### 2.1. Mục tiêu
Nghiên cứu và phát triển một nền tảng Web App tương tác có khả năng:
- Thu thập và trực quan hóa hình ảnh, dữ liệu thực tế từ NASA/JWST.
- Xây dựng trải nghiệm thị giác cao cấp (Premium UI - hệ thống Neo Kinpaku).
- Mô phỏng các hiện tượng vật lý thiên văn (Thấu kính hấp dẫn, phân tích quang phổ).
- Tích hợp AI đóng vai trò như hệ thống dữ liệu viễn trắc giải đáp thắc mắc khoa học cho người dùng.

#### 2.2. Giải pháp nghiên cứu
Sử dụng công nghệ web tiên tiến nhất (ReactJS, Vite, TailwindCSS) để xây dựng ứng dụng Frontend. 
- Về hình ảnh: Sử dụng CSS-based 3D và Canvas/WebGL để dựng buồng lái và thư viện không gian VR mà không cần tải thư viện 3D quá nặng.
- Về AI: Kết nối qua API với mô hình Ngôn ngữ lớn (LLM) để đóng vai "Máy tính phi thuyền" trả lời câu hỏi.
- Về giao diện (UI/UX): Triển khai hệ thống thiết kế Neo Kinpaku (Glassmorphism tinh giản) tối ưu cho màn hình Desktop, mang lại cảm giác đắt tiền, tinh xảo.

### 3. Đối tượng và phạm vi nghiên cứu
- **Đối tượng:** Học sinh, sinh viên, giáo viên STEM và những người đam mê thiên văn học.
- **Phạm vi:** Trải nghiệm web tương tác trên môi trường máy tính Desktop (PC/Laptop). 

### 4. Tính mới, sáng tạo, nhân văn, hiệu quả và khả năng áp dụng
#### 4.1. Tính mới & Sáng tạo
- **Giao diện Neo Kinpaku đột phá:** Khác với các web giáo dục thông thường, sản phẩm sử dụng phong cách Dark Lacquer và Gold Hairline siêu thực, mang cảm giác như bảng điều khiển của tàu vũ trụ công nghệ cao.
- **Tích hợp các công cụ chuyên biệt:** Mô phỏng công cụ nhiếp ảnh thiên văn thu nhỏ, cho phép người dùng điều chỉnh phổ màu hình ảnh vũ trụ và đóng dấu (watermark) tọa độ viễn trắc như các nhà khoa học thực thụ. Cỗ máy thời gian (Slider) so sánh trực tiếp hình ảnh Hubble và JWST để thấy rõ bước tiến công nghệ nhân loại.

#### 4.2. Tính nhân văn & Khả năng áp dụng
Phần mềm là cầu nối đưa vũ trụ xa xôi đến gần hơn với những học sinh không có điều kiện tiếp cận kính viễn vọng thực tế. Hoàn toàn miễn phí, có thể chạy trên mọi máy tính có trình duyệt web, biến đây trở thành công cụ thực hành lý tưởng cho môn Khoa học tự nhiên (chủ đề Vũ trụ) trong chương trình Giáo dục phổ thông mới.

---

## II. CÔNG NGHỆ VÀ KỸ THUẬT SỬ DỤNG

### 1. Nền tảng Frontend (ReactJS & Vite)
Ứng dụng được khởi tạo và quản lý bằng Vite, phát triển trên thư viện React 18. 
- Giúp chia nhỏ giao diện thành các Component (TopHUD, LeftHUD, RightHUD) độc lập.
- Quản lý trạng thái (State Management) để cập nhật dữ liệu AI và hình ảnh vũ trụ theo thời gian thực mà không cần tải lại trang.

### 2. Thiết kế giao diện với Tailwind CSS và hệ thống Neo Kinpaku
- Thay vì dùng CSS thuần tốn thời gian, TailwindCSS được sử dụng để xây dựng layout nhanh chóng. 
- **Thiết kế Impeccable (Neo Kinpaku):** Sử dụng các biến màu CSS tuân thủ OKLCH (Lacquer Black, Kinpaku Gold, Verdigris Patina) để tạo độ sâu vật lý, tạo ra bảng điều khiển phẳng, dùng viền mỏng (hairline 1px) sắc sảo, tối giản nhưng đậm chất "Pro".

### 3. Công nghệ Xử lý Hình ảnh & 3D (Canvas / CSS 3D)
- Thay vì phụ thuộc vào Engine 3D ngoài, dự án nghiên cứu tối ưu hóa phần cứng bằng cách dựng không gian VR 3D (3D Space Gallery) và Buồng lái tàu vũ trụ bằng kĩ thuật phối cảnh CSS 3D Transforms và HTML5 Canvas. Điều này giúp phần mềm đạt tốc độ khung hình cao (60 FPS) ngay cả trên các máy tính trường học cấu hình yếu.
- Tính năng Gravitational Lensing (Thấu kính hấp dẫn) ứng dụng WebGL/Canvas API để bóp méo điểm ảnh theo thuật toán vật lý.

### 4. Tích hợp Trí tuệ nhân tạo (AI Data Core)
- Xây dựng cụm RightHUD đóng vai trò là "Trí tuệ nhân tạo phân tích viễn trắc". Thông qua Fetch API, hệ thống gọi dữ liệu từ mô hình ngôn ngữ tự nhiên (được format sẵn ngữ cảnh là chuyên gia NASA) để hỏi đáp với học sinh, phân tích cấu tạo của các tinh vân hay hố đen ngay tại chỗ.

---

## III. HƯỚNG DẪN SỬ DỤNG VÀ VẬN HÀNH
1. **Truy cập:** Mở trình duyệt Web trên Desktop, truy cập vào đường dẫn dự án (Hosting).
2. **Khám phá:** Tại giao diện chính (Buồng lái), người dùng sử dụng chuột để tương tác với các màn hình hiển thị. Thanh `TopHUD` dùng để tìm kiếm các thiên thể (VD: "Orion Nebula").
3. **Thao tác công cụ (LeftHUD):** Dùng cụm nút bên trái để mở tính năng Camera Thiên văn học (chỉnh màu, lọc nhiễu ảnh Hubble/JWST), hoặc bật âm thanh không gian (Sonification).
4. **Hỏi đáp với AI (RightHUD):** Gõ câu hỏi vào bảng điều khiển bên phải. AI Data Core sẽ truy xuất dữ liệu thiên văn và cung cấp câu trả lời khoa học một cách chính xác.
