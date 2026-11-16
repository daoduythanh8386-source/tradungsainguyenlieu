# Oristar – Tra cứu dung sai đầu vào BTP

Ứng dụng web (PWA) tra cứu **dung sai đầu vào bán thành phẩm (BTP)**: nhập kích thước đo thực tế và xem ngay dung sai, khoảng cho phép, kết quả **ĐẠT / KHÔNG ĐẠT**. Giao diện ưu tiên điện thoại, cài được như một app và chạy được khi không có mạng.

## Tính năng

| Mục | Nội dung |
|---|---|
| **Tra nguyên liệu** | Chọn dạng vật liệu, nhập dày × rộng × dài → hiện dung sai và khoảng cho phép |
| **Thép dây** | Dung sai đường kính thép dây |
| **Độ cứng NL** | Tra độ cứng nguyên liệu |
| **Tiêu chuẩn NL** | Bảng tiêu chuẩn nguyên liệu |
| **Thép thanh** | Dung sai thép thanh tròn |
| **Cài đặt app** | Hướng dẫn cài lên iPhone/iPad, Android, máy tính (có hình minh hoạ theo trình duyệt) |

- Bàn phím số trên màn hình (0–9, dấu chấm/phẩy, Xoá, Tiếp, Xong) – nhập nhanh bằng một tay.
- Ô **Đo thực tế** có thể để trống nếu chỉ muốn xem dung sai.
- Tự đổi giao diện sáng/tối theo thiết bị.
- PWA: có `manifest.webmanifest` + service worker `sw.js` (lưu đệm để dùng offline).
- Lời chào bằng giọng nói khi mở app.

## Cấu trúc thư mục

```
index.html            Giao diện chính (HTML + CSS)
data.js               Dữ liệu bảng dung sai
app.js                Logic tra cứu, so sánh ĐẠT/KHÔNG ĐẠT
keypad.js             Bàn phím số trên màn hình
ui.js                 Tiện ích giao diện
install.js            Hướng dẫn cài app (PWA)
greet.js              Phát lời chào
scene.js              Hiệu ứng ảnh nền phần đầu trang
sw.js                 Service worker (offline)
manifest.webmanifest  Khai báo PWA
assets/               Biểu tượng, logo ISO, ảnh sản phẩm, âm thanh chào
```

## Chạy thử trên máy

App là HTML/JS thuần, không cần cài đặt hay build:

```bash
# Cách 1: Python
python -m http.server 8080
# Cách 2: Node
npx serve .
```

Mở <http://localhost:8080>. (Nên chạy qua máy chủ như trên thay vì mở thẳng file, để service worker hoạt động.)

## Triển khai

Trang tĩnh, đưa lên hosting nào cũng được:

- **Vercel**: Import repo này → Framework Preset: *Other* → Deploy (không cần lệnh build).
- **GitHub Pages**: Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
- **Netlify**: kéo thả thư mục hoặc nối với repo, Publish directory: `.`

> Khi sửa nội dung, tăng số phiên bản bộ đệm trong `sw.js` (ví dụ `oristar-v11` → `oristar-v12`) để máy người dùng nhận bản mới.

## Nguồn dữ liệu

- Bảng dung sai đầu vào BTP – Oristar (ISO 9001:2015).
- Dung sai thép thanh: Interlloy – Round bar tolerance tables (2015).
- Giọng chào: Piper TTS, dữ liệu VAIS1000 (CC BY 4.0), đã chỉnh sang giọng nam trầm.

## Tác giả

**Tra dung sai nguyên liệu** – App được làm bởi **Đào Duy Thanh**. © Since 2026.

## Lịch sử thay đổi

- **v11** – Bỏ số điện thoại ở chân trang; dọn chú thích do hosting tự chèn; tăng phiên bản bộ đệm offline.
