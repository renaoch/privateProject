"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { supabase } from "./lib/supabaseClient"; // Import supabase client

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");
  const [contractorInfo, setContractorInfo] = useState(null); // State to store contractor info
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const fetchContractorInfo = async () => {
      // Get the current logged-in user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const currentUser = userData?.user;

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      if (currentUser) {
        // Fetch contractor info from the 'contractor' table or wherever it's stored
        const { data, error } = await supabase
          .from("contractor") // Make sure to replace with your actual table name
          .select("*")
          .eq("id", currentUser.id)
          .single(); // Use single() to get one record (since we're fetching for a specific user)

        if (error) {
          console.error("Error fetching contractor info:", error);
        } else {
          setContractorInfo(data);
        }
      }

      setLoading(false); // Set loading to false after fetching data
    };

    fetchContractorInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* Loading Spinner */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-zinc-300 text-xl">
            Loading contractor info...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
          Settings
        </h1>
        <p className="text-zinc-400 text-lg">
          Manage your profile and preferences
        </p>
      </div>

      {/* Contractor Info */}
      <Card className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-semibold tracking-wide">
            Contractor Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-sm text-zinc-300">
          {[
            { label: "Contractor ID", value: contractorInfo.id },
            { label: "Name", value: contractorInfo.name },
            { label: "Email", value: contractorInfo.email },
            { label: "Specialization", value: contractorInfo.specialization },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-5">
              <Label className="text-zinc-400 w-44 font-medium">
                {item.label}
              </Label>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-semibold tracking-wide">
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-4">
            {isDark ? (
              <Moon className="text-yellow-400 w-6 h-6" />
            ) : (
              <Sun className="text-orange-400 w-6 h-6" />
            )}
            <Label className="text-zinc-300 text-md">Dark Theme</Label>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={setIsDark}
            className="bg-zinc-700 data-[state=checked]:bg-green-500 rounded-full p-1 transition duration-200"
          />
        </CardContent>
      </Card>
    </div>
  );
}
