import { useState, useEffect } from "react";
import type { Route } from "./+types/payments";
import { Link, useSearchParams } from "react-router";
import { StatCard } from "../../components/molecules/StatCard";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";
import { Button } from "~/components/atoms/Button";
import { DateSelector } from "~/components/atoms/DateSelector";
import { Modal } from "~/components/molecules/Modal";
import { MdAttachMoney, MdMoneyOff, MdCheckCircle, MdWarning, MdFilterList, MdSearch, MdDateRange, MdPerson, MdAccountBalance, MdDescription } from "react-icons/md";
import { FaFileInvoiceDollar, FaExchangeAlt, FaMoneyBillWave, FaCreditCard, FaUniversity, FaFileExcel, FaPrint } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Finanzas - Minarai" }];
}

interface Payment {
    id: string;
    reference: string;
    user: string;
    date: string; // ISO format for simpler sorting/filtering if needed, or just string for now
    type: 'Transferencia' | 'Efectivo' | 'T. Debito' | 'Zelle' | 'Pago Movil';
    account: 'Banco Mercantil' | 'Caja Chica' | 'Banco Venezuela' | 'Banesco';
    amount: string;
    reconciled: boolean;
}

export default function Payments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPaymentId = searchParams.get("paymentId");

  // Mock Data
  const stats = {
    monthlyIncome: "$45,200.00",
    pendingAmount: "$12,500.00",
    successfulPayments: 145,
    reconciliationPending: 8,
  };

  const [allPayments, setAllPayments] = useState<Payment[]>([
      { id: '1', reference: 'REF-123456', user: 'Ana García', date: '2024-02-04', type: 'Transferencia', account: 'Banco Mercantil', amount: '$800.00', reconciled: true },
      { id: '2', reference: 'EFECT-001', user: 'María Rodríguez', date: '2024-02-01', type: 'Efectivo', account: 'Caja Chica', amount: '$800.00', reconciled: true },
      { id: '3', reference: 'REF-987654', user: 'Carlos López', date: '2024-02-03', type: 'T. Debito', account: 'Banco Venezuela', amount: '$1,200.00', reconciled: false },
      { id: '4', reference: 'REF-456789', user: 'Juan Pérez', date: '2024-01-30', type: 'Pago Movil', account: 'Banesco', amount: '$800.00', reconciled: true },
      { id: '5', reference: 'ZELLE-789', user: 'Luis Hernández', date: '2024-02-05', type: 'Zelle', account: 'Banco Mercantil', amount: '$800.00', reconciled: false },
      { id: '6', reference: 'REF-112233', user: 'Carmen Díaz', date: '2024-02-02', type: 'Transferencia', account: 'Banco Mercantil', amount: '$1,200.00', reconciled: true },
       { id: '7', reference: 'REF-334455', user: 'Pedro Pablo', date: '2024-02-06', type: 'Pago Movil', account: 'Banco Venezuela', amount: '$50.00', reconciled: false },
  ]);

  const [filters, setFilters] = useState({
      reference: "",
      type: "",
      account: "",
      date: null as Date | null,
      user: "",
      reconciled: "" // "yes", "no", or "" for all
  });

  const selectedPayment = allPayments.find(p => p.id === selectedPaymentId);

  const handleFilterChange = (key: string, value: any) => {
      setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCloseModal = () => {
    setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("paymentId");
        return newParams;
    });
  };

  const handleUpdateStatus = (status: 'approved' | 'rejected') => {
      if (!selectedPayment) return;
      
      // Update mock data
      setAllPayments(prev => prev.map(p => {
          if (p.id === selectedPayment.id) {
              return { ...p, reconciled: status === 'approved' };
          }
          return p;
      }));
      
      // Close modal
      handleCloseModal();
  };

  const filteredPayments = allPayments.filter(payment => {
      const matchRef = payment.reference.toLowerCase().includes(filters.reference.toLowerCase());
      const matchType = filters.type ? payment.type === filters.type : true;
      const matchAccount = filters.account ? payment.account === filters.account : true;
      // Simple date match (exact day) - could be range in future
      const matchDate = filters.date ? payment.date === filters.date.toISOString().split('T')[0] : true; 
      const matchUser = payment.user.toLowerCase().includes(filters.user.toLowerCase());
      const matchReconciled = filters.reconciled === "yes" ? payment.reconciled : filters.reconciled === "no" ? !payment.reconciled : true;

      return matchRef && matchType && matchAccount && matchDate && matchUser && matchReconciled;
  });

  return (
    <div className="space-y-6 animate-fade-in font-raleway">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide">Panel Financiero</h1>
            <p className="mt-1 text-sm text-gray-500">Gestión centralizada de ingresos y pagos</p>
        </div>
        
        {/* Pending Reconciliation Alert */}
        {stats.reconciliationPending > 0 && (
             <div className="mt-4 sm:mt-0 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center text-amber-800 shadow-sm animate-pulse">
                <MdWarning className="text-xl mr-3" />
                <div>
                    <span className="font-bold text-lg">{stats.reconciliationPending}</span>
                    <span className="ml-1 text-sm font-medium">Pagos por conciliar</span>
                </div>
                {/* Could link to a specific filtered view */}
                <button 
                    onClick={() => setFilters(prev => ({ ...prev, reconciled: "no" }))}
                    className="ml-4 text-xs font-bold underline hover:text-amber-900"
                >
                    Ver
                </button>
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

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4 text-gray-800">
              <MdFilterList className="mr-2 text-xl text-golden-rod-500" />
              <h3 className="font-bold font-bebas text-lg">Filtros de Búsqueda</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <Input 
                placeholder="Referencia..." 
                value={filters.reference} 
                onChange={(e) => handleFilterChange('reference', e.target.value)}
                className="text-sm"
              />
               <Input 
                placeholder="Usuario..." 
                value={filters.user} 
                onChange={(e) => handleFilterChange('user', e.target.value)}
                className="text-sm"
              />
              <Select 
                options={[
                    { value: '', label: 'Todos los Tipos' },
                    { value: 'Transferencia', label: 'Transferencia' },
                    { value: 'Efectivo', label: 'Efectivo' },
                    { value: 'T. Debito', label: 'T. Débito' },
                    { value: 'Pago Movil', label: 'Pago Móvil' },
                    { value: 'Zelle', label: 'Zelle' },
                ]}
                value={filters.type}
                onChange={(val) => handleFilterChange('type', val)}
                className="text-sm"
              />
               <Select 
                options={[
                    { value: '', label: 'Todas las Cuentas' },
                    { value: 'Banco Mercantil', label: 'Banco Mercantil' },
                    { value: 'Banco Venezuela', label: 'Banco Venezuela' },
                    { value: 'Banesco', label: 'Banesco' },
                    { value: 'Caja Chica', label: 'Caja Chica' },
                ]}
                value={filters.account}
                onChange={(val) => handleFilterChange('account', val)}
                className="text-sm"
              />
              <DateSelector 
                selected={filters.date}
                onChange={(date) => handleFilterChange('date', date)}
                placeholder="Fecha"
                className="text-sm"
              />
               <Select 
                options={[
                    { value: '', label: 'Estado: Todos' },
                    { value: 'yes', label: 'Conciliado' },
                    { value: 'no', label: 'No Conciliado' },
                ]}
                value={filters.reconciled}
                onChange={(val) => handleFilterChange('reconciled', val)}
                className="text-sm"
              />
          </div>
           <div className="mt-4 flex justify-end gap-2">
                 <Button 
                    size="sm" 
                    variant="secondary" 
                    outlined 
                    onClick={() => setFilters({ reference: "", type: "", account: "", date: null, user: "", reconciled: "" })}
                >
                    Limpiar Filtros
                </Button>
                 <Button 
                    size="sm" 
                    variant="success" 
                    icon={<FaFileExcel />}
                    onClick={() => console.log("Exporting...")}
                >
                    Exportar Excel
                </Button>
            </div>
      </div>

      {/* Main Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Referencia</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Usuario</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Cuenta</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Estado</th>
                             <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider font-bebas">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                                        {payment.reference}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {payment.user}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            {payment.type === 'Efectivo' && <FaMoneyBillWave className="text-green-600" />} 
                                            {payment.type === 'Transferencia' && <FaExchangeAlt className="text-blue-600" />}
                                            {payment.type === 'T. Debito' && <FaCreditCard className="text-purple-600" />}
                                            {(payment.type === 'Zelle' || payment.type === 'Pago Movil') && <FaUniversity className="text-gray-600" />}
                                            {payment.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.account}
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        {payment.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.reconciled ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                            {payment.reconciled ? 'Conciliado' : 'Pendiente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="text-golden-rod-600 hover:text-golden-rod-900"
                                            onClick={() => setSearchParams({ paymentId: payment.id })}
                                        >
                                            Ver
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <MdSearch className="text-4xl text-gray-300 mb-2" />
                                        <p>No se encontraron pagos con los filtros seleccionados.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
      </div>
      
      {/* Payment Detail Modal */}
      <Modal isOpen={!!selectedPayment} onClose={handleCloseModal} title="Detalle del Pago">
            {selectedPayment && (
                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
                        <div className="flex items-center text-gray-600">
                             <MdDescription className="mr-2 text-xl" />
                             <span className="font-medium">Referencia</span>
                        </div>
                        <span className="font-bold text-lg font-mono text-gray-900">{selectedPayment.reference}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-gray-100 rounded-lg">
                            <span className="text-xs text-gray-500 flex items-center mb-1"><MdPerson className="mr-1"/> Usuario</span>
                            <span className="font-semibold text-gray-800 block truncate">{selectedPayment.user}</span>
                        </div>
                         <div className="p-3 border border-gray-100 rounded-lg">
                            <span className="text-xs text-gray-500 flex items-center mb-1"><MdDateRange className="mr-1"/> Fecha</span>
                            <span className="font-semibold text-gray-800 block">{selectedPayment.date}</span>
                        </div>
                         <div className="p-3 border border-gray-100 rounded-lg">
                            <span className="text-xs text-gray-500 flex items-center mb-1"><FaExchangeAlt className="mr-1"/> Tipo</span>
                            <span className="font-semibold text-gray-800 block">{selectedPayment.type}</span>
                        </div>
                         <div className="p-3 border border-gray-100 rounded-lg">
                            <span className="text-xs text-gray-500 flex items-center mb-1"><MdAccountBalance className="mr-1"/> Cuenta</span>
                            <span className="font-semibold text-gray-800 block truncate">{selectedPayment.account}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 bg-golden-rod-50 rounded-xl border border-golden-rod-100 border-dashed">
                        <span className="text-sm text-golden-rod-700 uppercase font-bold tracking-wider mb-1">Monto Total</span>
                        <span className="text-4xl font-extrabold text-golden-rod-600 font-bebas tracking-wide">{selectedPayment.amount}</span>
                    </div>

                    <div className="flex justify-center">
                         <Button 
                            size="sm" 
                            variant="secondary" 
                            outlined
                            icon={<FaPrint />}
                            onClick={() => console.log("Printing receipt...")}
                         >
                             Imprimir Recibo
                         </Button>
                    </div>

                    <div className="space-y-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">Acciones de Conciliación</label>
                         <div className="grid grid-cols-2 gap-3">
                             <Button 
                                variant={selectedPayment.reconciled ? "secondary" : "danger"} 
                                outlined={!selectedPayment.reconciled}
                                onClick={() => handleUpdateStatus('rejected')}
                                className="w-full justify-center"
                                disabled={!selectedPayment.reconciled} // Can only reject if currently approved, simplified logic for now
                             >
                                 Rechazar Pago
                             </Button>
                             <Button 
                                variant={selectedPayment.reconciled ? "secondary" : "success"}
                                className="w-full justify-center"
                                onClick={() => handleUpdateStatus('approved')}
                                disabled={selectedPayment.reconciled} // Disable if already reconciled
                             >
                                 Conciliar Pago
                             </Button>
                         </div>
                         <p className="text-xs text-center text-gray-400 mt-2">
                             Estado actual: <span className={`font-bold ${selectedPayment.reconciled ? 'text-green-600' : 'text-amber-500'}`}>
                                 {selectedPayment.reconciled ? 'CONCILIADO' : 'PENDIENTE'}
                             </span>
                         </p>
                    </div>
                </div>
            )}
      </Modal>
    </div>
  );
}
