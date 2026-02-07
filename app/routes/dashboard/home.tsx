import { useAuthStore } from "../../store/useAuthStore";
import { FaUser, FaCalendarAlt, FaCheckCircle, FaExclamationCircle, FaUserGraduate, FaMedal } from "react-icons/fa";
import { Link } from "react-router";
import { useState } from "react";
import { StatusModal } from "../../components/molecules/StatusModal";

export default function DashboardHome() {
  const { user } = useAuthStore();
  const [showEnrollmentWarning, setShowEnrollmentWarning] = useState(false);

  // Mock Data
  const userInfo = {
    ...user,
    joinDate: "15/01/2023",
    isSolvent: false, // Change to true to test solvent state
    pendingInvoices: 2,
    nextPaymentDate: "1 al 5 de cada mes",
  };

  const students = [
    { 
        id: 1, 
        name: "Luis Hernández", 
        rank: "Cinturón Amarillo", 
        joinDate: "01/02/2024", 
        image: "https://ui-avatars.com/api/?name=Luis+Hernandez&background=FFD700&color=000" 
    },
    { 
        id: 2, 
        name: "Sofía Hernández", 
        rank: "Cinturón Blanco", 
        joinDate: "15/03/2024", 
        image: "https://ui-avatars.com/api/?name=Sofia+Hernandez&background=f3f4f6&color=000" 
    },
  ];

  return (
    <div className="space-y-8">
      {/* User Info Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-black-beauty-900 px-6 py-4 border-b border-golden-rod-500">
            <h2 className="text-xl font-bold text-white font-bebas tracking-wide flex items-center">
                <FaUser className="mr-2 text-golden-rod-500" />
                Información del Representante / Usuario
            </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Nombre Completo</span>
                <span className="text-lg font-bold text-gray-900 font-raleway">{userInfo.name || "Usuario"}</span>
                <span className="text-sm text-gray-500">{userInfo.email}</span>
            </div>
             <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Fecha de Ingreso</span>
                <div className="flex items-center mt-1">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-900 font-medium">{userInfo.joinDate}</span>
                </div>
            </div>
             <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Próximo Pago</span>
                <span className="text-gray-900 font-medium mt-1">{userInfo.nextPaymentDate}</span>
            </div>
             <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Estado de Cuenta</span>
                {userInfo.isSolvent ? (
                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                        <FaCheckCircle className="mr-2" />
                        <span className="font-bold text-sm">Solvente</span>
                    </div>
                ) : (
                    <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full w-fit animate-pulse">
                        <FaExclamationCircle className="mr-2" />
                        <span className="font-bold text-sm">Pendiente de Pago</span>
                    </div>
                )}
            </div>
        </div>
        
        {/* Payment Alert */}
        {!userInfo.isSolvent && userInfo.pendingInvoices > 0 && (
            <div className="bg-red-50 px-6 py-3 border-t border-red-100 flex items-center justify-between">
                <div className="flex items-center text-red-700">
                    <FaExclamationCircle className="mr-2 text-xl" />
                    <span className="font-medium">Tienes {userInfo.pendingInvoices} factura(s) pendiente(s) por pagar.</span>
                </div>
                <Link to="/dashboard/my-payments?filter=pending" className="text-sm font-bold text-red-700 hover:text-red-900 underline">
                    Ver Pendientes
                </Link>
            </div>
        )}
      </div>

      {/* Student Cards Section */}
      <div>
        <h2 className="text-2xl font-bold text-black-beauty-800 mb-4 font-bebas tracking-wide flex items-center">
            <FaUserGraduate className="mr-2" />
            Mis Alumnos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
                <div key={student.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <img 
                                src={student.image} 
                                alt={student.name} 
                                className="h-16 w-16 rounded-full border-2 border-golden-rod-500 object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-lg font-bold text-gray-900 truncate font-raleway group-hover:text-golden-rod-600 transition-colors">
                                {student.name}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                                <FaMedal className="mr-1 text-golden-rod-500" />
                                <span>{student.rank}</span>
                            </div>
                             <div className="flex items-center mt-1 text-xs text-gray-400">
                                <FaCalendarAlt className="mr-1" />
                                <span>Ingreso: {student.joinDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end">
                        <Link to={`/dashboard/students/${student.id}`} className="text-sm font-medium text-golden-rod-600 hover:text-golden-rod-800 transition-colors">
                            Ver Perfil &rarr;
                        </Link>
                    </div>
                </div>
            ))}
            
            {/* Add Student CTA */}
            <div 
                className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-gray-400 hover:border-golden-rod-400 hover:text-golden-rod-500 hover:bg-white transition-all duration-300 cursor-pointer group h-full min-h-[160px]"
                onClick={() => setShowEnrollmentWarning(true)}
            >
                <div className="h-12 w-12 rounded-full bg-gray-200 group-hover:bg-golden-rod-100 flex items-center justify-center mb-2 transition-colors">
                    <span className="text-2xl font-bold">+</span>
                </div>
                <span className="font-medium">Inscribir Nuevo Alumno</span>
            </div>
        </div>
      </div>

      <StatusModal
        isOpen={showEnrollmentWarning}
        onClose={() => setShowEnrollmentWarning(false)}
        type="warning"
        title="Inscripción Presencial"
        message="La inscripción de nuevos alumnos debe realizarse directamente en la secretaría del dojo."
      />
    </div>
  );
}
