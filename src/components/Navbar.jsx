import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import SettingsPage from "./Settings";
const Navbar = ({ user = { name: "Alice Smith" } }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <header className="w-full bg-black text-white px-8 py-4 shadow-lg flex justify-between items-center border-b border-zinc-800">
      {/* Logo / Title */}
      <div className="text-2xl font-bold tracking-tight text-yellow-400 flex items-center gap-2">
        Welcome, <span className="font-semibold text-white">{user.name}</span>
      </div>

      {/* Right Section: User Info + Actions */}
      <div className="flex items-center gap-4">
        {/* Greeting */}

        {/* Settings Button */}
        <button
          onClick={handleSettings}
          className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all duration-150 border border-zinc-700"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
