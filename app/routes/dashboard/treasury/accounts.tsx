import { useState } from "react";
import type { Route } from "./+types/accounts";
import { FaPlus, FaMoneyBillWave, FaUniversity, FaBan, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import { MdAccountBalance, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { Button } from "~/components/atoms/Button";
import { Modal } from "~/components/molecules/Modal";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";

// Interface for Treasury Account
interface TreasuryAccount {
  id: number;
  name: string;
  bank: string;
  accountNumber: string;
  currency: 'USD' | 'MXN' | 'EUR' | 'BS';
  balance: number;
  type: 'Corriente' | 'Ahorros';
  status: 'active' | 'inactive';
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cuentas de Tesorería - Minarai" }];
}

export default function Accounts() {
  // Mock Data
  const [accounts, setAccounts] = useState<TreasuryAccount[]>([
    { id: 1, name: "Cuenta Corriente Principal", bank: "Banco Mercantil", accountNumber: "0105-****-****-1234", currency: "BS", balance: 54200.50, type: "Corriente", status: "active" },
    { id: 2, name: "Cuenta Nómina / Operativa", bank: "Banesco", accountNumber: "0134-****-****-5678", currency: "BS", balance: 15000.00, type: "Corriente", status: "active" },
    { id: 3, name: "Custodia Zelle", bank: "Bank of America", accountNumber: "**** 9012", currency: "USD", balance: 3500.00, type: "Corriente", status: "active" },
    { id: 4, name: "Caja Fuerte (Efectivo)", bank: "N/A", accountNumber: "N/A", currency: "USD", balance: 420.00, type: "Corriente", status: "active" },
    { id: 5, name: "Cuenta Recaudadora", bank: "Banco de Venezuela", accountNumber: "0102-****-****-3456", currency: "BS", balance: 120.00, type: "Corriente", status: "inactive" },
  ]);

  // Mock Stats
  const activeAccountsCount = accounts.filter(a => a.status === 'active').length;
  const inactiveAccountsCount = accounts.filter(a => a.status === 'inactive').length;
  const totalPaymentsThisMonth = 145;
  const totalAmountThisMonth = 45200.00; // MXN

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
      name: "",
      bank: "",
      accountNumber: "",
      currency: "MXN",
      type: "Corriente",
      initialBalance: 0
  });

  const handleSave = () => {
      // Mock save
      const newAccount: TreasuryAccount = {
          id: accounts.length + 1,
          name: formData.name,
          bank: formData.bank,
          accountNumber: formData.accountNumber,
          currency: formData.currency as 'USD' | 'MXN' | 'EUR',
          balance: Number(formData.initialBalance),
          type: formData.type as 'Corriente' | 'Ahorros',
          status: 'active'
      };
      setAccounts([...accounts, newAccount]);
      setIsModalOpen(false);
      setFormData({ name: "", bank: "", accountNumber: "", currency: "MXN", type: "Corriente", initialBalance: 0 });
      alert("Cuenta agregada correctamente (Mock)");
  };

  return (
    <div className="space-y-6 animate-fade-in font-raleway h-full flex flex-col pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Cuentas de Tesorería</h1>
           <p className="text-gray-500 text-sm">Gestiona las cuentas bancarias y flujos de efectivo.</p>
        </div>
        <Button variant="primary" icon={<FaPlus />} onClick={() => setIsModalOpen(true)}>
            Agregar Cuenta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Accounts */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-golden-rod-200 transition-colors">
              <div>
                  <p className="text-sm font-medium text-gray-500">Cuentas Activas</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{activeAccountsCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaCheckCircle />
              </div>
          </div>

          {/* Inactive Accounts */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-golden-rod-200 transition-colors">
              <div>
                  <p className="text-sm font-medium text-gray-500">Cuentas Inactivas</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{inactiveAccountsCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaBan />
              </div>
          </div>

          {/* Payments Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-golden-rod-200 transition-colors">
              <div>
                  <p className="text-sm font-medium text-gray-500">Pagos del Mes</p>
                  <div className="flex items-baseline gap-2 mt-1">
                       <p className="text-2xl font-bold text-gray-900">${totalAmountThisMonth.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                       <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{totalPaymentsThisMonth} transacciones</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaExchangeAlt />
              </div>
          </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 font-bebas tracking-wide flex items-center gap-2">
                <FaUniversity className="text-golden-rod-500" />
                Listado de Cuentas
            </h3>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alias / Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Cuenta</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {accounts.map((account) => (
                        <tr key={account.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded bg-golden-rod-100 text-golden-rod-600 flex items-center justify-center mr-3">
                                        <MdAccountBalance />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{account.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{account.bank}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{account.accountNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{account.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <span className={`text-sm font-bold ${account.currency === 'USD' ? 'text-green-600' : 'text-gray-900'}`}>
                                    {account.currency === 'USD' ? 'US$' : '$'} {account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    <span className="text-xs text-gray-400 font-normal ml-1">{account.currency}</span>
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {account.status === 'active' ? 'Activa' : 'Inactiva'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Add Account Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nueva Cuenta">
          <div className="space-y-4">
              <Input 
                  label="Nombre o Alias de la Cuenta" 
                  placeholder="Ej: Cuenta Operativa BBVA"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  icon={<MdAccountBalance className="text-gray-400" />}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                      label="Banco Institución" 
                      placeholder="Ej: BBVA"
                      value={formData.bank}
                      onChange={(e) => setFormData({...formData, bank: e.target.value})}
                      icon={<FaUniversity className="text-gray-400" />}
                  />
                   <Input 
                      label="Número de Cuenta / CLABE" 
                      placeholder="**** **** **** 1234"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Moneda</label>
                      <Select 
                          options={[
                              { value: 'USD', label: 'Dólar Americano (USD)' },
                              { value: 'EUR', label: 'Euro (EUR)' },
                              { value: 'BS', label: 'Bolívar Soberano (BS)' },
                          ]}
                          value={formData.currency}
                          onChange={(val) => setFormData({...formData, currency: val})}
                      />
                  </div>
                   <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Tipo de Cuenta</label>
                      <Select 
                          options={[
                              { value: 'Corriente', label: 'Corriente / Cheques' },
                              { value: 'Ahorros', label: 'Ahorros / Inversión' },
                          ]}
                          value={formData.type}
                          onChange={(val) => setFormData({...formData, type: val})}
                      />
                  </div>
              </div>
              <Input 
                  label="Saldo Inicial" 
                  type="number"
                  placeholder="0.00"
                  value={formData.initialBalance}
                  onChange={(e) => setFormData({...formData, initialBalance: e.target.value})}
                  icon={<FaMoneyBillWave className="text-gray-400" />}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                  <Button variant="primary" onClick={handleSave}>Guardar Cuenta</Button>
              </div>
          </div>
      </Modal>

    </div>
  );
}
