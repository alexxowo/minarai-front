import type { Route } from "./+types/dashboard";
import { Outlet, redirect, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Sidebar } from "../components/organisms/Sidebar";
import { UserMenu } from "../components/molecules/UserMenu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Minarai" },
  ];
}

export default function DashboardLayout() {
  const { isAuthenticated, isSidebarCollapsed } = useAuthStore();
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      navigate("/login");
    }
  }, [hydrated, isAuthenticated, navigate]);

  if (!hydrated || !isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black-beauty-50 font-raleway flex">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-[calc(16px+5rem+16px)]' : 'ml-[calc(16px+16rem+16px)]'
      }`}>
        <header className="bg-white shadow mt-4 mr-4 rounded-xl mb-6">
            <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 font-bebas">
                    Panel
                </h2>
                <UserMenu />
            </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
