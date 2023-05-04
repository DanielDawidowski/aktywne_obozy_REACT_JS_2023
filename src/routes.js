import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@pages/home/Home";
import { AuthTabs } from "@pages/auth";
import ForgotPassword from "@pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "@pages/auth/reset-password/ResetPassword";
import Events from "@pages/events/Events";
import Event from "@pages/events/Event";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <AnimatePresence mode="wait">
      <Route path="/" element={<Home />}>
        <Route path="app/login" element={<AuthTabs />} />
        <Route path="app/forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="events" element={<Events />} />
        <Route path="event/:eventId" element={<Event />} />
      </Route>
    </AnimatePresence>
  )
);
