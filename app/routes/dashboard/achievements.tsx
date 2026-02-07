import type { Route } from "./+types/achievements";
import DashboardPlaceholder from "../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Mis Logros - Minarai" }];
}

export default function Achievements() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Mis Logros</h1>
      <DashboardPlaceholder />
    </div>
  );
}
