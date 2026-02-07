import type { Route } from "./+types/invoices-create";
import DashboardPlaceholder from "../../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Emitir Factura - Minarai" }];
}

export default function InvoicesCreate() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Emitir Factura</h1>
      <DashboardPlaceholder />
    </div>
  );
}
