import { Link } from "react-router";
import { FaHome, FaFilePdf, FaFileImage, FaDownload, FaClipboardCheck } from "react-icons/fa";

export function meta({}: any) {
  return [{ title: "Documentos de Alumno - Minarai" }];
}

export default function StudentDocuments() {
    // Mock Data - In a real app, fetch based on route param studentId
    const student = {
        name: "Luis Hernández",
    };

    const documents = [
      { id: 1, type: "pdf", title: "Certificado 7mo Kyu", date: "15/06/2024", size: "1.2 MB" },
      { id: 2, type: "pdf", title: "Diploma Torneo Regional", date: "10/04/2024", size: "850 KB" },
      { id: 3, type: "image", title: "Ficha Médica 2024", date: "01/02/2024", size: "2.5 MB" },
    ];

    return (
        <div className="space-y-6 animate-fade-in font-raleway">
             {/* Header with Breadcrumb */}
            <div className="flex items-center gap-4">
                 <Link to="/dashboard" className="text-gray-400 hover:text-golden-rod-500 transition-colors">
                    <FaHome className="text-xl" />
                </Link>
                <span className="text-gray-300">/</span>
                <Link to="/dashboard/documents" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">Documentos</Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-800 font-bold">{student.name}</span>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Documentos de {student.name}</h1>
            </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-golden-rod-300 hover:bg-golden-rod-50/30 transition-all group cursor-pointer bg-white">
                            <div className="flex items-center space-x-4 overflow-hidden">
                                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                                    {doc.type === "pdf" ? (
                                        <FaFilePdf className="text-2xl text-red-500" />
                                    ) : (
                                        <FaFileImage className="text-2xl text-blue-500" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-golden-rod-700 transition-colors">{doc.title}</p>
                                    <p className="text-xs text-gray-500">{doc.date} &bull; {doc.size}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-golden-rod-600 p-2 rounded-full hover:bg-white transition-colors" title="Descargar">
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
        </div>
    );
}
