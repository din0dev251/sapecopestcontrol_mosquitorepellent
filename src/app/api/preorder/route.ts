import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.quantity || !body.color) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get Google Script URL from environment variable
    const GOOGLE_SCRIPT_URL =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
      return NextResponse.json(
        { success: false, message: "Google Script URL is not configured" },
        { status: 500 }
      );
    }

    // Proxy request to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Handle response
    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      try {
        responseData = JSON.parse(text);
      } catch (e) {
        // If it's not JSON, return the text or error
        if (text.includes("<!DOCTYPE") || text.includes("<html")) {
          return NextResponse.json(
            {
              success: false,
              message: "Server returned an error page. Please check Google Apps Script deployment.",
            },
            { status: 500 }
          );
        }
        responseData = { success: true, message: text || "Data saved successfully" };
      }
    }

    // Check if Google Script returned an error
    if (responseData && responseData.success === false) {
      return NextResponse.json(
        { success: false, message: responseData.message || "Failed to submit pre-order" },
        { status: response.status >= 200 && response.status < 400 ? 200 : response.status }
      );
    }

    // Return success response
    return NextResponse.json(
      responseData || { success: true, message: "Data saved successfully" },
      { status: response.status >= 200 && response.status < 400 ? 200 : 500 }
    );
  } catch (error: any) {
    console.error("Pre-order API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Network error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

