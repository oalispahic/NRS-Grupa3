import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import AppLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EquipmentListPage from './pages/EquipmentListPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';
import MyReservationsPage from './pages/MyReservationsPage';
import ProfilePage from './pages/ProfilePage';
import ManageEquipmentPage from './pages/admin/ManageEquipmentPage';
import ReservationsPage from './pages/admin/ReservationsPage';
import ActivityLogPage from './pages/admin/ActivityLogPage';
import CurrentUsagePage from './pages/admin/CurrentUsagePage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout><DashboardPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/equipment" element={
              <ProtectedRoute>
                <AppLayout><EquipmentListPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/equipment/:id" element={
              <ProtectedRoute>
                <AppLayout><EquipmentDetailPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/reservations/my" element={
              <ProtectedRoute>
                <AppLayout><MyReservationsPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <AppLayout><ProfilePage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/equipment" element={
              <AdminRoute>
                <AppLayout><ManageEquipmentPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/reservations" element={
              <AdminRoute>
                <AppLayout><ReservationsPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/activity-log" element={
              <AdminRoute>
                <AppLayout><ActivityLogPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/active-usage" element={
              <AdminRoute>
                <AppLayout><CurrentUsagePage /></AppLayout>
              </AdminRoute>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
