import type { Route } from "./+types/user-list";
import { useState } from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaSearch, FaFilter, FaFileInvoiceDollar } from "react-icons/fa";
import { useSearchParams } from "react-router";
import { Select } from "../../../components/atoms/Select";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Mis Pagos - Minarai" }];
}

interface Payment {
    id: string;
    concept: string;
    amount: string;
    date: string;
    status: "paid" | "pending" | "overdue";
    reference?: string;
}

export default function UserPayments() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilter = searchParams.get("filter") || "all";
    const [filterStatus, setFilterStatus] = useState<string>(initialFilter);
    const [searchTerm, setSearchTerm] = useState("");

    // Mock Data
    const payments: Payment[] = [
        { id: '1', concept: "Mensualidad Febrero - Luis Hernández", amount: "$800.00", date: "05/02/2024", status: "pending" },
        { id: '2', concept: "Inscripción - Luis Hernández", amount: "$1,500.00", date: "15/01/2024", status: "paid", reference: "REF-998877" },
        { id: '3', concept: "Mensualidad Enero - Luis Hernández", amount: "$800.00", date: "05/01/2024", status: "paid", reference: "REF-112233" },
        { id: '4', concept: "Mensualidad Febrero - Sofía Hernández", amount: "$800.00", date: "05/02/2024", status: "pending" },
    ];

    const pendingCount = payments.filter(p => p.status === "pending").length;

    const filteredPayments = payments.filter(payment => {
        const matchesStatus = filterStatus === "all" || 
                             (filterStatus === "pending" && payment.status === "pending") ||
                             (filterStatus === "paid" && payment.status === "paid");
        const matchesSearch = payment.concept.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide">Mis Pagos</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pagos Pendientes</p>
                        <p className="text-3xl font-bold text-gray-900 font-raleway mt-1">{pendingCount}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <FaMoneyBillWave className="text-xl" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Próximo Pago</p>
                        <p className="text-3xl font-bold text-gray-900 font-raleway mt-1">01 - 05 Mar</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FaCalendarAlt className="text-xl" />
                    </div>
                </div>
            </div>

            {/* Filters and List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 sm:flex sm:items-center sm:justify-between bg-gray-50">
                    <div className="relative flex-1 max-w-lg">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-golden-rod-500 focus:border-golden-rod-500 sm:text-sm font-raleway transition duration-150 ease-in-out"
                            placeholder="Buscar por concepto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center min-w-[200px]">
                        <FaFilter className="text-gray-400 mr-2" />
                        <Select
                            options={[
                                { value: "all", label: "Todos los pagos" },
                                { value: "pending", label: "Pendientes" },
                                { value: "paid", label: "Realizados" }
                            ]}
                            value={filterStatus}
                            onChange={(value) => {
                                setFilterStatus(value);
                                setSearchParams(prev => {
                                    const newParams = new URLSearchParams(prev);
                                    newParams.set("filter", value);
                                    return newParams;
                                });
                            }}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-raleway">Concepto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-raleway">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-raleway">Monto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-raleway">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-raleway">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-raleway">{payment.concept}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-raleway">{payment.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 font-raleway">{payment.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                payment.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                                payment.status === 'pending' ? 'bg-red-100 text-red-800' : 
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {payment.status === 'paid' ? 'Pagado' : payment.status === 'pending' ? 'Pendiente' : 'Atrasado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {payment.status === 'paid' ? (
                                                <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end w-full">
                                                    <FaFileInvoiceDollar className="mr-1" /> Recibo
                                                </button>
                                            ) : (
                                                <button className="text-golden-rod-600 hover:text-golden-rod-800 font-bold">
                                                    Pagar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-raleway">
                                        No se encontraron pagos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
