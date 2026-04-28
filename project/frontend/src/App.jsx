import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EquipmentListPage from './pages/EquipmentListPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';
import MyReservationsPage from './pages/MyReservationsPage';
import ManageEquipmentPage from './pages/admin/ManageEquipmentPage';
import { GLOBAL_CSS } from './theme';

function Layout({ children }) {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <NavBar />
      <main style={{ paddingTop: 60, minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px' }}>
          {children}
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><DashboardPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/equipment" element={
              <ProtectedRoute>
                <Layout><EquipmentListPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/equipment/:id" element={
              <ProtectedRoute>
                <Layout><EquipmentDetailPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/reservations/my" element={
              <ProtectedRoute>
                <Layout><MyReservationsPage /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/equipment" element={
              <AdminRoute>
                <Layout><ManageEquipmentPage /></Layout>
              </AdminRoute>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
