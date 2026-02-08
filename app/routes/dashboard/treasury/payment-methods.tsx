import { useState } from "react";
import type { Route } from "./+types/payment-methods";
import { FaPlus, FaCreditCard, FaCheckCircle, FaBan, FaUniversity, FaEdit, FaTrash } from "react-icons/fa";
import { MdPayment, MdAccountBalance } from "react-icons/md";
import { Button } from "~/components/atoms/Button";
import { Modal } from "~/components/molecules/Modal";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";

// Interface for Payment Method
interface PaymentMethod {
  id: number;
  name: string;
  treasuryAccountId: number | null;
  paymentInstructions: string;
  isActive: boolean;
}

// Mock Treasury Accounts (In a real app, fetch this from API/Context)
const mockTreasuryAccounts = [
    { id: 1, name: "Cuenta Corriente Principal", bank: "Banco Mercantil", currency: "BS" },
    { id: 2, name: "Cuenta Nómina / Operativa", bank: "Banesco", currency: "BS" },
    { id: 3, name: "Cuenta Recaudadora", bank: "Banco de Venezuela", currency: "BS" },
    { id: 4, name: "Custodia Zelle", bank: "Bank of America", currency: "USD" },
    { id: 5, name: "Caja Fuerte (Efectivo)", bank: "N/A", currency: "USD" },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Métodos de Pago - Minarai" }];
}

