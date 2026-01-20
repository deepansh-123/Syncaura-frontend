import AdminStats from "../components/admin/AdminStats";
import AdminTable from "../components/admin/AdminTable";
import { Clock } from "lucide-react";
import { useSelector } from "react-redux";

const DashboardHeader = ({ isDark }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* LEFT */}
      <div>
        <h1
          className={`font-poppins text-[28px] ml-9 mt-2 font-bold leading-[100%] ${
            isDark ? "text-[#F1F5F9]" : "text-gray-900"
          }`}
        >
          Dashboard Overview
        </h1>

        <p
          className={`mt-[18px] ml-9 font-poppins text-[18.5px] font-semibold leading-[100%] ${
            isDark ? "text-[#94A3B8]" : "text-gray-600"
          }`}
        >
          Welcome back, here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* RIGHT: LAST UPDATED BOX */}
      <div
        className={`w-[238px] h-[42px] flex items-center gap-2 px-[12px] rounded-[7px] ${
          isDark ? "bg-[#1E293B]" : "bg-[#F1F5F9]"
        }`}
      >
      
        <span
          className={`font-poppins text-[11px] font-semibold leading-[100%] ${
            isDark ? "text-[#64748B]" : "text-gray-500"
          } whitespace-nowrap`}
        >
          Last updated: Just now
        </span>
         <Clock className={`ml-16 w-4 h-4 ${isDark ? "text-[#64748B]" : "text-gray-500"}`} />
      </div>
    </div>
  );
};

const Admin = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div
      className={`flex min-h-screen transition-colors ${
        isDark ? "bg-[#0B1220] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Dashboard content */}
      <main className="flex-1 p-6">
        {/* Dashboard Overview */}
        <DashboardHeader isDark={isDark} />

        {/* Stats Cards */}
        <div className="mb-6">
          <AdminStats isDark={isDark} />
        </div>

        {/* Table / Charts */}
        <AdminTable isDark={isDark} />
      </main>
    </div>
  );
};

export default Admin;
