import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import InspectionForm from "./pages/InspectionForm";
import Validation from "./pages/Validation";
import History from "./pages/History";
import { useAuth } from "./context/AuthContext";

export default function AppRoutes() {
  const { user } = useAuth();

  if (!user) return (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user.role === "inspector" && <Route path="/inspection" element={<InspectionForm />} />}
      {user.role === "validator" && <Route path="/validation" element={<Validation />} />}
      <Route path="/history" element={<History />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}