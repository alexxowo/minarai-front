import type { Route } from "./+types/accounts";
import DashboardPlaceholder from "../../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cuentas - Minarai" }];
}

export default function Accounts() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Cuentas</h1>
      <DashboardPlaceholder />
    </div>
  );
}
