import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Menu } from "lucide-react";

const Navbar = ({ user = { name: "Alice Smith" } }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <header className="w-full bg-black text-white px-4 sm:px-8 py-4 shadow-lg border-b border-zinc-800">
      <div className="flex justify-between items-center">
        {/* Logo / Greeting */}
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-yellow-400 flex items-center gap-2">
          JAGYA
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleSettings}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all duration-150 border border-zinc-700"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Actions Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          <button
            onClick={handleSettings}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
