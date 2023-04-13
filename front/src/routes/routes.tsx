import { Routes as ReactRoutes, Route } from "react-router-dom";
import { AdminPage } from "../pages/Admin/AdminPage";
import { Authenticate } from "../pages/Authenticate/Authenticate";
import { LandingPage } from "../pages/Landing/LandingPage";
import { ShoePage } from "../pages/Shoes/ShoePage";
import { ShoesPage } from "../pages/Shoes/ShoesPage";
import { useAuth } from "../context/AuthContext";
import { AdminEdit } from "../pages/Admin/AddAdmin/AdminEdit";

export function AppRoutes() {
  return (
    <ReactRoutes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/shoes" element={<ShoesPage />} />
      <Route path="/shoe/1" element={<ShoePage />} />
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/person/:id/update" element={<AdminEdit />} />
    </ReactRoutes>
  );
}

function AuthRoutes() {
  return (
    <ReactRoutes>
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/" element={<LandingPage />} />
    </ReactRoutes>
  );
}

export function Routes() {
  const { auth } = useAuth();

  if (auth.isLoading) return <span>Carregando...</span>;
  if (!auth.isAuthenticated) return <AuthRoutes />;

  return <AppRoutes />;
}
