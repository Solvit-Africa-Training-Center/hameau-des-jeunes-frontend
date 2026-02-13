import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem("accessToken");
  const userString = localStorage.getItem("user");

  if (!accessToken || !userString) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (allowedRoles && allowedRoles.length > 0) {
    try {
      const user = JSON.parse(userString);

      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on their role
        switch (user.role) {
          case "SYSTEM_ADMIN":
            return <Navigate to="/superAdminDashboard" replace />;
          case "RESIDENTIAL_MANAGER":
            return <Navigate to="/residentialCareDashboard" replace />;
          case "INTERNSHIPS_MANAGER":
            return <Navigate to="/internshipsDashboard" replace />;
          case "IFASHE_MANAGER":
            return <Navigate to="/ifasheTugufasheDashboard" replace />;
          default:
            return <Navigate to="/login" replace />;
        }
      }
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};
