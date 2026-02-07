import type { Route } from "./+types/invoices";
import DashboardPlaceholder from "../../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Listado de Recibos - Minarai" }];
}

export default function Invoices() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Listado de Recibos</h1>
      <DashboardPlaceholder />
    </div>
  );
}
