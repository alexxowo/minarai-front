import type { Route } from "./+types/admin-panel";
import { StatCard } from "../../components/molecules/StatCard";
import { FaUserGraduate, FaUserCheck, FaUserTimes, FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { adminStatsApiClient } from "../../utils/api-client";
import type { StatCardResponse } from "../../api-client/models";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panel Administrativo - Minarai" },
  ];
}

export default function AdminPanel() {
  const [totalStudents, setTotalStudents] = useState<StatCardResponse | null>(null);
  const [activeStudents, setActiveStudents] = useState<StatCardResponse | null>(null);
  const [inactiveStudents, setInactiveStudents] = useState<StatCardResponse | null>(null);

  const [loadingTotal, setLoadingTotal] = useState(true);
  const [loadingActive, setLoadingActive] = useState(true);
  const [loadingInactive, setLoadingInactive] = useState(true);

  const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    adminStatsApiClient.getTotalStudents()
      .then(res => {
        if (res && res.data) {
          setTotalStudents(res.data);
        }
      })
      .catch(err => console.error("Error fetching total students:", err))
      .finally(() => setLoadingTotal(false));

    adminStatsApiClient.getActiveStudents()
      .then(res => {
        if (res && res.data) {
          setActiveStudents(res.data);
        }
      })
      .catch(err => console.error("Error fetching active students:", err))
      .finally(() => setLoadingActive(false));

    adminStatsApiClient.getInactiveStudents()
      .then(res => {
        if (res && res.data) {
          setInactiveStudents(res.data);
        }
      })
      .catch(err => console.error("Error fetching inactive students:", err))
      .finally(() => setLoadingInactive(false));
  }, []);

  const activeStudentsList = [
    { id: '1', name: "Ana García", grade: "Cinta Blanca", status: "Activo", lastPayment: "05/02/2024" },
    { id: '2', name: "Carlos López", grade: "Cinta Amarilla", status: "Activo", lastPayment: "03/02/2024" },
    { id: '3', name: "María Rodríguez", grade: "Cinta Verde", status: "Activo", lastPayment: "01/02/2024" },
    { id: '4', name: "Juan Pérez", grade: "Cinta Azul", status: "Activo", lastPayment: "10/02/2024" },
    { id: '5', name: "Sofía Martínez", grade: "Cinta Blanca", status: "Activo", lastPayment: "08/02/2024" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide">Panel Administrativo</h1>
            <p className="mt-1 text-sm text-gray-500">Resumen general del dojo</p>
        </div>
        <div className="mt-4 sm:mt-0 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center text-gray-600 text-sm font-medium">
            <FaCalendarAlt className="mr-2 text-golden-rod-500" />
            <span className="capitalize">{currentDate}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Alumnos"
          value={totalStudents?.value ?? 0}
          icon={FaUserGraduate}
          color="bg-purple-500"
          trend={totalStudents?.trend ? { value: totalStudents.trend.value ?? 0, isPositive: totalStudents.trend.isPositive ?? true } : undefined}
          loading={loadingTotal}
        />
        <StatCard
          title="Alumnos Activos"
          value={activeStudents?.value ?? 0}
          icon={FaUserCheck}
          color="bg-green-500"
          trend={activeStudents?.trend ? { value: activeStudents.trend.value ?? 0, isPositive: activeStudents.trend.isPositive ?? true } : undefined}
          loading={loadingActive}
        />
        <StatCard
          title="Alumnos Inactivos"
          value={inactiveStudents?.value ?? 0}
          icon={FaUserTimes}
          color="bg-red-500"
          trend={inactiveStudents?.trend ? { value: inactiveStudents.trend.value ?? 0, isPositive: inactiveStudents.trend.isPositive ?? false } : undefined}
          loading={loadingInactive}
        />
      </div>

      {/* Active Students List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 font-bebas tracking-wide">Alumnos Activos Recientes</h3>
          <button className="text-sm text-golden-rod-600 hover:text-golden-rod-700 font-medium">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Pago</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeStudentsList.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastPayment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
