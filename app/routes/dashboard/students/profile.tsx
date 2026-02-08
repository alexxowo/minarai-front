import type { Route } from "./+types/profile";
import { useState } from "react";
import { 
    FaUser, FaBirthdayCake, FaMedal, FaCalendarAlt, FaFilePdf, FaFileImage, 
    FaDownload, FaStar, FaTrophy, FaCertificate, FaHome, 
    FaClipboardCheck, FaHistory, FaCheckCircle, FaChartLine,
    FaEdit, FaPlus, FaUpload, FaCloudUploadAlt
} from "react-icons/fa";
import { Link } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";
import { Button } from "~/components/atoms/Button";
import { DateSelector } from "~/components/atoms/DateSelector";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Perfil de Alumno - Minarai" }];
}

export default function StudentProfile() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === 'admin';

    if (isAdmin) {
        return <AdminProfile />;
    }

    return <UserProfile />;
}

function AdminProfile() {
    const [activeTab, setActiveTab] = useState("resumen");
    
    // Edit/Add States
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isAddingAchievement, setIsAddingAchievement] = useState(false);
    const [isAddingDocument, setIsAddingDocument] = useState(false);

    // Mock Data State (so we can update it locally)
    const [student, setStudent] = useState({
      id: "1",
      name: "Luis Hernández",
      age: 10,
      dob: "10 de Mayo, 2015", // In real app, use Date object or ISO string
      rank: "7mo Kyu - Cinturón Amarillo",
      joinDate: "01 de Febrero, 2024",
      image: "https://ui-avatars.com/api/?name=Luis+Hernandez&background=FFD700&color=000&size=256",
      beltColor: "bg-yellow-400"
    });

    const [achievements, setAchievements] = useState([
      { id: 1, type: "promotion", title: "Ascenso a Cinturón Amarillo", date: "15 de Junio, 2024", description: "Examen aprobado con excelencia técnica.", icon: FaMedal, color: "text-yellow-600 bg-yellow-100 border-yellow-200" },
      { id: 2, type: "tournament", title: "Torneo Regional 2024", date: "10 de Abril, 2024", description: "Medalla de Plata en Kata Infantil.", icon: FaTrophy, color: "text-blue-600 bg-blue-100 border-blue-200" },
      { id: 3, type: "seminar", title: "Clase Especial de Kumite", date: "20 de Marzo, 2024", description: "Participación en seminario intensivo.", icon: FaCertificate, color: "text-green-600 bg-green-100 border-green-200" },
      { id: 4, type: "milestone", title: "Ingreso al Dojo", date: "01 de Febrero, 2024", description: "Inicio del camino en Karate-Do.", icon: FaStar, color: "text-purple-600 bg-purple-100 border-purple-200" },
    ]);

    const [documents, setDocuments] = useState([
      { id: 1, type: "pdf", title: "Certificado 7mo Kyu", date: "15/06/2024", size: "1.2 MB" },
      { id: 2, type: "pdf", title: "Diploma Torneo Regional", date: "10/04/2024", size: "850 KB" },
      { id: 3, type: "image", title: "Ficha Médica 2024", date: "01/02/2024", size: "2.5 MB" },
    ]);

    const attendance = {
      week: 3,
      month: 12,
      year: 85,
      totalClasses: 96 
    };
  
    const tabs = [
      { id: "resumen", label: "Resumen", icon: FaHome },
      { id: "info", label: "Info Personal", icon: FaUser },
      { id: "logros", label: "Trayectoria", icon: FaHistory },
      { id: "documentos", label: "Documentos", icon: FaClipboardCheck },
    ];

    // Handlers
    const handleSaveInfo = () => {
        setIsEditingInfo(false);
        // Here you would make an API call
        console.log("Saving info:", student);
    };

    const handleAddAchievement = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddingAchievement(false);
        // Mock add
        const newAchievement = { 
            id: Date.now(), 
            type: "milestone", 
            title: "Nuevo Logro", 
            date: new Date().toLocaleDateString(), 
            description: "Descripción del logro añadido.", 
            icon: FaStar, 
            color: "text-gray-600 bg-gray-100 border-gray-200" 
        };
        setAchievements([newAchievement, ...achievements]);
    };

    const handleAddDocument = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddingDocument(false);
        // Mock add
        const newDoc = { 
            id: Date.now(), 
            type: "pdf", 
            title: "Nuevo Documento", 
            date: new Date().toLocaleDateString(), 
            size: "0 KB" 
        };
        setDocuments([newDoc, ...documents]);
    };

    return (
        <div className="space-y-6 animate-fade-in font-raleway">
          {/* Header with Breadcrumb */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Link to="/dashboard" className="text-gray-400 hover:text-golden-rod-500 transition-colors">
                    <FaHome className="text-xl" />
                </Link>
                <span className="text-gray-300">/</span>
                <Link to="/dashboard/students" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">Alumnos</Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-800 font-bold">{student.name}</span>
            </div>
            {/* Admin specific action example */}
            <div className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-bold border border-red-200">
                VISTA DE ADMINISTRADOR
            </div>
          </div>
    
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
                    <StatsCard title="Promedio" value="92%" subtext="Constancia anual" icon={FaStar} color="bg-golden-rod-50 text-golden-rod-600" textColor="text-golden-rod-700" />
                </div>
            )}
    
            {/* INFO PERSONAL TAB */}
            {activeTab === "info" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in-up max-w-2xl relative">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
                         <h3 className="text-lg font-bold text-gray-800 font-bebas">Datos Personales</h3>
                         {!isEditingInfo ? (
                             <Button size="sm" variant="secondary" outlined onClick={() => setIsEditingInfo(true)}>
                                 <FaEdit /> Editar
                             </Button>
                         ) : (
                             <div className="flex gap-2">
                                 <Button size="sm" variant="secondary" className="text-gray-500 hover:text-gray-700" onClick={() => setIsEditingInfo(false)}>Cancelar</Button>
                                 <Button size="sm" variant="success" onClick={handleSaveInfo}>Guardar</Button>
                             </div>
                         )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                         <div className="md:col-span-2">
                            <Input 
                                label="Nombre Completo" 
                                value={student.name} 
                                disabled={!isEditingInfo}
                                onChange={(e) => setStudent({...student, name: e.target.value})}
                                className={!isEditingInfo ? "!border-transparent !bg-transparent !p-0 !text-base !font-medium !text-gray-900 !shadow-none disabled:!opacity-100 disabled:cursor-text" : ""}
                            />
                        </div>
                        <div>
                             <Input 
                                label="Fecha de Nacimiento" 
                                value={student.dob} 
                                disabled={!isEditingInfo}
                                onChange={(e) => setStudent({...student, dob: e.target.value})}
                                className={!isEditingInfo ? "!border-transparent !bg-transparent !p-0 !text-base !font-medium !text-gray-900 !shadow-none disabled:!opacity-100 disabled:cursor-text" : ""}
                            />
                        </div>
                        <div>
                             <Input 
                                label="Edad Actual" 
                                value={`${student.age} Años`} 
                                disabled={!isEditingInfo}
                                onChange={(e) => setStudent({...student, age: parseInt(e.target.value) || 0})}
                                className={!isEditingInfo ? "!border-transparent !bg-transparent !p-0 !text-base !font-medium !text-gray-900 !shadow-none disabled:!opacity-100 disabled:cursor-text" : ""}
                            />
                        </div>
                         <div>
                            <Input 
                                label="Fecha de Ingreso" 
                                value={student.joinDate} 
                                disabled={!isEditingInfo}
                                onChange={(e) => setStudent({...student, joinDate: e.target.value})}
                                className={!isEditingInfo ? "!border-transparent !bg-transparent !p-0 !text-base !font-medium !text-gray-900 !shadow-none disabled:!opacity-100 disabled:cursor-text" : ""}
                            />
                        </div>
                        <div className="md:col-span-2">
                             <Input 
                                label="Grado Actual" 
                                value={student.rank} 
                                disabled={!isEditingInfo}
                                onChange={(e) => setStudent({...student, rank: e.target.value})}
                                className={!isEditingInfo ? "!border-transparent !bg-transparent !p-0 !text-base !font-medium !text-gray-900 !shadow-none disabled:!opacity-100 disabled:cursor-text" : ""}
                            />
                        </div>
                    </div>
                </div>
            )}
    
            {/* TRAYECTORIA TAB */}
            {activeTab === "logros" && (
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in-up">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold text-gray-800 font-bebas">Línea de Tiempo</h3>
                        <Button size="sm" onClick={() => setIsAddingAchievement(true)}>
                            <FaPlus /> Agregar Logro
                        </Button>
                     </div>

                     {isAddingAchievement && (
                         <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 animate-fade-in">
                             <h4 className="font-bold text-gray-700 mb-4">Nuevo Logro</h4>
                             <form onSubmit={handleAddAchievement} className="space-y-4">
                                 <Input label="Título" placeholder="Ej. Ascenso a 6to Kyu" />
                                 <div className="grid grid-cols-2 gap-4">
                                    <DateSelector 
                                        label="Fecha" 
                                        selected={new Date()} 
                                        onChange={() => {}} 
                                    />
                                     <Select label="Tipo" options={[{ value: 'promotion', label: 'Ascenso' }, { value: 'tournament', label: 'Torneo' }, { value: 'seminar', label: 'Seminario' }]} value={""} onChange={() => {}} />
                                 </div>
                                 <Input label="Descripción" placeholder="Detalles del logro..." />
                                 <div className="flex justify-end gap-2">
                                     <Button type="button" variant="secondary" outlined onClick={() => setIsAddingAchievement(false)}>Cancelar</Button>
                                     <Button type="submit">Guardar</Button>
                                 </div>
                             </form>
                         </div>
                     )}

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
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 font-bebas">Archivos del Alumno</h3>
                        <Button size="sm" onClick={() => setIsAddingDocument(true)}>
                            <FaUpload /> Subir Documento
                        </Button>
                     </div>

                     {isAddingDocument && (
                         <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 animate-fade-in">
                             <h4 className="font-bold text-gray-700 mb-4">Subir Nuevo Documento</h4>
                             <form onSubmit={handleAddDocument} className="space-y-4">
                                 <Input label="Nombre del Archivo" placeholder="Ej. Certificado Médico 2024" />
                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                                     <FaCloudUploadAlt className="mx-auto text-4xl text-gray-300 mb-2" />
                                     <p className="text-sm text-gray-500 font-medium">Click para seleccionar o arrastra el archivo aquí</p>
                                 </div>
                                 <div className="flex justify-end gap-2">
                                     <Button type="button" variant="ghost" onClick={() => setIsAddingDocument(false)}>Cancelar</Button>
                                     <Button type="submit">Subir</Button>
                                 </div>
                             </form>
                         </div>
                     )}

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
                </div>
            )}
    
          </div>
        </div>
      );
}

