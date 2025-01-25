import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./authProvider";
import { useEffect } from "react";

export function ProtectedRoute() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
}
