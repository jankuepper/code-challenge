import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ContractView } from "./pages/ContractView";
import { Toaster } from "@/components/ui/toaster";
import { ContractAudit } from "./pages/ContractAudit";
import { AuthProvider } from "./components/authProvider";
import { ProtectedRoute } from "./components/protectedRoute";
import { Home } from "./pages/Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/contracts" element={<ContractView />} />
            <Route path="/contract-audit" element={<ContractAudit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <Toaster />
  </StrictMode>
);
