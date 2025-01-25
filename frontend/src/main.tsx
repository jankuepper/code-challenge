import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ContractView } from "./pages/ContractView";
import { Toaster } from "@/components/ui/toaster";
import { ContractAudit } from "./pages/ContractAudit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<ContractView />} />
        <Route path="/contract-audit" element={<ContractAudit />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