export default function PaymentMethods() {
  // Mock Data
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: 1, name: "Pago Móvil", treasuryAccountId: 1, paymentInstructions: "Pago Móvil Mercantil (0105). Teléfono: 0414-1234567. RIF: J-12345678-9. Enviar captura.", isActive: true },
    { id: 2, name: "Transferencia Banesco", treasuryAccountId: 2, paymentInstructions: "Transferir a cta corriente: 0134-1234-56-1234567890. Titular: Minarai C.A. RIF: J-12345678-9.", isActive: true },
    { id: 3, name: "Zelle", treasuryAccountId: 4, paymentInstructions: "Enviar Zelle a: pagos@minarai.com. Titular: Juan Pérez. Indicar nombre del alumno en la nota.", isActive: true },
    { id: 4, name: "Efectivo Divisas ($)", treasuryAccountId: 5, paymentInstructions: "Entregar en la administración del Dojo. Se agradece billetes en buen estado y monto exacto.", isActive: true },
    { id: 5, name: "Binance Pay", treasuryAccountId: null, paymentInstructions: "Enviar Pay ID: 123456789. Enviar comprobante.", isActive: false },
  ]);

  // Mock Stats
  const activeMethodsCount = methods.filter(m => m.isActive).length;
  const linkedMethodsCount = methods.filter(m => m.treasuryAccountId !== null).length;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
      name: "",
      treasuryAccountId: "",
      paymentInstructions: "",
      isActive: "active"
  });

  const handleOpenModal = (method?: PaymentMethod) => {
      if (method) {
          setEditingMethod(method);
          setFormData({
              name: method.name,
              treasuryAccountId: method.treasuryAccountId ? method.treasuryAccountId.toString() : "",
              paymentInstructions: method.paymentInstructions,
              isActive: method.isActive ? "active" : "inactive"
          });
      } else {
          setEditingMethod(null);
          setFormData({ name: "", treasuryAccountId: "", paymentInstructions: "", isActive: "active" });
      }
      setIsModalOpen(true);
  };

  const handleSave = () => {
      const newMethod: PaymentMethod = {
          id: editingMethod ? editingMethod.id : methods.length + 1,
          name: formData.name,
          treasuryAccountId: formData.treasuryAccountId ? Number(formData.treasuryAccountId) : null,
          paymentInstructions: formData.paymentInstructions,
          isActive: formData.isActive === 'active'
      };

      if (editingMethod) {
          setMethods(prev => prev.map(m => m.id === editingMethod.id ? newMethod : m));
      } else {
          setMethods(prev => [...prev, newMethod]);
      }
      setIsModalOpen(false);
      alert("Método de pago guardado (Mock)");
  };

  const handleDelete = (id: number) => {
      if(confirm("¿Estás seguro de eliminar este método de pago?")) {
          setMethods(prev => prev.filter(m => m.id !== id));
      }
  };

  const getAccountName = (id: number | null) => {
      if (!id) return "No asociada / Ninguna";
      const acc = mockTreasuryAccounts.find(a => a.id === id);
      return acc ? `${acc.bank} - ${acc.name}` : "Desconocida";
  };

  return (
    <div className="space-y-6 animate-fade-in font-raleway h-full flex flex-col pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Métodos de Pago</h1>
           <p className="text-gray-500 text-sm">Configura las opciones de pago disponibles para los usuarios.</p>
        </div>
        <Button variant="primary" icon={<FaPlus />} onClick={() => handleOpenModal()}>
            Agregar Método
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Methods */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-golden-rod-200 transition-colors">
              <div>
                  <p className="text-sm font-medium text-gray-500">Métodos Activos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{activeMethodsCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaCheckCircle />
              </div>
          </div>

          {/* Linked Methods */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-golden-rod-200 transition-colors">
              <div>
                  <p className="text-sm font-medium text-gray-500">Vinculados a Tesorería</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{linkedMethodsCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <FaUniversity />
              </div>
          </div>
      </div>

      {/* Methods Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 font-bebas tracking-wide flex items-center gap-2">
                <MdPayment className="text-golden-rod-500" />
                Listado de Métodos
            </h3>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta Asociada</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrucciones (Vista Previa)</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {methods.map((method) => (
                        <tr key={method.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded bg-golden-rod-100 text-golden-rod-600 flex items-center justify-center mr-3">
                                        <FaCreditCard />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{method.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {method.treasuryAccountId ? (
                                    <span className="flex items-center gap-2">
                                        <FaUniversity className="text-gray-400" />
                                        {getAccountName(method.treasuryAccountId)}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 italic">No asociada</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={method.paymentInstructions}>
                                {method.paymentInstructions}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    method.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {method.isActive ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={() => handleOpenModal(method)}
                                    className="text-golden-rod-600 hover:text-golden-rod-900 mr-3"
                                    title="Editar"
                                >
                                    <FaEdit className="text-lg" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(method.id)}
                                    className="text-red-400 hover:text-red-700"
                                    title="Eliminar"
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMethod ? "Editar Método de Pago" : "Nuevo Método de Pago"}>
          <div className="space-y-4">
              <Input 
                  label="Nombre del Método" 
                  placeholder="Ej: Transferencia Bancaria"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  icon={<FaCreditCard className="text-gray-400" />}
              />
              
              <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Cuenta de Tesorería Asociada</label>
                  <Select 
                      options={[
                          { value: "", label: "Ninguna / No Aplica" },
                          ...mockTreasuryAccounts.map(acc => ({
                              value: acc.id.toString(),
                              label: `${acc.bank} - ${acc.name} (${acc.currency})`
                          }))
                      ]}
                      value={formData.treasuryAccountId}
                      onChange={(val) => setFormData({...formData, treasuryAccountId: val})}
                  />
                  <p className="text-xs text-gray-500">Si se selecciona, los pagos con este método se vincularán a esta cuenta.</p>
              </div>

              <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Instrucciones para el Usuario</label>
                  <textarea 
                      className="block w-full rounded-md border border-black-beauty-200 px-3 py-2 shadow-sm font-raleway focus:border-golden-rod-500 focus:outline-none focus:ring-golden-rod-500 sm:text-sm min-h-[100px]"
                      placeholder="Ej: Realizar transferencia a la cuenta CLABE..."
                      value={formData.paymentInstructions}
                      onChange={(e) => setFormData({...formData, paymentInstructions: e.target.value})}
                  />
              </div>

               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <Select 
                      options={[
                          { value: 'active', label: 'Activo' },
                          { value: 'inactive', label: 'Inactivo' },
                      ]}
                      value={formData.isActive}
                      onChange={(val) => setFormData({...formData, isActive: val})}
                  />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                  <Button variant="primary" onClick={handleSave}>Guardar Método</Button>
              </div>
          </div>
      </Modal>

    </div>
  );
}
