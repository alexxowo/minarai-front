import type { Route } from "./+types/students";
import DashboardPlaceholder from "../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Listado de Alumnos - Minarai" }];
}

export default function Students() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide">Listado de Alumnos</h1>
      <DashboardPlaceholder />
    </div>
  );
}
