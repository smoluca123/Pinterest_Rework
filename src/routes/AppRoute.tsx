import AppLayout from "@/layouts/AppLayout";
import SignInPage from "@/modules/auth/components/SignInPage";
import SignUpPage from "@/modules/auth/components/SignUpPage";
import AuthPage from "@/modules/auth/pages/AuthPage";
import Home from "@/modules/home/pages/Home";
import PinCreatePage from "@/modules/pin-create/pages/PinCreatePage";
import PinDetailPage from "@/modules/pin/pages/PinDetailPage";
import MePage from "@/modules/profile/pages/MePage";
import ProfilePage from "@/modules/profile/pages/ProfilePage";
import PrivateRoute from "@/routes/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="pin/:pinId/:pinSlug" element={<PinDetailPage />} />
          <Route
            path="/pin-create"
            element={
              <PrivateRoute>
                <PinCreatePage />
              </PrivateRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />}>
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="/profile" element={<MePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
