import axios from "axios";

export interface PreOrderData {
  name: string;
  phone: string;
  quantity: number;
  color: string;
  email: string;
  timestamp: string;
}

// Use Next.js API route to proxy request (avoids CORS issues)
const API_ROUTE = "/api/preorder";

export const submitPreOrder = async (data: PreOrderData): Promise<void> => {
  try {
    const response = await axios.post(API_ROUTE, data, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000, // 30 second timeout
    });

    // Check response from API route
    const responseData = response.data;

    if (responseData && responseData.success === false) {
      throw new Error(responseData.message || "Failed to submit pre-order");
    }

    // If we got here and status is 200, it's successful
    if (response.status === 200) {
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

    // Handle HTTP errors from API route
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

