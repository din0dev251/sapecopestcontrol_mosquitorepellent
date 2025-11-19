function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Validate data
    if (!data.name || !data.phone || !data.quantity || !data.color) {
      return createResponse({ success: false, message: "Missing required fields" }, 400);
    }

    // Check for duplicate submissions (same phone within last 5 minutes)
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const dataRange = sheet.getRange(2, 1, lastRow - 1, 6);
      const values = dataRange.getValues();

      for (let i = 0; i < values.length; i++) {
        const rowPhone = values[i][1]; // Phone is in column B
        const rowTime = new Date(values[i][5]); // Timestamp is in column F

        if (rowPhone === data.phone && rowTime > fiveMinutesAgo) {
          return createResponse({ success: false, message: "Duplicate submission detected" }, 400);
        }
      }
    }

    // Add headers if sheet is empty
    if (lastRow === 0) {
      sheet.appendRow(["Tên", "Số điện thoại", "Số lượng", "Màu sản phẩm", "Email", "Thời gian"]);
    }

    // Append data
    sheet.appendRow([
      data.name,
      data.phone,
      data.quantity,
      data.color,
      data.email || "",
      data.timestamp || new Date().toISOString(),
    ]);

    return createResponse({ success: true, message: "Data saved successfully" }, 200);
  } catch (error) {
    return createResponse({ success: false, message: error.toString() }, 500);
  }
}

// Helper function to create response with CORS headers
function createResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );

  // Note: Google Apps Script doesn't support setting custom headers directly
  // CORS is handled by the deployment settings (Who has access: Anyone)
  return output;
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ message: "Pre-order API is running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
