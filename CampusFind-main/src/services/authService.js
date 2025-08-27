import { authAPI } from "./api.js";

class AuthService {
  constructor() {
    // Keep legacy keys for now, but we'll primarily use the API
    this.CURRENT_USER_KEY = "campusfind_current_user";
    this.TOKEN_KEY = "campusfind_token";
  }

  // Get current logged in user from localStorage
  getCurrentUser() {
    try {
      return authAPI.getStoredUser();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return authAPI.isAuthenticated();
  }

  // Register a new user
  async register(userData) {
    try {
      const response = await authAPI.signup({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        studentId: userData.studentId || null,
        phone: userData.phone || null,
      });

      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Registration failed",
      };
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await authAPI.login({
        email: credentials.email,
        password: credentials.password,
      });

      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await authAPI.updateProfile(profileData);

      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        error: error.message || "Profile update failed",
      };
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await authAPI.changePassword(passwordData);

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      console.error("Password change error:", error);
      return {
        success: false,
        error: error.message || "Password change failed",
      };
    }
  }

  // Refresh user data from server
  async refreshUser() {
    try {
      const user = await authAPI.getCurrentUser();
      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error("Refresh user error:", error);
      return {
        success: false,
        error: error.message || "Failed to refresh user data",
      };
    }
  }

  // Logout user
  logout() {
    authAPI.logout();
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password) {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  }

  // Validate full name
  validateFullName(fullName) {
    if (!fullName || fullName.trim().length < 2) {
      return "Full name must be at least 2 characters long";
    }
    return null;
  }

  // Validate student ID format (optional)
  validateStudentId(studentId) {
    if (!studentId) return null; // Optional field

    // Basic validation - adjust based on your institution's format
    if (studentId.length < 3 || studentId.length > 20) {
      return "Student ID must be between 3 and 20 characters";
    }
    return null;
  }

  // Comprehensive registration validation
  validateRegistrationData(userData) {
    const errors = {};

    // Validate full name
    const nameError = this.validateFullName(userData.fullName);
    if (nameError) errors.fullName = nameError;

    // Validate email
    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(userData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!userData.password) {
      errors.password = "Password is required";
    } else {
      const passwordError = this.validatePassword(userData.password);
      if (passwordError) errors.password = passwordError;
    }

    // Validate confirm password
    if (userData.confirmPassword !== userData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Validate student ID (if provided)
    if (userData.studentId) {
      const studentIdError = this.validateStudentId(userData.studentId);
      if (studentIdError) errors.studentId = studentIdError;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // Comprehensive login validation
  validateLoginData(credentials) {
    const errors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(credentials.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
