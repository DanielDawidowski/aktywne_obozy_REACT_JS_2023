import { useRoutes } from "react-router-dom";
import { AuthTabs, ForgotPassword, ResetPassword } from "@pages/auth";
import Home from "@pages/home/Home";
import Events from "@pages/events/Events";
import Event from "@pages/events/Event";
import AdminDashboard from "@pages/admin/AdminDashboard";
import AdminRoute from "@pages/AdminRoute";
import CreateEvent from "@pages/admin/events/CreateEvent";
import Clients from "@pages/admin/clients/Clients";
import EditClient from "@pages/admin/clients/EditClient";

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/app/login",
      element: <AuthTabs />
    },
    {
      path: "/events",
      element: <Events />
    },
    {
      path: "/event/:eventId",
      element: <Event />
    },
    {
      path: "/app/login",
      element: <AuthTabs />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      )
    },
    {
      path: "/admin/events",
      element: (
        <AdminRoute>
          <CreateEvent />
        </AdminRoute>
      )
    },
    {
      path: "/admin/clients",
      element: (
        <AdminRoute>
          <Clients />
        </AdminRoute>
      )
    },
    {
      path: "/admin/client/:clientId",
      element: (
        <AdminRoute>
          <EditClient />
        </AdminRoute>
      )
    }
    // {
    //   path: "*",
    //   element: <Error />
    // }
  ]);
  return elements;
};
