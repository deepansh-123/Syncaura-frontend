import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  MessageSquare,
  Calendar,
  FileText,
  AlertTriangle,
  Megaphone,
  Clock,
  Link,
  Settings,
} from "lucide-react";

import { FiUmbrella } from "react-icons/fi";
import { BiBarChartSquare } from "react-icons/bi";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Folder, label: "Projects", path: "/projects" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: Calendar, label: "Meetings", path: "/meetings" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: AlertTriangle, label: "Competitors", path: "/competitors" },
  { icon: Megaphone, label: "Notice", path: "/notice" },
  { icon: Clock, label: "Attendance", path: "/attendance" },
  { icon: FiUmbrella, label: "Leave", path: "/leave" },
  { icon: BiBarChartSquare, label: "Performance", path: "/performance" },
  { icon: Link, label: "Integrations", path: "/integrations" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const AdminSidebar = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const location = useLocation();

  return (
    <aside
      className={`w-64 h-screen flex flex-col border-r transition-colors ${
        isDark ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-gray-300"
      }`}
    >
      {/* Logo */}
      <div
        className={`h-16 px-6 flex items-center border-b transition-colors ${
          isDark ? "border-[#0F172A]" : "border-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span
            className={`font-semibold tracking-wide transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            NEXUS
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? isDark
                      ? "bg-white/10 text-white"
                      : "bg-gray-100 text-gray-900"
                    : isDark
                    ? "text-slate-300 hover:bg-white/5 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
