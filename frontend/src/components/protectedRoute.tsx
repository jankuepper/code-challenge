import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./authProvider";
import { useEffect } from "react";

export function ProtectedRoute() {
  const { authData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authData?.token) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
}
