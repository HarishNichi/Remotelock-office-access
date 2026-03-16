import axios from "axios";

// Mock API Client Configuration
const apiClient = axios.create({
  baseURL: "/api", // Placeholder for real API
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (e.g., Auth Token)
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (Error Handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle Unauthorized
    }
    return Promise.reject(error);
  }
);

export default apiClient;
