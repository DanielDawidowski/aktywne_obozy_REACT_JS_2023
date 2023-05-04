import { useRoutes } from "react-router-dom";
import Home from "@pages/home/Home";
import { AuthTabs } from "@pages/auth";
import ForgotPassword from "@pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "@pages/auth/reset-password/ResetPassword";
import Events from "@pages/events/Events";
import Event from "@pages/events/Event";

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
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    }
  ]);
  return elements;
};
