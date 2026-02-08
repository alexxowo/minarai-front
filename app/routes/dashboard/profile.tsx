import type { Route } from "./+types/profile";
import { useState } from "react";
import { 
    FaUser, FaBirthdayCake, FaMedal, FaCalendarAlt, FaFilePdf, FaFileImage, 
    FaDownload, FaStar, FaTrophy, FaCertificate, FaHome, 
    FaClipboardCheck, FaHistory, FaCheckCircle, FaChartLine 
} from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mi Perfil - Minarai" },
  ];
}

export default function Profile() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("resumen");

  if (!user) return null;

  // Mock Data (In a real app, fetch based on user.id)
  const student = {
      id: user.id || "1",
      name: user.name || "Usuario",
      age: 12, // Mock
      dob: "15 de Agosto, 2013", // Mock
      rank: "6to Kyu - Cinturón Verde", // Mock
      joinDate: "01 de Enero, 2023", // Mock
      image: user.image || `https://ui-avatars.com/api/?name=${user.name}&background=goldenrod&color=fff&size=256`,
      beltColor: "bg-green-600" // Mock
  };

  const attendance = {
      week: 3,
      month: 12,
      year: 110,
      totalClasses: 145 
  };

  const achievements = [
      { id: 1, type: "promotion", title: "Ascenso a Cinturón Verde", date: "20 de Julio, 2024", description: "Examen aprobado con distinción.", icon: FaMedal, color: "text-green-600 bg-green-100 border-green-200" },
      { id: 2, type: "tournament", title: "Copa Nacional 2024", date: "15 de Mayo, 2024", description: "Medalla de Oro en Kumite.", icon: FaTrophy, color: "text-golden-rod-600 bg-golden-rod-100 border-golden-rod-200" },
      { id: 3, type: "milestone", title: "100 Clases Asistidas", date: "10 de Marzo, 2024", description: "Constancia y dedicación en el dojo.", icon: FaStar, color: "text-purple-600 bg-purple-100 border-purple-200" },
  ];

  const documents = [
      { id: 1, type: "pdf", title: "Certificado 6to Kyu", date: "20/07/2024", size: "1.5 MB" },
      { id: 2, type: "image", title: "Foto Carnet 2024", date: "10/01/2024", size: "2.1 MB" },
  ];

  const tabs = [
      { id: "resumen", label: "Resumen", icon: FaHome },
      { id: "info", label: "Info Personal", icon: FaUser },
      { id: "logros", label: "Trayectoria", icon: FaHistory },
      { id: "documentos", label: "Documentos", icon: FaClipboardCheck },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-raleway pb-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
            <img 
                src={student.image} 
                alt={student.name} 
                className="h-24 w-24 rounded-full border-4 border-golden-rod-100 shadow-sm object-cover"
            />
            <div className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-white ${student.beltColor}`} title={student.rank}></div>
        </div>
        <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">{student.name}</h1>
            <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                {student.rank}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><FaBirthdayCake className="text-pink-400"/> {student.age} Años</span>
                <span className="flex items-center gap-1"><FaCalendarAlt className="text-blue-400"/> Ingreso: {student.joinDate}</span>
            </div>
            <div className="mt-3">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium border border-gray-200 uppercase tracking-wider">{user.role === 'admin' ? 'Administrador' : 'Estudiante'}</span>
            </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id 
                    ? "border-golden-rod-500 text-golden-rod-600 bg-golden-rod-50/50" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
            >
                <tab.icon className={activeTab === tab.id ? "text-golden-rod-500" : "text-gray-400"} />
                {tab.label}
            </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        
        {/* RESUMEN TAB */}
        {activeTab === "resumen" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                <StatsCard title="Asistencias Semana" value={attendance.week} subtext="Clases asistidas" icon={FaCheckCircle} color="bg-green-50 text-green-600" textColor="text-green-700" />
                <StatsCard title="Asistencias Mes" value={attendance.month} subtext="Clases asistidas" icon={FaCalendarAlt} color="bg-blue-50 text-blue-600" textColor="text-blue-700" />
                <StatsCard title="Asistencias Año" value={attendance.year} subtext="Clases asistidas" icon={FaChartLine} color="bg-purple-50 text-purple-600" textColor="text-purple-700" />
                <StatsCard title="Promedio" value="95%" subtext="Constancia anual" icon={FaStar} color="bg-golden-rod-50 text-golden-rod-600" textColor="text-golden-rod-700" />
            </div>
        )}

        {/* INFO PERSONAL TAB */}
        {activeTab === "info" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in-up max-w-2xl">
                <h3 className="text-lg font-bold text-gray-800 font-bebas mb-6 border-b border-gray-100 pb-2">Mis Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                        <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Nombre Completo</label>
                        <p className="text-gray-900 font-medium">{student.name}</p>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Fecha de Nacimiento</label>
                        <p className="text-gray-900 font-medium">{student.dob}</p>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Edad Actual</label>
                        <p className="text-gray-900 font-medium">{student.age} Años</p>
                    </div>
                        <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Fecha de Ingreso</label>
                        <p className="text-gray-900 font-medium">{student.joinDate}</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Grado Actual</label>
                        <div className="flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${student.beltColor}`}></span>
                                <p className="text-gray-900 font-medium">{student.rank}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <p className="text-sm text-yellow-800">
                            Si deseas actualizar tu información personal, por favor contacta con la administración del Dojo.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {/* TRAYECTORIA TAB */}
        {activeTab === "logros" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in-up p">
                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-10">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="relative flex items-start gap-4 ml-[-21px] group">
                            <div className={`mt-0.5 h-10 w-10 shrink-0 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 bg-white z-10 ${achievement.color}`}>
                                <achievement.icon className="text-sm" />
                            </div>
                            <div className="pt-1">
                                <h3 className="text-lg font-bold text-gray-900 font-raleway group-hover:text-golden-rod-600 transition-colors cursor-default">{achievement.title}</h3>
                                <time className="block mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{achievement.date}</time>
                                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 group-hover:border-golden-rod-200 transition-colors">
                                    {achievement.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
        )}

            {/* DOCUMENTOS TAB */}
            {activeTab === "documentos" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-golden-rod-300 hover:bg-golden-rod-50/30 transition-all group cursor-pointer bg-white">
                            <div className="flex items-center space-x-4 overflow-hidden">
                                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                                    {doc.type === "pdf" ? (
                                        <FaFilePdf className="text-xl text-red-500" />
                                    ) : (
                                        <FaFileImage className="text-xl text-blue-500" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-golden-rod-700 transition-colors">{doc.title}</p>
                                    <p className="text-xs text-gray-500">{doc.date} &bull; {doc.size}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-golden-rod-600 p-2 rounded-full hover:bg-white transition-colors">
                                <FaDownload />
                            </button>
                        </div>
                    ))}
                </div>
                {documents.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <FaClipboardCheck className="mx-auto text-4xl mb-3 opacity-20" />
                        <p>No tienes documentos disponibles.</p>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
}

function StatsCard({ title, value, subtext, icon: Icon, color, textColor }: { title: string, value: string | number, subtext: string, icon: any, color: string, textColor: string }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="text-lg" />
                </div>
            </div>
            <div>
                <span className={`text-3xl font-bold ${textColor} font-bebas tracking-wide`}>{value}</span>
                <p className="text-xs text-gray-400 mt-1">{subtext}</p>
            </div>
        </div>
    )
}
