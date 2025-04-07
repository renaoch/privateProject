import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  const contractorInfo = {
    id: "CTR-52810",
    name: "John Doe",
    email: "johndoe@example.com",
    specialization: "Frontend Developer",
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-zinc-400 text-sm">
          Manage your profile and preferences
        </p>
      </div>

      {/* Contractor Info */}
      <Card className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-lg transition hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-xl tracking-wide">
            Contractor Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-300">
          {[
            { label: "Contractor ID", value: contractorInfo.id },
            { label: "Name", value: contractorInfo.name },
            { label: "Email", value: contractorInfo.email },
            { label: "Specialization", value: contractorInfo.specialization },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <Label className="text-zinc-400 w-40">{item.label}</Label>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-lg transition hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-xl tracking-wide">
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="text-yellow-400 w-5 h-5" />
            ) : (
              <Sun className="text-orange-400 w-5 h-5" />
            )}
            <Label className="text-zinc-300 text-sm">Dark Theme</Label>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={setIsDark}
            className="bg-zinc-700 data-[state=checked]:bg-green-500 transition"
          />
        </CardContent>
      </Card>
    </div>
  );
}
