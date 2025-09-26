# QR Attendance - Hệ thống điểm danh bằng QR Code

Ứng dụng điểm danh sử dụng QR Code được xây dựng với React + Vite + Capacitor.

## 👨‍💻 Tác giả

**Đoàn Quang Thắng - 22IT272**

Sinh viên Khoa Công nghệ Thông tin - Chuyên ngành Công nghệ thông tin

## 🌐 Demo Live

**🚀 [Xem Demo Trực Tuyến](https://qr-attendance-nu-hazel.vercel.app/)**

Ứng dụng đã được deploy trên Vercel và sẵn sàng sử dụng!

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
- ✅ **Tạo QR Code** - Generator để tạo mã QR cho sinh viên
- ✅ **Analytics Dashboard** - Bảng thống kê chi tiết với biểu đồ
- ✅ **Chia sẻ QR Code** - Tải xuống, copy text, chia sẻ

## Công nghệ sử dụng

- **Frontend**: React 18 + Vite
- **QR Scanner**: @zxing/library
- **QR Generator**: qrcode.js
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Animations**: Framer Motion
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

### 5. Deploy lên Vercel
```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel --prod

# Hoặc deploy trực tiếp từ GitHub
# 1. Push code lên GitHub
# 2. Kết nối repository với Vercel
# 3. Vercel sẽ tự động deploy khi có thay đổi
```

### 6. Deploy lên Netlify
```bash
# Build project
npm run build

# Deploy thư mục dist lên Netlify
# Hoặc kết nối GitHub repository với Netlify
```

## Hướng dẫn sử dụng

### 1. Quét QR Code
- Nhấn "Quét QR" để khởi động camera
- QR Code phải có định dạng: `ATTEND:MSSV`
- Ví dụ: `ATTEND:20123456`
- Giữ ổn định khi quét

### 2. Tạo QR Code
- Nhấn "Tạo QR" để chuyển sang chế độ generator
- Nhập MSSV của sinh viên
- Nhấn "Tạo QR Code" để tạo mã QR
- Có thể tải xuống, copy text hoặc chia sẻ

### 3. Xem lịch sử
- Nhấn "Lịch sử" để xem tất cả lần điểm danh
- Hiển thị số lượng lần điểm danh trong tab
- Thống kê chi tiết từng sinh viên

### 4. Analytics Dashboard
- Nhấn "Analytics" để xem bảng thống kê
- Biểu đồ xu hướng 7 ngày gần đây
- Phân bố điểm danh theo giờ
- Top sinh viên điểm danh nhiều nhất

### 5. Xuất dữ liệu
- Trong tab "Lịch sử", nhấn "Xuất CSV"
- File sẽ chứa: MSSV, Thời gian, Trạng thái

### 6. Reset dữ liệu
- Trong tab "Lịch sử", nhấn "Xóa tất cả"
- Xác nhận trước khi xóa

## Cấu trúc project

```
src/
├── components/
│   ├── QRScanner.jsx         # Component quét QR code
│   ├── AttendanceList.jsx    # Component hiển thị lịch sử điểm danh
│   ├── QRGenerator.jsx       # Component tạo mã QR
│   └── AnalyticsDashboard.jsx # Component bảng thống kê với biểu đồ
├── utils/
│   └── storage.js            # Utilities lưu trữ dữ liệu (LocalStorage)
├── App.jsx                   # Component chính với navigation
├── main.jsx                  # Entry point của ứng dụng
└── index.css                 # Styles chính với responsive design
```

## API Reference

### QRScanner Component
```jsx
<QRScanner onQRScan={(mssv) => handleQRScan(mssv)} />
```

### QRGenerator Component
```jsx
<QRGenerator />
// Tự động tạo QR code với định dạng ATTEND:MSSV
// Hỗ trợ tải xuống, copy text, chia sẻ
```

### AnalyticsDashboard Component
```jsx
<AnalyticsDashboard records={attendanceRecords} />
// Hiển thị thống kê với biểu đồ Chart.js
// Bao gồm: xu hướng, phân bố giờ, top sinh viên
```

### AttendanceList Component
```jsx
<AttendanceList 
  records={attendanceRecords}
  onExport={exportToCSV}
  onReset={resetAttendanceList}
/>
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

### Lỗi deploy
- Kiểm tra file `vercel.json` nếu cần cấu hình đặc biệt
- Đảm bảo build thành công trước khi deploy
- Xem log chi tiết trên Vercel Dashboard

## Phát triển thêm

### Thêm tính năng
- [x] **Analytics Dashboard** - Bảng thống kê chi tiết ✅
- [x] **QR Generator** - Tạo mã QR cho sinh viên ✅
- [x] **Export CSV** - Xuất dữ liệu ra file Excel ✅
- [ ] Push notifications
- [ ] Đồng bộ cloud (Firebase/Supabase)
- [ ] Quản lý lớp học
- [ ] Export PDF
- [ ] Backup/Restore dữ liệu

### Cải thiện UX
- [ ] Haptic feedback
- [ ] Sound effects
- [ ] Dark/Light theme
- [ ] Offline support
- [ ] PWA (Progressive Web App)
- [ ] Multi-language support

## License

MIT License - Sử dụng tự do cho mục đích học tập và thương mại.
