import { Routes, Route } from "react-router-dom";
import Home from "@pages/home/Home";
import { AuthTabs } from "@pages/auth";
import ForgotPassword from "@pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "@pages/auth/reset-password/ResetPassword";
import Events from "@pages/events/Events";
import Event from "@pages/events/Event";
import AdminDashboard from "@pages/admin/AdminDashboard";
import AdminRoute from "@pages/AdminRoute";
import CreateEvent from "@pages/admin/events/CreateEvent";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/app/login" element={<AuthTabs />} />
    <Route path="/events" element={<Events />} />
    <Route path="/event/:eventId" element={<Event />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/admin-dashboard" element={<AdminRoute />}>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard/events" element={<CreateEvent />} />
    </Route>
  </Routes>
);
