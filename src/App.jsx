import React from "react";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import SettingsPage from "./components/Settings";
import { ThemeProvider } from "./components/theme-provider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import VantaBackground from "./components/vantaBackground";
import Dashboard from "./components/Dashboard";
import "./index.css";
import AdminDashboard from "../src/components/admin/AdminDashboard";

const AppRoutes = () => {
  const location = useLocation();

  // Only show Vanta on login or signup
  const showVanta =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {showVanta && <VantaBackground />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
