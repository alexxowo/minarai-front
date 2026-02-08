import type { Route } from "./+types/documents";
import { Link } from "react-router";
import { FaUser, FaFolderOpen } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Mis Documentos - Minarai" }];
}

export default function Documents() {
  // Mock Data (Should be consistent with home/profile mock data for now)
  const students = [
    {
      id: "1",
      name: "Luis Hernández",
      rank: "7mo Kyu",
      image: "https://ui-avatars.com/api/?name=Luis+Hernandez&background=FFD700&color=000&size=256",
      beltColor: "bg-yellow-400"
    },
    {
      id: "2",
      name: "Ana García",
      rank: "9no Kyu",
      image: "https://ui-avatars.com/api/?name=Ana+Garcia&background=FFFFFF&color=000&size=256",
      beltColor: "bg-white border-gray-200"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in font-raleway">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Mis Documentos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition-all duration-300 group">
             <div className="relative mb-4">
                <img 
                    src={student.image} 
                    alt={student.name} 
                    className="h-24 w-24 rounded-full border-4 border-gray-50 shadow-sm object-cover group-hover:border-golden-rod-100 transition-colors"
                />
                <div className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-white ${student.beltColor}`}></div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 font-bebas tracking-wide mb-1">{student.name}</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">{student.rank}</p>

            <Link 
                to={`/dashboard/documents/${student.id}`}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 py-2.5 px-4 rounded-lg hover:bg-golden-rod-50 hover:text-golden-rod-700 hover:border-golden-rod-200 font-bold transition-all"
            >
                <FaFolderOpen />
                Ver Documentos
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
