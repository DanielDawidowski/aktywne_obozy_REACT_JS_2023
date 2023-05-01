import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import { AuthTabs } from "./pages/auth";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";

export const Routes = () => {
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
      path: "/app/forgot-password",
      element: <ForgotPassword />
    }
  ]);
  return elements;
};
