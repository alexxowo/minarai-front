
import type { Route } from "./+types/pending";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaFileInvoiceDollar, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Modal } from "@/components/molecules/Modal";
import { useUrlModal } from "@/hooks/useUrlModal";
import { Select } from "@/components/atoms/Select";
import { TextArea } from "@/components/atoms/TextArea";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pagos por Conciliar - Minarai" }];
}

interface Payment {
    id: string;
    student: string;
    amount: string;
    date: string;
    method: string;
    reference: string;
    evidenceUrl?: string;
}

export default function PendingPayments() {
  const { isOpen, paramValue, openModal, closeModal } = useUrlModal("paymentId");
  const [comment, setComment] = useState("");
  const [action, setAction] = useState<"approve" | "reject" | "">("");
  const [selectedEvidenceUrl, setSelectedEvidenceUrl] = useState<string | null>(null);

  const pendingPayments: Payment[] = [
    { id: '1', student: "Luis Hernández", amount: "$800.00", date: "05/02/2024", method: "Transferencia", reference: "REF-12345", evidenceUrl: "https://placehold.co/600x400/png?text=Comprobante+Pago" },
    { id: '2', student: "Carmen Díaz", amount: "$1,200.00", date: "10/02/2024", method: "Depósito", reference: "DEP-98765" },
    { id: '3', student: "Roberto Silva", amount: "$800.00", date: "01/02/2024", method: "Transferencia", reference: "REF-55555", evidenceUrl: "https://placehold.co/400x600/png?text=Ficha+Deposito" },
    { id: '4', student: "Patricia Gómez", amount: "$800.00", date: "12/02/2024", method: "Transferencia", reference: "REF-11111" },
    { id: '5', student: "Jorge Ramirez", amount: "$1,500.00", date: "14/02/2024", method: "Depósito", reference: "DEP-22222" },
    { id: '6', student: "Lucia Fernandez", amount: "$800.00", date: "15/02/2024", method: "Transferencia", reference: "REF-33333" },
    { id: '7', student: "Mario Bros", amount: "$800.00", date: "15/02/2024", method: "Transferencia", reference: "REF-44444" },
    { id: '8', student: "Luigi Bros", amount: "$800.00", date: "15/02/2024", method: "Transferencia", reference: "REF-66666" },
  ];

  const selectedPayment = pendingPayments.find(p => p.id === paramValue) || null;
  const isModalOpen = isOpen && !!selectedPayment;

  // Reset form when modal opens via URL or ID changes
  useEffect(() => {
    if (isModalOpen) {
      setComment("");
      setAction("");
    }
  }, [paramValue, isModalOpen]);

  const handleOpenModal = (payment: Payment) => {
      openModal(payment.id);
  };

  const handleCloseModal = () => {
      closeModal();
  };

  const handleConfirm = () => {
    if (!action) return;
    
    if (action === "approve") {
        console.log(`Conciliating payment ${selectedPayment?.id} with comment: ${comment}`);
        alert("Pago conciliado exitosamente (Mock)");
    } else {
        console.log(`Rejecting payment ${selectedPayment?.id} with comment: ${comment}`);
        alert("Pago rechazado (Mock)");
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard/payments" className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <MdArrowBack className="text-xl" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide">Pagos por Conciliar</h1>
            <p className="mt-1 text-sm text-gray-500">Revisión y aprobación de pagos pendientes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alumno</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método / Ref</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidencia</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {pendingPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.student}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex flex-col">
                                    <span className="font-medium">{payment.method}</span>
                                    <span className="text-xs text-gray-400">{payment.reference}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                {payment.evidenceUrl ? (
                                    <button 
                                        onClick={() => setSelectedEvidenceUrl(payment.evidenceUrl!)}
                                        className="flex items-center hover:underline focus:outline-none"
                                    >
                                        <FaFileInvoiceDollar className="mr-1" /> Ver archivo
                                    </button>
                                ) : (
                                    <span className="text-gray-400 text-xs italic">No adjunto</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleOpenModal(payment)}
                                    className="text-golden-rod-600 hover:text-golden-rod-900 font-bold bg-golden-rod-50 px-3 py-1 rounded-md transition-colors"
                                >
                                    Gestionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPayment ? `Gestionar Pago - ${selectedPayment.student}` : undefined}
      >
        {selectedPayment && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Monto</p>
                        <p className="font-bold text-gray-900 text-lg">{selectedPayment.amount}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Fecha</p>
                        <p className="font-medium text-gray-900">{selectedPayment.date}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Método</p>
                        <p className="font-medium text-gray-900">{selectedPayment.method}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Referencia</p>
                        <p className="font-medium text-gray-900">{selectedPayment.reference}</p>
                    </div>
                </div>
                
                <div>
                    <Select
                        label="Acción"
                        value={action}
                        onChange={(val) => setAction(val as "approve" | "reject" | "")}
                        options={[
                            { label: "Validar Pago", value: "approve" },
                            { label: "Rechazar Pago", value: "reject" },
                        ]}
                        placeholder="Seleccione una acción..."
                    />
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comentarios / Observaciones</label>
                    <div className="mt-1">
                        <TextArea
                            id="comment"
                            name="comment"
                            rows={3}
                            className="shadow-sm focus:ring-golden-rod-500 focus:border-golden-rod-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                            placeholder={action === "reject" ? "Indique la razón del rechazo..." : "Comentarios opcionales..."}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></TextArea>
                    </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                        type="button"
                        disabled={!action}
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm ${
                            !action 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : action === "approve" 
                                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500" 
                                    : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        }`}
                        onClick={handleConfirm}
                    >
                            {action === "approve" ? "Conciliar" : action === "reject" ? "Rechazar" : "Confirmar"}
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        )}
      </Modal>
      {/* Evidence Modal */}
      <Modal
        isOpen={!!selectedEvidenceUrl}
        onClose={() => setSelectedEvidenceUrl(null)}
        title="Evidencia de Pago"
      >
        <div className="flex justify-center">
            {selectedEvidenceUrl ? (
                <img 
                    src={selectedEvidenceUrl} 
                    alt="Evidencia de pago" 
                    className="max-w-full max-h-[70vh] rounded-md shadow-md object-contain" 
                />
            ) : (
                <p className="text-gray-500">No hay evidencia disponible.</p>
            )}
        </div>
        <div className="mt-4 flex justify-end">
             <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                onClick={() => setSelectedEvidenceUrl(null)}
            >
                Cerrar
            </button>
        </div>
      </Modal>
    </div>
  );
}
