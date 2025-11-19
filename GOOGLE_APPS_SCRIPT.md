# Google Apps Script Setup

Để submit dữ liệu vào Google Sheets, bạn cần tạo một Google Apps Script Web App.

## Bước 1: Tạo Google Apps Script

1. Mở Google Sheets: https://docs.google.com/spreadsheets/d/1Yo0ptV7MArJcdD--J0DrK-JB5u0Fw0mYrrBOVBKLSwY/edit
2. Vào **Extensions** > **Apps Script**
3. Xóa code mặc định và copy code từ file `google-apps-script-code.gs` trong project này

**LƯU Ý QUAN TRỌNG:**

- Chỉ copy phần code JavaScript, KHÔNG copy dòng `\`\`\`javascript`hoặc`\`\`\``
- Code bắt đầu từ `function doPost(e) {` và kết thúc ở `}`
- File `google-apps-script-code.gs` chứa code sạch, không có markdown syntax

## Bước 2: Deploy Web App

1. Click **Deploy** > **New deployment**
2. Chọn type: **Web app**
3. Description: "Pre-order API"
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Click **Deploy**
7. Copy **Web App URL** (sẽ có dạng: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

## Bước 3: Cấu hình trong Project

1. Tạo file `.env.local` trong root project:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Hoặc cập nhật trực tiếp trong `src/services/preOrderService.ts`

## Bước 4: Cấu hình Sheet

Đảm bảo sheet có các cột:

- A: Tên
- B: Số điện thoại
- C: Số lượng
- D: Màu sản phẩm
- E: Email
- F: Thời gian

Script sẽ tự động tạo headers nếu sheet trống.

## Tính năng chống spam

1. **Rate limiting**: Client-side (1 phút giữa các lần submit)
2. **Duplicate check**: Server-side (cùng số điện thoại trong 5 phút)
3. **Honeypot field**: Client-side (hidden field để detect bots)
4. **Validation**: Client và server-side validation

## Troubleshooting

### Lỗi "Network error, please try again later"

Nếu bạn gặp lỗi network error, hãy kiểm tra các điểm sau:

1. **Kiểm tra URL đã được cấu hình chưa:**

   - Đảm bảo file `.env.local` có biến `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` với URL đúng
   - URL phải có dạng: `https://script.google.com/macros/s/SCRIPT_ID/exec`
   - Sau khi thêm/sửa `.env.local`, cần **restart Next.js dev server**

2. **Kiểm tra Google Apps Script deployment:**

   - Vào Google Apps Script editor
   - Click **Deploy** > **Manage deployments**
   - Đảm bảo deployment có:
     - **Execute as**: Me
     - **Who has access**: **Anyone** (quan trọng!)
   - Nếu đã thay đổi code, cần **Update** deployment (không tạo mới)

3. **Test Google Apps Script trực tiếp:**

   ```bash
   curl -X POST 'YOUR_SCRIPT_URL' \
     -H 'Content-Type: application/json' \
     --data-raw '{"name":"Test","phone":"0123456789","quantity":1,"color":"green","email":"test@test.com","timestamp":"2025-01-01T00:00:00.000Z"}'
   ```

   - Nếu test thành công, bạn sẽ nhận được JSON response
   - Nếu lỗi, kiểm tra lại code trong Apps Script

4. **Kiểm tra CORS:**

   - Google Apps Script với "Anyone" access sẽ tự động xử lý CORS
   - Nếu vẫn lỗi CORS, thử deploy lại với "Anyone" access

5. **Kiểm tra Console/Browser DevTools:**

   - Mở Browser DevTools (F12)
   - Vào tab **Network**
   - Thử submit form và xem request/response
   - Kiểm tra status code và error message

6. **Common Issues:**
   - **403 Forbidden**: Deployment chưa set "Anyone" access
   - **404 Not Found**: URL sai hoặc deployment chưa được tạo
   - **500 Internal Server Error**: Lỗi trong code Google Apps Script (kiểm tra Execution log)
   - **CORS Error**: Deployment chưa set "Anyone" access hoặc cần update deployment
