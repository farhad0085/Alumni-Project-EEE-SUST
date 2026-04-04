"use client";

import { BarChart3, Home, Menu, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    { icon: <Users className="w-5 h-5" />, label: "Users", href: "#" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Reports", href: "#" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "#" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#1e293b] text-white flex flex-col transition-all duration-300 ${
          collapsed ? "w-[60px]" : "w-[220px]"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-4 border-b border-white/10 no-underline text-white"
        >
          <img
            src="https://www.sust.edu/public/img/sust_logo_big.png"
            alt="logo"
            className="w-8 h-8 rounded-full shrink-0"
          />
          {!collapsed && (
            <span className="font-semibold text-sm whitespace-nowrap">
              Dept. of EEE
            </span>
          )}
        </Link>

        <nav className="flex-1 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors no-underline"
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5">
          <button
            className="bg-transparent border-none cursor-pointer text-gray-600 hover:text-gray-900"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm font-medium text-gray-600">Admin</div>
        </header>

        <section className="flex-1 p-6">{children}</section>
      </div>
    </div>
  );
}
