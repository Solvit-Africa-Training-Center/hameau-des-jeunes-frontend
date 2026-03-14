/**
 * Centralized API Configuration
 *
 * Base URL is loaded from environment variables (.env file).
 * For Vite, environment variables must be prefixed with VITE_
 * and are exposed via import.meta.env.
 */

// Get base URL from environment, with fallback for development
const baseUrl =
  import.meta.env.VITE_API_BASE_URL ;

export const API_CONFIG = {
  // Base URL for all API requests (from .env file)
  BASE_URL: baseUrl,
} as const;

/**
 * Prepares headers with authorization token
 * Used across all API slices
 */
export const preparaAuthHeaders = (headers: Headers) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    console.warn(
      "[API] No access token found in localStorage. Make sure you're authenticated.",
    );
  }
  return headers;
};
