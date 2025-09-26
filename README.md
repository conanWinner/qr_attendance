# QR Attendance - Hệ thống điểm danh bằng QR Code

Ứng dụng điểm danh sử dụng QR Code được xây dựng với React + Vite + Capacitor.

## Tính năng

### Yêu cầu tối thiểu ✅
- ✅ Quét QR code định dạng `ATTEND:<MSSV>`
- ✅ Lưu MSSV + thời gian quét
- ✅ Hiển thị lịch sử điểm danh
- ✅ Giao diện thân thiện, không crash

### Tính năng mở rộng ✅
- ✅ Xuất lịch sử ra file CSV
- ✅ Nút reset/xóa tất cả lịch sử
- ✅ Thống kê số lần điểm danh
- ✅ Hiển thị thời gian tương đối (vừa xong, 5 phút trước...)

## Công nghệ sử dụng

- **Frontend**: React 18 + Vite
- **QR Scanner**: @zxing/library
- **Cross-platform**: Capacitor
- **Storage**: LocalStorage (có thể nâng cấp lên Capacitor Preferences)
- **Styling**: CSS3 với responsive design

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy trên web
```bash
npm run dev
```
Truy cập: http://localhost:3000

### 3. Build cho production
```bash
npm run build
```

### 4. Chạy trên Android
```bash
# Build và sync với Capacitor
npm run build
npx cap sync

# Mở Android Studio
npx cap open android
```

## Hướng dẫn sử dụng

### 1. Quét QR Code
- Nhấn "Bắt đầu quét" để khởi động camera
- QR Code phải có định dạng: `ATTEND:MSSV`
- Ví dụ: `ATTEND:20123456`
- Giữ ổn định khi quét

### 2. Xem lịch sử
- Chuyển sang tab "Lịch sử"
- Xem tất cả lần điểm danh
- Thống kê số lần điểm danh

### 3. Xuất dữ liệu
- Nhấn "Xuất CSV" để tải file Excel
- File sẽ chứa: MSSV, Thời gian, Trạng thái

### 4. Reset dữ liệu
- Nhấn "Xóa tất cả" để xóa lịch sử
- Xác nhận trước khi xóa

## Cấu trúc project

```
src/
├── components/
│   ├── QRScanner.jsx      # Component quét QR
│   └── AttendanceList.jsx # Component hiển thị lịch sử
├── utils/
│   └── storage.js         # Utilities lưu trữ dữ liệu
├── App.jsx               # Component chính
├── main.jsx              # Entry point
└── index.css             # Styles
```

## API Reference

### QRScanner Component
```jsx
<QRScanner onQRScan={(mssv) => handleQRScan(mssv)} />
```

### Storage Utilities
```javascript
import { getAttendanceHistory, saveAttendanceRecord } from './utils/storage'

// Lấy lịch sử
const history = await getAttendanceHistory()

// Lưu điểm danh
await saveAttendanceRecord({
  mssv: '20123456',
  timestamp: new Date().toISOString(),
  id: Date.now().toString()
})
```

## Troubleshooting

### Camera không hoạt động
- Kiểm tra quyền truy cập camera
- Đảm bảo sử dụng HTTPS (trên web)
- Thử refresh trang

### QR Code không đọc được
- Kiểm tra định dạng: `ATTEND:MSSV`
- Đảm bảo QR code rõ nét
- Giữ ổn định khi quét

### Lỗi build
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

## Phát triển thêm

### Thêm tính năng
- [ ] Push notifications
- [ ] Đồng bộ cloud
- [ ] Báo cáo thống kê
- [ ] Quản lý lớp học
- [ ] Export PDF

### Cải thiện UX
- [ ] Haptic feedback
- [ ] Sound effects
- [ ] Dark/Light theme
- [ ] Offline support

## License

MIT License - Sử dụng tự do cho mục đích học tập và thương mại.
