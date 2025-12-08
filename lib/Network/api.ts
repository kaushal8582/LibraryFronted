
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import toast from "react-hot-toast";




// ✅ Create Axios instance with some defaults
const axiosInstance = axios.create({
  baseURL:  "https://librarybackend-ke0y.onrender.com/api",
  timeout: 15000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// .

// Dynamically set content type
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (
      config.data instanceof FormData
    ) {
      // ❗IMPORTANT: let axios set correct multipart boundary
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


//  Interceptor for handling common response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirecting to login...");
     
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = `/auth/login?callback=${location.pathname}`;
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// ✅ Define types for clarity
interface ApiCallerProps {
  method?: Method;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  showError?: boolean;
  showSuccess?: boolean;
  customBaseURL?: string;
  responseType?: AxiosRequestConfig["responseType"];
}

/**
 * 🌐 Universal API Caller
 * - Default behavior for most requests
 * - Easily customizable during each call
 */
export const apiCaller = async <T = any>({
  method = "GET",
  url,
  data = {},
  params = {},
  headers = {},
  showError = true,
  showSuccess = false,
  customBaseURL,
  responseType = "json",
}: ApiCallerProps): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
      responseType,
      baseURL: customBaseURL || axiosInstance.defaults.baseURL,
    };

    const response: AxiosResponse<T> = await axiosInstance(config);

    if (showSuccess) console.info("✅ Success:", response.data);
    return response.data;
  } catch (error: any) {
    if (showError) console.error("❌ API Error:", error);
    toast.error(error.message || "An unknown error occurred");
    throw error;
  }
};
