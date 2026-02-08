import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function AdminGuard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      // Redirect to dashboard home or show unauthorized page
      // For now, redirecting to the main dashboard
      navigate("/dashboard", { replace: true });
      alert("Acceso no autorizado. Se requieren permisos de administrador.");
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null; // Don't render outlet content while redirecting
  }

  return <Outlet />;
}
