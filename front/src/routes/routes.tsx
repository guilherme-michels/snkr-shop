import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import { AdminPage } from "../pages/Admin/AdminPage";
import { Authenticate } from "../pages/Authenticate/Authenticate";
import { LandingPage } from "../pages/Landing/LandingPage";
import { ShoePage } from "../pages/Shoes/ShoePage";
import { ShoesPage } from "../pages/Shoes/ShoesPage";
import { useAuth } from "../context/AuthContext";
import { AdminEdit } from "../pages/Admin/AddAdmin/AdminEdit";
import { NikeInvenciblePage } from "../pages/Shoes/NikeInvencible";
import { ProductEdit } from "../pages/Admin/AddProduct/ProductEdit";
import { UserPage } from "../pages/User/UserPage";
import { EndPurchasePage } from "../pages/User/EndPurchase";

export function AppRoutes() {
  return (
    <ReactRoutes>
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/my-profile" element={<UserPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/end-purchase" element={<EndPurchasePage />} />

      <Route path="/shoes" element={<ShoesPage />} />
      <Route path="/shoes/:id/see" element={<ShoePage />} />
      <Route path="/product/:id/update" element={<ProductEdit />} />

      <Route path="/shoes/nike-invencible" element={<NikeInvenciblePage />} />
    </ReactRoutes>
  );
}

function AdminRoutes() {
  return (
    <ReactRoutes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/my-profile" element={<UserPage />} />
      <Route path="/person/:id/update" element={<AdminEdit />} />
      <Route path="/end-purchase" element={<EndPurchasePage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/authenticate" element={<Authenticate />} />

      <Route path="/shoes" element={<ShoesPage />} />
      <Route path="/shoes/:id/see" element={<ShoePage />} />
      <Route path="/product/:id/update" element={<ProductEdit />} />

      <Route path="/shoes/nike-invencible" element={<NikeInvenciblePage />} />
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
  if (localStorage.getItem("position") === "Admin") {
    return <AdminRoutes />;
  } else {
    return <AppRoutes />;
  }
}
