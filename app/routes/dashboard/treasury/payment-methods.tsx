import type { Route } from "./+types/payment-methods";
import DashboardPlaceholder from "../../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Métodos de Pago - Minarai" }];
}

export default function PaymentMethods() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Métodos de Pago</h1>
      <DashboardPlaceholder />
    </div>
  );
}
