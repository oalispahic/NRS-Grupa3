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
import LocationsPage from './pages/admin/LocationsPage';
import UsersAdminPage from './pages/admin/UsersAdminPage';
import StatisticsPage from './pages/admin/StatisticsPage';
import ConsumablesPage from './pages/admin/ConsumablesPage';
import SettingsPage from './pages/admin/SettingsPage';
import ReportsPage from './pages/admin/ReportsPage';
import MaintenancePage from './pages/admin/MaintenancePage';
import MyTasksPage from './pages/MyTasksPage';
import MyActivityPage from './pages/MyActivityPage';
import RegisterPage from './pages/RegisterPage';
import MessagesPage from './pages/MessagesPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';

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
            <Route path="/admin/locations" element={
              <AdminRoute>
                <AppLayout><LocationsPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AppLayout><UsersAdminPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/statistics" element={
              <AdminRoute>
                <AppLayout><StatisticsPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/consumables" element={
              <AdminRoute>
                <AppLayout><ConsumablesPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AppLayout><SettingsPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/reports" element={
              <AdminRoute>
                <AppLayout><ReportsPage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/admin/maintenance" element={
              <AdminRoute>
                <AppLayout><MaintenancePage /></AppLayout>
              </AdminRoute>
            } />
            <Route path="/my-tasks" element={
              <ProtectedRoute>
                <AppLayout><MyTasksPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/my-activity" element={
              <ProtectedRoute>
                <AppLayout><MyActivityPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <AppLayout><MessagesPage /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <AdminRoute>
                <AppLayout><AdminMessagesPage /></AppLayout>
              </AdminRoute>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
