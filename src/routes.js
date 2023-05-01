import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import { AuthTabs } from "./pages/auth";

export const Routes = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/app/login",
      element: <AuthTabs />
    }
  ]);
  return elements;
};
