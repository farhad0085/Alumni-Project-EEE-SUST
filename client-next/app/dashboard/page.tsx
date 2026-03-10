"use client";

import PrivateRoute from "@/components/auth/PrivateRoute";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { setPageTitle } from "@/lib/helpers";

export default function DashboardPage() {
  setPageTitle("Dashboard");

  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">
          Welcome to the Department of EEE Dashboard. This is where you will
          manage users, view reports, and configure settings. The dashboard is
          currently under construction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-[#003366] mb-1">Users</h3>
            <p className="text-sm text-gray-500">
              Manage department users and access levels.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-[#003366] mb-1">Reports</h3>
            <p className="text-sm text-gray-500">
              View academic and administrative reports.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-[#003366] mb-1">Settings</h3>
            <p className="text-sm text-gray-500">
              Configure dashboard preferences and options.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-[#003366] mb-1">Notifications</h3>
            <p className="text-sm text-gray-500">
              Check system updates and alerts.
            </p>
          </div>
        </div>

        <p className="mt-8 italic text-gray-400 text-sm">
          More features are coming soon. Stay tuned!
        </p>
      </DashboardLayout>
    </PrivateRoute>
  );
}
