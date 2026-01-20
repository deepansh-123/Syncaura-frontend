import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Meetings from "./pages/Meetings";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Meeting/Header/Header";
import MobileSidebar from "./components/MobileSidebar";
import Complaints from "./pages/Complaints";
import AttendanceLeave from "./pages/AttendanceLeave";
import Notice from "./pages/Notice";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminHeader from "./components/admin/AdminHeader";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/normal-dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <MainLayout
              SideBar={AdminSidebar}
              TopbarComponent={AdminHeader}
            >
              <Admin />
            </MainLayout>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* User dashboard with a different Topbar */}
        <Route
          path="/user-dashboard"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar} >
              <div className="  w-full h-full">
                <UserDashboard />
              </div>
            </MainLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar}>
              <Projects />
            </MainLayout>
          }
        />
        <Route
          path="/attendance-leave"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar}>
              <AttendanceLeave />
            </MainLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <MainLayout TopbarComponent={Header}>
              <Tasks />
            </MainLayout>
          }
        />
        <Route
          path="/meetings"
          element={
            <MainLayout SideBar={MobileSidebar} TopbarComponent={Header}>
              <Meetings />
            </MainLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar} >
              <Chat />
            </MainLayout>
          }
        />
        <Route
          path="/notice"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar} >
              <Notice />
            </MainLayout>
          }
        />
        <Route
          path="/documents"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar} >
              <Documents />
            </MainLayout>
          }
        />

        <Route
          path="/complaints"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar} >
              <Complaints />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout TopbarComponent={Header} SideBar={MobileSidebar} >
              <Settings />
            </MainLayout>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}
