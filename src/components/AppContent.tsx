import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainSidebar from "@/components/MainSidebar";
import SettingsSidebar from "@/components/SettingsSidebar";
import Home from "@/pages/Home";
import ProductPage from "@/pages/ProductPage";
import Blog from "@/pages/Blog";
import ProductsPage from "@/pages/ProductsPage";
import Transaction from "@/pages/Transaction";
import Clients from "@/pages/Clients";
import Withdrawals from "@/pages/Withdrawals";
import Orders from "@/pages/Orders";
import Refunds from "@/pages/Refunds";
import NotFound from "@/pages/NotFound";
import Auth from "@/components/Auth";
import AdminAuth from "@/components/AdminAuth";
import ProfileForm from "@/pages/ProfileForm";
import Configuration from "@/pages/Configuration";
import EditeurPage from "@/pages/EditeurPage";
import DonneesPage from "@/pages/DonneesPage";
import UsersDataUpdate from "@/pages/UsersDataUpdate";
import PaymentPreview from "@/pages/PaymentPreview";
import PublicPaymentPage from "@/pages/PublicPaymentPage";
import PageLayout from "@/components/layouts/PageLayout";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import PublicRoute from "@/components/routes/PublicRoute";

// Routes that should not display the sidebar
const noSidebarRoutes = ['/product', '/auth', '/admins', '/profile', '/725872d8-1cbe-4723-9d42-21e6ba1151ec'];

// Routes that should display the settings sidebar
const settingsRoutes = ['/configuration', '/editeur', '/donnees', '/page-apercu', '/product-page', '/page-layout'];

// Default product for PageLayout preview
const defaultProduct = {
  id: "preview-layout",
  name: "Sample Product",
  description: "This is a sample product for layout preview",
  long_description: "This is a longer description that shows how the layout handles more content...",
  amount: 5000,
  image_url: "/placeholder.svg",
  payment_link_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const AppContent = () => {
  const location = useLocation();
  const shouldShowSidebar = !noSidebarRoutes.some(route => location.pathname.startsWith(route));
  const isSettingsPage = settingsRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex min-h-screen max-w-[100vw] overflow-x-hidden">
      {shouldShowSidebar && !isSettingsPage && <MainSidebar />}
      {isSettingsPage && <SettingsSidebar userProfile={null} />}
      <main className={`flex-1 w-full overflow-y-auto ${shouldShowSidebar ? 'md:ml-64 max-w-7xl mx-auto' : 'md:w-full'}`}>
        <Routes>
          <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/admins" element={<PublicRoute><AdminAuth /></PublicRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/725872d8-1cbe-4723-9d42-21e6ba1151ec" element={<PublicPaymentPage />} />
          <Route path="/page-layout" element={<ProtectedRoute><PageLayout product={defaultProduct} /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/products-pages" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
          <Route path="/withdrawals" element={<ProtectedRoute><Withdrawals /></ProtectedRoute>} />
          <Route path="/refunds" element={<ProtectedRoute><Refunds /></ProtectedRoute>} />
          <Route path="/configuration" element={<ProtectedRoute><Configuration /></ProtectedRoute>} />
          <Route path="/editeur" element={<ProtectedRoute><EditeurPage /></ProtectedRoute>} />
          <Route path="/donnees" element={<ProtectedRoute><DonneesPage /></ProtectedRoute>} />
          <Route path="/usersdata-update" element={<ProtectedRoute><UsersDataUpdate /></ProtectedRoute>} />
          <Route path="/page-apercu" element={<ProtectedRoute><PaymentPreview /></ProtectedRoute>} />
          <Route path="/product-page" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppContent;