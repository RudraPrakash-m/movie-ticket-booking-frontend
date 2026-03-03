import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Film,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/add-movie", icon: Film, label: "Add Movie" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/bookings", icon: Ticket, label: "Bookings" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-950 text-white
        shadow-2xl flex flex-col z-50
        transition-all duration-300
        ${collapsed ? "md:w-20" : "md:w-64"}
        w-64
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Menu
              className="md:hidden cursor-pointer"
              onClick={() => setMobileOpen(false)}
            />
            {!collapsed && (
              <h1 className="text-lg font-semibold tracking-wide">
                Admin Panel
              </h1>
            )}
          </div>

          {/* Collapse button (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-1 rounded hover:bg-gray-800 transition"
          >
            {collapsed ? "»" : "«"}
          </button>

          {/* Close button mobile */}
          <button onClick={() => setMobileOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.to}
                end={item.to === "/admin"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-red-400 hover:text-red-500 transition"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden bg-gray-900 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default AdminSidebar;
