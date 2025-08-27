import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("campusfind_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token is invalid or expired
      localStorage.removeItem("campusfind_token");
      localStorage.removeItem("campusfind_user");
      // Optionally redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  signup: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);

      // Store token and user data
      if (response.data.token) {
        localStorage.setItem("campusfind_token", response.data.token);
        localStorage.setItem(
          "campusfind_user",
          JSON.stringify(response.data.user)
        );
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Signup failed");
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      // Store token and user data
      if (response.data.token) {
        localStorage.setItem("campusfind_token", response.data.token);
        localStorage.setItem(
          "campusfind_user",
          JSON.stringify(response.data.user)
        );
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data.user;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to get user profile"
      );
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/auth/profile", profileData);

      // Update stored user data
      if (response.data.user) {
        localStorage.setItem(
          "campusfind_user",
          JSON.stringify(response.data.user)
        );
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to update profile"
      );
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put("/auth/change-password", passwordData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to change password"
      );
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("campusfind_token");
    localStorage.removeItem("campusfind_user");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("campusfind_token");
    const user = localStorage.getItem("campusfind_user");
    return !!(token && user);
  },

  // Get stored user data
  getStoredUser: () => {
    try {
      const user = localStorage.getItem("campusfind_user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  },
};

// General API functions
export const generalAPI = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      throw new Error("Backend is not responding");
    }
  },
};

// Export the axios instance for custom requests
export default api;
