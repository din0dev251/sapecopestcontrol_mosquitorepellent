import axios from "axios";

export interface PreOrderData {
  name: string;
  phone: string;
  quantity: number;
  color: string;
  email: string;
  timestamp: string;
}

// Google Apps Script Web App URL
// Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export const submitPreOrder = async (data: PreOrderData): Promise<void> => {
  // Check if URL is configured
  if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    throw new Error("Google Script URL is not configured. Please set NEXT_PUBLIC_GOOGLE_SCRIPT_URL environment variable.");
  }

  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
      // Google Apps Script specific configuration
      maxRedirects: 5, // Allow redirects (Google Apps Script may redirect once)
      validateStatus: (status) => status >= 200 && status < 400, // Accept 2xx and 3xx
      timeout: 30000, // 30 second timeout
    });

    // Google Apps Script may return 302 redirect or 200
    // Check if response indicates success
    let responseData = response.data;
    
    // Handle case where response might be a string (JSON string or HTML)
    if (typeof responseData === 'string') {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {
        // If it's not JSON, it might be HTML error page
        if (responseData.includes('<!DOCTYPE') || responseData.includes('<html')) {
          throw new Error("Server returned an error page. Please check Google Apps Script deployment.");
        }
        // If it's a plain string, use it as message
        throw new Error(responseData || "Failed to submit pre-order");
      }
    }

    // Check if response indicates failure
    if (responseData && typeof responseData === 'object') {
      if (responseData.success === false) {
        throw new Error(responseData.message || "Failed to submit pre-order");
      }
      // If success is true or not specified, consider it successful
      if (responseData.success === true || response.status >= 200 && response.status < 400) {
        return Promise.resolve();
      }
    }

    // If status is 200-399, consider it successful
    if (response.status >= 200 && response.status < 400) {
      return Promise.resolve();
    }

    throw new Error("Failed to submit pre-order");
  } catch (error: any) {
    // Handle network errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error("Request timeout. Please try again later.");
    }
    
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error("Network error. Please check your connection and try again.");
    }

    // Handle HTTP errors
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error?.message ||
                          `Server error: ${error.response.status}`;
      throw new Error(errorMessage);
    }

    // Handle other errors
    if (error.message) {
      throw error;
    }

    throw new Error("Network error. Please try again later.");
  }
};

