import React from "react";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
