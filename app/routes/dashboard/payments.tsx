import type { Route } from "./+types/payments";
import { Link } from "react-router";
import { StatCard } from "../../components/molecules/StatCard";
import { MdAttachMoney, MdMoneyOff, MdCheckCircle, MdWarning } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Finanzas - Minarai" }];
}

export default function Payments() {
  // Mock Data
  const stats = {
    monthlyIncome: "$45,200.00",
    pendingAmount: "$12,500.00",
    successfulPayments: 145,
    reconciliationPending: 8,
  };

  const pendingUsers = [
    { id: '1', name: "Luis Hernández", amount: "$800.00", dueDate: "05/02/2024", status: "Vencido" },
    { id: '2', name: "Carmen Díaz", amount: "$1,200.00", dueDate: "10/02/2024", status: "Pendiente" },
    { id: '3', name: "Roberto Silva", amount: "$800.00", dueDate: "01/02/2024", status: "Vencido" },
    { id: '4', name: "Patricia Gómez", amount: "$800.00", dueDate: "12/02/2024", status: "Pendiente" },
  ];

  const solventUsers = [
    { id: '5', name: "Ana García", amount: "$800.00", date: "04/02/2024", method: "Transferencia" },
    { id: '6', name: "Carlos López", amount: "$1,200.00", date: "03/02/2024", method: "Tarjeta" },
    { id: '7', name: "María Rodríguez", amount: "$800.00", date: "01/02/2024", method: "Efectivo" },
    { id: '8', name: "Juan Pérez", amount: "$800.00", date: "30/01/2024", method: "Transferencia" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide">Panel Financiero</h1>
            <p className="mt-1 text-sm text-gray-500">Resumen de ingresos y estado de pagos</p>
        </div>
        
        {/* Pending Reconciliation Alert */}
        {stats.reconciliationPending > 0 && (
             <div className="mt-4 sm:mt-0 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-amber-800 shadow-sm animate-pulse">
                <MdWarning className="text-xl mr-3" />
                <div>
                    <span className="font-bold text-lg">{stats.reconciliationPending}</span>
                    <span className="ml-1 text-sm font-medium">Pagos por conciliar</span>
                </div>
                <Link to="/dashboard/payments/pending" className="ml-4 text-xs font-bold underline hover:text-amber-900">Ver</Link>
            </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Ingresos del Mes"
          value={stats.monthlyIncome}
          icon={MdAttachMoney}
          color="bg-emerald-500"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Pagos Pendientes"
          value={stats.pendingAmount}
          icon={MdMoneyOff}
          color="bg-amber-500"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Pagos Exitosos"
          value={stats.successfulPayments}
          icon={MdCheckCircle}
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50">
                <div className="flex items-center">
                    <FaFileInvoiceDollar className="text-red-500 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900 font-bebas tracking-wide">Pendientes de Pago</h3>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alumno</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{user.amount}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Vencido' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {user.dueDate}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Solvent Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-green-50">
                <div className="flex items-center">
                    <MdCheckCircle className="text-green-500 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900 font-bebas tracking-wide">Usuarios Solventes</h3>
                </div>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alumno</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                         {solventUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{user.amount}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{user.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}
