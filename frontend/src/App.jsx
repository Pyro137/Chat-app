import { Toaster } from 'react-hot-toast';
import './index.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const { checkAuth, authUser, isCheckingAuth,onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log(onlineUsers)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply theme to <html> tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin size-10' />
      </div>
    );
  }

  console.log({ authUser });

  return (
    <div data-theme={theme}> {/* Apply theme at the root */}
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
