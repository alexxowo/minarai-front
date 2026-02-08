import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { FaUser, FaSave, FaKey, FaArrowLeft, FaPlus } from "react-icons/fa";
import { IoMdSchool, IoMdCash } from "react-icons/io";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";
import { Button } from "~/components/atoms/Button";

// Mock Data (Duplicated from index.tsx for now - in real app, fetch from API)
const mockUsers = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      role: "Padre/Tutor",
      status: "active",
      students: [
        { name: "Luis Hernández", rank: "7mo Kyu", image: "https://ui-avatars.com/api/?name=Luis+Hernandez&background=FFD700&color=000&size=64" },
        { name: "María Hernández", rank: "9no Kyu", image: "https://ui-avatars.com/api/?name=Maria+Hernandez&background=FFC0CB&color=000&size=64" }
      ]
    },
    {
      id: 2,
      name: "Ana Gómez",
      email: "ana.gomez@email.com",
      role: "Alumno Adulto",
      status: "active",
      students: [
        { name: "Ana Gómez", rank: "4to Kyu", image: "https://ui-avatars.com/api/?name=Ana+Gomez&background=0000FF&color=FFF&size=64" }
      ]
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos.r@email.com",
      role: "Padre/Tutor",
      status: "inactive",
      students: [
        { name: "Pedro Rodríguez", rank: "8vo Kyu", image: "https://ui-avatars.com/api/?name=Pedro+Rodriguez&background=FFA500&color=000&size=64" }
      ]
    },
     {
      id: 4,
      name: "Minarai Admin",
      email: "admin@minarai.com",
      role: "Administrador",
      status: "active",
      students: []
    }
];

const mockUserPayments = [
    { id: 101, date: '2024-02-01', amount: '$50.00', reference: 'REF-123', status: 'approved' },
    { id: 102, date: '2024-01-15', amount: '$50.00', reference: 'REF-456', status: 'approved' },
    { id: 103, date: '2023-12-20', amount: '$45.00', reference: 'REF-789', status: 'pending' },
];

export function meta({}: any) {
    return [{ title: "Perfil de Usuario - Minarai" }];
}

export default function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const user = mockUsers.find(u => u.id === Number(userId));

    const [activeTab, setActiveTab] = useState<'students' | 'payments'>('students');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            });
        }
    }, [user]);

    if (!user) {
        return <div className="p-8 text-center text-gray-500">Usuario no encontrado.</div>;
    }

    const handleSave = () => {
        alert("Usuario guardado (Mock)");
    };

    const handleResetPassword = () => {
        if(confirm("¿Estás seguro de reestablecer la contraseña? Se asignará una temporal.")) {
            alert("Contraseña reestablecida correctamente (Mock)");
        }
    };

    const handleAddStudent = () => {
        alert("Abrir modal/formulario para agregar nuevo alumno (Mock)");
    };

    return (
        <div className="space-y-6 animate-fade-in font-raleway h-full flex flex-col pb-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaArrowLeft />
                </button>
                <div>
                     <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Perfil de Usuario</h1>
                     <p className="text-gray-500 text-sm">Gestiona la información, alumnos y pagos de {user.name}.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: User Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-full bg-golden-rod-100 text-golden-rod-700 flex items-center justify-center font-bold text-3xl">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.role}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Input 
                                label="Nombre Completo" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                             <div className="space-y-2">
                                <Input 
                                    label="Correo Electrónico" 
                                    value={formData.email} 
                                    disabled
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <button 
                                    onClick={handleResetPassword}
                                    className="text-xs text-golden-rod-600 hover:text-golden-rod-700 font-bold hover:underline flex items-center gap-1"
                                >
                                    <FaKey className="text-xs" /> Reestablecer contraseña
                                </button>
                            </div>
                            <Select 
                                label="Rol"
                                options={[
                                    { value: 'Administrador', label: 'Administrador' },
                                    { value: 'Padre/Tutor', label: 'Padre/Tutor' },
                                    { value: 'Alumno Adulto', label: 'Alumno Adulto' },
                                ]}
                                value={formData.role} 
                                onChange={(val) => setFormData({...formData, role: val})}
                            />
                            <Select 
                                label="Estado"
                                options={[
                                    { value: 'active', label: 'Activo' },
                                    { value: 'inactive', label: 'Inactivo' },
                                ]}
                                value={formData.status} 
                                onChange={(val) => setFormData({...formData, status: val})}
                            />
                            
                            <div className="pt-4">
                                <Button variant="primary" className="w-full" icon={<FaSave />} onClick={handleSave}>
                                    Guardar Cambios
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Reference & Tabs */}
                <div className="lg:col-span-2 space-y-6">
                     <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex" aria-label="Tabs">
                                <button
                                    onClick={() => setActiveTab('students')}
                                    className={`
                                        w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                                        ${activeTab === 'students' 
                                            ? 'border-golden-rod-500 text-golden-rod-600 bg-golden-rod-50/10' 
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                                    `}
                                >
                                    <IoMdSchool className="text-lg" />
                                    Alumnos Asociados
                                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                                        {user.students.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('payments')}
                                    className={`
                                        w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                                        ${activeTab === 'payments' 
                                            ? 'border-golden-rod-500 text-golden-rod-600 bg-golden-rod-50/10' 
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                                    `}
                                >
                                    <IoMdCash className="text-lg" />
                                    Historial de Pagos
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'students' && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bebas text-gray-500">Listado de Alumnos</h3>
                                        <Button variant="secondary" icon={<FaPlus />} onClick={handleAddStudent}>
                                            Agregar Alumno
                                        </Button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {user.students.length > 0 ? user.students.map((student, idx) => (
                                            <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-golden-rod-200 transition-colors group">
                                                <img className="h-12 w-12 rounded-full object-cover mr-4" src={student.image} alt={student.name} />
                                                <div className="flex-1">
                                                    <h4 className="text-base font-bold text-gray-900">{student.name}</h4>
                                                    <p className="text-sm text-gray-500">{student.rank}</p>
                                                </div>
                                                <Link to={`/dashboard/students/${idx + 1}`} className="text-sm font-bold text-gray-400 group-hover:text-golden-rod-600 transition-colors">
                                                    Ver Perfil
                                                </Link>
                                            </div>
                                        )) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                                <p className="text-gray-400 italic mb-4">No tiene alumnos asociados.</p>
                                                <Button variant="secondary" icon={<FaPlus />} onClick={handleAddStudent}>
                                                    Registrar Alumno
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'payments' && (
                                <div className="animate-fade-in">
                                    <div className="overflow-hidden rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referencia</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {mockUserPayments.map((payment) => (
                                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{payment.reference}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{payment.amount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                payment.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {payment.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
