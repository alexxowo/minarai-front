import { Link } from "react-router";
import { FaHome, FaMedal, FaTrophy, FaCertificate, FaStar } from "react-icons/fa";

export function meta({}: any) {
  return [{ title: "Trayectoria del Alumno - Minarai" }];
}

export default function StudentTimeline() {
    // Mock Data
    const student = {
        name: "Luis Hernández",
    };

    const achievements = [
      { id: 1, type: "promotion", title: "Ascenso a Cinturón Amarillo", date: "15 de Junio, 2024", description: "Examen aprobado con excelencia técnica.", icon: FaMedal, color: "text-yellow-600 bg-yellow-100 border-yellow-200" },
      { id: 2, type: "tournament", title: "Torneo Regional 2024", date: "10 de Abril, 2024", description: "Medalla de Plata en Kata Infantil.", icon: FaTrophy, color: "text-blue-600 bg-blue-100 border-blue-200" },
      { id: 3, type: "seminar", title: "Clase Especial de Kumite", date: "20 de Marzo, 2024", description: "Participación en seminario intensivo.", icon: FaCertificate, color: "text-green-600 bg-green-100 border-green-200" },
      { id: 4, type: "milestone", title: "Ingreso al Dojo", date: "01 de Febrero, 2024", description: "Inicio del camino en Karate-Do.", icon: FaStar, color: "text-purple-600 bg-purple-100 border-purple-200" },
    ];


    return (
        <div className="space-y-6 font-raleway overflow-hidden">
             {/* Header with Breadcrumb */}
            <div className="flex items-center gap-4 animate-fade-in">
                 <Link to="/dashboard" className="text-gray-400 hover:text-golden-rod-500 transition-colors">
                    <FaHome className="text-xl" />
                </Link>
                <span className="text-gray-300">/</span>
                <Link to="/dashboard/achievements" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">Logros</Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-800 font-bold">{student.name}</span>
            </div>

            <div className="flex items-center justify-between animate-fade-in">
                <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Trayectoria de {student.name}</h1>
            </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-slide-in-right">
                 <div className="relative border-l-2 border-gray-200 ml-3 space-y-10">
                    {achievements.map((achievement, index) => (
                        <div 
                            key={achievement.id} 
                            className="relative flex items-start gap-4 ml-[-21px] group animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
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
        </div>
    );
}
