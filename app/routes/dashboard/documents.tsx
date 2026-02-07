import type { Route } from "./+types/documents";
import DashboardPlaceholder from "../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Mis Documentos - Minarai" }];
}

export default function Documents() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Mis Documentos</h1>
      <DashboardPlaceholder />
    </div>
  );
}
