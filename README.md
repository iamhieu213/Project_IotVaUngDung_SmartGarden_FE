# Frontend - Giao Diện Người Dùng Vườn Thông Minh

Giao diện người dùng Web Client cho hệ thống Vườn thông minh (Smart Garden). Ứng dụng cung cấp bảng điều khiển thời gian thực, biểu đồ phân tích dữ liệu lịch sử, phần quản trị nhà nấm/thiết bị, và cổng trò chuyện trực tuyến với chuyên gia nông nghiệp AI.

---

## 🛠️ Công Nghệ Sử Dụng

* **Core Framework**: React (v19), TypeScript.
* **Build Tool**: Vite.
* **Routing**: React Router DOM (v7).
* **Real-time**: Socket.io-client.
* **HTTP Client**: Axios (Giao tiếp với các REST APIs của Backend).
* **UI Components & Icons**: Lucide-react (Hệ thống icon), SweetAlert2 (Các pop-up thông báo thân thiện).
* **Styling**: Vanilla CSS linh hoạt kết hợp bố cục CSS Flexbox/Grid hiện đại.

---

## 📂 Cấu Trúc Mã Nguồn

```text
src/
├── assets/               # Chứa các tài nguyên tĩnh như hình ảnh, logo
├── components/           # Thư mục chứa các trang giao diện & component tái sử dụng:
│   ├── Landing/          # Trang giới thiệu tổng quan hệ thống (Landing Page)
│   ├── Login/            # Giao diện đăng nhập tài khoản
│   ├── Register/         # Giao diện đăng ký tài khoản mới
│   ├── ForgotPassword/   # Giao diện yêu cầu khôi phục mật khẩu qua Email
│   ├── ResetPassword/    # Giao diện thiết lập lại mật khẩu mới
│   ├── Sidebar/          # Thanh điều hướng Sidebar chung cho hệ thống quản trị
│   ├── Dashboard/        # Bảng điều khiển giám sát thông số cảm biến thời gian thực
│   ├── Analytics/        # Biểu đồ phân tích lịch sử biến động môi trường
│   ├── ChatAI/           # Khung chat tư vấn nông nghiệp thông minh trực tiếp với Gemini AI
│   ├── Houses/           # Danh sách và quản lý các nhà nấm (CRUD)
│   ├── HouseDetail/      # Chi tiết từng nhà nấm (các cảm biến, vị trí thiết bị)
│   ├── Devices/          # Đăng ký và quản lý danh sách thiết bị ESP32 (quét thiết bị mới)
│   ├── Presets/          # Thiết lập cấu hình ngưỡng lý tưởng cho từng loại cây
│   ├── Alerts/           # Lịch sử ghi nhận các cảnh báo của hệ thống
│   └── ProtectedRoute.tsx# Wrapper bảo vệ các route yêu cầu đăng nhập trước khi truy cập
├── context/              # Chứa các React Context quản lý trạng thái toàn cục:
│   ├── AuthContext.tsx         # Quản lý trạng thái đăng nhập, thông tin User và JWT Token
│   └── NotificationContext.tsx # Quản lý và nhận thông tin cảnh báo đẩy thời gian thực qua Socket
├── services/             # Lớp dịch vụ API giao tiếp với Backend (AuthService, DeviceService, v.v.)
├── utils/                # Các hàm tiện ích định dạng ngày tháng, xử lý chuỗi
├── App.css               # CSS định dạng chung cho toàn bộ ứng dụng
├── index.css             # Hệ thống CSS Reset và biến CSS (Design tokens, Color Palettes)
├── main.tsx              # Điểm khởi đầu khởi tạo ứng dụng React
└── vite.config.ts        # File cấu hình của Vite
```

---

## 📌 Các Tính Năng Chính Trên Giao Diện

1. **Giám Sát Thời Gian Thực (Dashboard):** 
   - Hiển thị trực quan Nhiệt độ, Độ ẩm không khí, Độ ẩm đất, Cường độ ánh sáng và Mực nước của các cảm biến.
   - Trạng thái thiết bị Online/Offline của kit ESP32.
   - Nút bật/tắt máy bơm thủ công từ xa với phản hồi phản ánh tức thời.
2. **Quản Lý Nhà Nấm (Houses & Devices):**
   - Quản lý các nhà nấm/phòng trồng khác nhau.
   - Chức năng **Auto-Discovery**: Tự động phát hiện khi có kit ESP32 mới cắm điện phát sóng gửi tin nhắn MQTT lên broker và hiển thị trên giao diện giúp người dùng đăng ký nhanh chóng.
3. **Quản Lý Cấu Hình Sinh Trưởng (Presets):**
   - Người dùng có thể tự định nghĩa các Preset cây trồng (VD: Nấm Bào Ngư cần Nhiệt độ: 25-30°C, Độ ẩm đất: 60-80%).
   - Gán Preset cho thiết bị để kích hoạt chế độ **tự động tưới** khi độ ẩm đất xuống dưới ngưỡng hoặc nhận **cảnh báo vượt ngưỡng**.
4. **Chat Tư Vấn Với Trợ Lý AI (ChatAI):**
   - Cửa sổ trò chuyện trực tiếp với Trợ lý ảo AI. Trợ lý này tự động cập nhật ngữ cảnh thực tế của nhà nấm đang xem (nhiệt độ thực tế, độ ẩm thực tế so với cài đặt Preset) để đưa ra lời khuyên cụ thể và chính xác mà không cần người dùng nhập lại thông số.
5. **Cảnh Báo Đẩy (Notification & Alerts):**
   - Biểu tượng quả chuông trên đầu trang hiển thị thông báo tức thời khi phát hiện sự cố (VD: mất kết nối thiết bị, bể nước cạn, nhiệt độ quá cao).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

### 1. Di chuyển vào thư mục Frontend
```bash
cd Frontend
```

### 2. Cài đặt các gói thư viện
```bash
npm install
```

### 3. Cấu hình địa chỉ Backend
Theo mặc định, ứng dụng kết nối tới Backend tại `http://localhost:3000`. Nếu Backend của bạn chạy ở IP/Port khác, hãy cập nhật cấu hình API tương ứng trong các file Service hoặc cấu hình `.env` nếu có.

### 4. Khởi chạy Server phát triển cục bộ
```bash
npm run dev
```
Sau khi chạy thành công, truy cập [http://localhost:5173](http://localhost:5173) để trải nghiệm giao diện.

### 5. Biên dịch sản phẩm thương mại (Production Build)
```bash
npm run build
```
Mã nguồn sau build sẽ nằm trong thư mục `dist` sẵn sàng triển khai lên các dịch vụ Hosting static như Netlify, Vercel hoặc Nginx.
