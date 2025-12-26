import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = (): JSX.Element => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Routes>
        {/* Unauthenticated routes with Navbar */}
        <Route
          path="/login"
          element={
            !authUser ? (
              <>
                <Navbar />
                <LoginPage />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !authUser ? (
              <>
                <Navbar />
                <SignUpPage />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Authenticated routes with DashboardLayout */}
        <Route
          path="/"
          element={
            authUser ? (
              <DashboardLayout>
                <HomePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            authUser ? (
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? (
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