function UserProfile() {
    const [activeTab, setActiveTab] = useState("resumen");
  
    // Mock Data
    const student = {
      id: "1",
      name: "Luis Hernández",
      age: 10,
      dob: "10 de Mayo, 2015",
      rank: "7mo Kyu - Cinturón Amarillo",
      joinDate: "01 de Febrero, 2024",
      image: "https://ui-avatars.com/api/?name=Luis+Hernandez&background=FFD700&color=000&size=256",
      beltColor: "bg-yellow-400"
    };
  
    const attendance = {
      week: 3,
      month: 12,
      year: 85,
      totalClasses: 96 
    };
  
    const achievements = [
      { id: 1, type: "promotion", title: "Ascenso a Cinturón Amarillo", date: "15 de Junio, 2024", description: "Examen aprobado con excelencia técnica.", icon: FaMedal, color: "text-yellow-600 bg-yellow-100 border-yellow-200" },
      { id: 2, type: "tournament", title: "Torneo Regional 2024", date: "10 de Abril, 2024", description: "Medalla de Plata en Kata Infantil.", icon: FaTrophy, color: "text-blue-600 bg-blue-100 border-blue-200" },
      { id: 3, type: "seminar", title: "Clase Especial de Kumite", date: "20 de Marzo, 2024", description: "Participación en seminario intensivo.", icon: FaCertificate, color: "text-green-600 bg-green-100 border-green-200" },
      { id: 4, type: "milestone", title: "Ingreso al Dojo", date: "01 de Febrero, 2024", description: "Inicio del camino en Karate-Do.", icon: FaStar, color: "text-purple-600 bg-purple-100 border-purple-200" },
    ];
  
    const documents = [
      { id: 1, type: "pdf", title: "Certificado 7mo Kyu", date: "15/06/2024", size: "1.2 MB" },
      { id: 2, type: "pdf", title: "Diploma Torneo Regional", date: "10/04/2024", size: "850 KB" },
      { id: 3, type: "image", title: "Ficha Médica 2024", date: "01/02/2024", size: "2.5 MB" },
    ];
  
    const tabs = [
      { id: "resumen", label: "Resumen", icon: FaHome },
      { id: "info", label: "Info Personal", icon: FaUser },
      { id: "logros", label: "Trayectoria", icon: FaHistory },
      { id: "documentos", label: "Documentos", icon: FaClipboardCheck },
    ];

    return (
        <div className="space-y-6 animate-fade-in font-raleway">
          {/* Header with Breadcrumb */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <Link to="/dashboard" className="text-gray-400 hover:text-golden-rod-500 transition-colors">
                    <FaHome className="text-xl" />
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-500 font-medium">Alumnos</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-800 font-bold">{student.name}</span>
            </div>
          </div>
    
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
                    {/* Attendance Stats */}
                    <StatsCard 
                        title="Asistencias esta Semana" 
                        value={attendance.week} 
                        subtext="Clases asistidas" 
                        icon={FaCheckCircle} 
                        color="bg-green-50 text-green-600" 
                        textColor="text-green-700"
                    />
                    <StatsCard 
                        title="Asistencias este Mes" 
                        value={attendance.month} 
                        subtext="Clases asistidas" 
                        icon={FaCalendarAlt} 
                        color="bg-blue-50 text-blue-600" 
                        textColor="text-blue-700"
                    />
                     <StatsCard 
                        title="Asistencias este Año" 
                        value={attendance.year} 
                        subtext="Clases asistidas" 
                        icon={FaChartLine} 
                        color="bg-purple-50 text-purple-600" 
                        textColor="text-purple-700"
                    />
                    <StatsCard 
                        title="Promedio de Asistencia" 
                        value="92%" 
                        subtext="Constancia anual" 
                        icon={FaStar} 
                        color="bg-golden-rod-50 text-golden-rod-600" 
                        textColor="text-golden-rod-700"
                    />
                </div>
            )}
    
            {/* INFO PERSONAL TAB */}
            {activeTab === "info" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in-up max-w-2xl">
                    <h3 className="text-lg font-bold text-gray-800 font-bebas mb-6 border-b border-gray-100 pb-2">Datos Personales</h3>
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
                            <p>No hay documentos disponibles.</p>
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
