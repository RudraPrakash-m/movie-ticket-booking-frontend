import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Admin-Dashboard/adminSidebar/AdminSidebar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-64"} ml-0`}
      >
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
