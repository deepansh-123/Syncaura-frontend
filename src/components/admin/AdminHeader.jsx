import { Search, Bell, User, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMethod } from "../../redux/slices/themeSlice";

const AdminHeader = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeMethod());
  };

  return (
    <header
      className={`flex items-center justify-between h-[86px] px-6 border-b transition-colors
        ${isDark ? "bg-[#0E1628] border-[#1E293B]" : "bg-white border-white"}
      `}
    >
      {/* Search */}
      <div className="flex items-center max-w-[360px] w-full">
        <div className="relative w-full">
          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search projects, tasks, documents..."
            className={`w-full h-[53px] pl-11 pr-4 rounded-[5px] text-sm placeholder:text-gray-400 focus:outline-none transition-colors ${
              isDark ? "bg-[#1E293B] text-white" : "bg-[#F8FAFC] text-gray-700"
            }`}
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative w-[50px] h-[50px]"
        >
          <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center">
            <div
              className={`w-[45px] h-[45px] rounded-full flex items-center justify-center transition-colors ${
                isDark ? "bg-[#334155]" : "bg-white border-2 border-black"
              }`}
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-[#FACC15]" />
              ) : (
                <Moon className="w-6 h-6 text-[#2563EB]" />
              )}
            </div>
          </div>
        </button>

        {/* Notification */}
        <div className="relative">
          <Bell
            className={`w-5 h-5 transition-colors ${
              isDark ? "text-white" : "text-gray-700"
            }`}
          />
          <span className="absolute -top-2 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </div>

        {/* Profile */}
        <button
          className={`w-[45px] h-[45px] rounded-full flex items-center justify-center transition-colors
            ${isDark ? "bg-[#334155] border-black" : "bg-white border-gray-300"} border`}
        >
          <User
            className={`w-5 h-5 transition-colors ${
              isDark ? "text-white" : "text-gray-700"
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
