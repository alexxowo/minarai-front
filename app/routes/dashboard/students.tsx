import { useState, useEffect } from "react";
import type { Route } from "./+types/students";
import { FaUserCheck, FaUserTimes, FaUserPlus, FaUsers, FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";
import { Button } from "~/components/atoms/Button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dojo - Estudiantes" }];
}

// ... (stats, kyuDistribution, mockStudents definitions remain unchanged)

// Mock Data
const stats = {
  active: 142,
  inactive: 12,
  new: 5
};

const kyuDistribution = [
  { rank: "10mo Kyu", color: "bg-white border-2 border-gray-200 text-gray-700", count: 45, percentage: 35 },
  { rank: "9no Kyu", color: "bg-yellow-400 text-white", count: 30, percentage: 25 },
  { rank: "8vo Kyu", color: "bg-orange-500 text-white", count: 25, percentage: 20 },
  { rank: "7mo Kyu", color: "bg-green-500 text-white", count: 15, percentage: 12 },
  { rank: "6to Kyu", color: "bg-blue-500 text-white", count: 10, percentage: 8 },
  { rank: "5to Kyu", color: "bg-purple-500 text-white", count: 8, percentage: 6 },
  { rank: "4to Kyu", color: "bg-purple-700 text-white", count: 5, percentage: 4 },
  { rank: "3er Kyu", color: "bg-[#8B4513] text-white", count: 3, percentage: 2 },
  { rank: "2do Kyu", color: "bg-[#8B4513] text-white", count: 2, percentage: 1.5 },
  { rank: "1er Kyu", color: "bg-[#8B4513] text-white", count: 1, percentage: 1 },
];

const mockStudents = [
  { id: 1, name: "Juan Pérez", kyu: "10mo Kyu", status: "active", joinDate: "2023-01-15" },
  { id: 2, name: "María González", kyu: "9no Kyu", status: "active", joinDate: "2022-11-20" },
  { id: 3, name: "Carlos López", kyu: "8vo Kyu", status: "inactive", joinDate: "2023-03-10" },
  { id: 4, name: "Ana Rodríguez", kyu: "10mo Kyu", status: "active", joinDate: "2024-01-05" },
  { id: 5, name: "Pedro Sánchez", kyu: "7mo Kyu", status: "active", joinDate: "2022-05-12" },
  { id: 6, name: "Lucía Fernández", kyu: "6to Kyu", status: "active", joinDate: "2021-08-23" },
  { id: 7, name: "Miguel Ángel", kyu: "10mo Kyu", status: "inactive", joinDate: "2023-12-01" },
  { id: 8, name: "Sofía Martínez", kyu: "9no Kyu", status: "active", joinDate: "2023-06-15" },
  { id: 9, name: "Diego Torres", kyu: "10mo Kyu", status: "active", joinDate: "2024-02-01" },
  { id: 10, name: "Elena Ruiz", kyu: "8vo Kyu", status: "active", joinDate: "2023-04-20" },
];

const kyuOptions = [
    { value: "all", label: "Todos los Grados" },
    { value: "10mo Kyu", label: "10mo Kyu" },
    { value: "9no Kyu", label: "9no Kyu" },
    { value: "8vo Kyu", label: "8vo Kyu" },
    { value: "7mo Kyu", label: "7mo Kyu" },
    { value: "6to Kyu", label: "6to Kyu" },
];

const statusOptions = [
    { value: "all", label: "Todos los Estados" },
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [kyuFilter, setKyuFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, kyuFilter, statusFilter]);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKyu = kyuFilter === "all" || student.kyu === kyuFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesKyu && matchesStatus;
  });

  // Calculate Pagination
  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="font-raleway animate-fade-in space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide mb-2">Panel de Estudiantes</h1>
        <p className="text-gray-500">Resumen general del estado de los alumnos y su distribución por grados.</p>
      </div>

      {/* ... (Stats and Kyu cards remain the same) ... */}
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all duration-300">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Alumnos Activos</p>
            <h2 className="text-4xl font-extrabold text-gray-900 font-bebas">{stats.active}</h2>
            <p className="text-xs text-green-500 font-bold flex items-center gap-1 mt-2">
              <span className="bg-green-100 px-2 py-0.5 rounded-full">+3% mes pasado</span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-green-500 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <FaUserCheck />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all duration-300">
          <div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Inactivos</p>
            <h2 className="text-4xl font-extrabold text-gray-900 font-bebas">{stats.inactive}</h2>
             <p className="text-xs text-red-400 font-bold flex items-center gap-1 mt-2">
              <span className="bg-red-50 px-2 py-0.5 rounded-full">+2 este mes</span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-red-500 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <FaUserTimes />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all duration-300">
           <div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Nuevos Ingresos</p>
            <h2 className="text-4xl font-extrabold text-gray-900 font-bebas">{stats.new}</h2>
             <p className="text-xs text-golden-rod-600 font-bold flex items-center gap-1 mt-2">
              <span className="bg-golden-rod-50 px-2 py-0.5 rounded-full">Este mes</span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-golden-rod-50 flex items-center justify-center text-golden-rod-500 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <FaUserPlus />
          </div>
        </div>
      </div>

      {/* Kyu Distribution Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
             <h2 className="text-xl font-bold text-gray-900 font-bebas tracking-wide flex items-center gap-2">
                <FaUsers className="text-gray-400" />
                Distribución por Grado (Kyu)
            </h2>
            <button className="text-sm text-golden-rod-600 font-bold hover:underline">Ver reporte completo</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {kyuDistribution.map((kyu, index) => (
                <div key={index} className="flex items-center gap-4 group">
                    <div className={`w-24 shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-center shadow-sm uppercase tracking-wider ${kyu.color}`}>
                        {kyu.rank}
                    </div>
                    <div className="flex-1 relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-slate-800 rounded-full transition-all duration-1000 ease-out group-hover:bg-golden-rod-500"
                            style={{ width: `${kyu.percentage}%` }}
                        />
                    </div>
                     <div className="w-12 text-right">
                        <span className="font-bold text-gray-900">{kyu.count}</span>
                        <span className="text-xs text-gray-400 ml-1">alm.</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Student List Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900 font-bebas tracking-wide">Listado General</h2>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Input 
                        placeholder="Buscar por nombre..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10" 
                    />
                     <FaSearch className="absolute top-3.5 left-3 text-gray-400 pointer-events-none" />
                </div>
                <div className="w-full md:w-48">
                    <Select 
                        options={kyuOptions}
                        value={kyuFilter}
                        onChange={(val) => setKyuFilter(String(val))}
                        placeholder="Filtrar por Grado"
                    />
                </div>
                 <div className="w-full md:w-48">
                    <Select 
                        options={statusOptions}
                        value={statusFilter}
                        onChange={(val) => setStatusFilter(String(val))}
                        placeholder="Filtrar por Estado"
                    />
                </div>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                        <th className="px-6 py-4">Nombre</th>
                        <th className="px-6 py-4">Grado Actual</th>
                        <th className="px-6 py-4 text-center">Estado</th>
                        <th className="px-6 py-4 text-right">Fecha Ingreso</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {currentStudents.length > 0 ? (
                        currentStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <Link to={`/dashboard/students/${student.id}`} className="block">
                                        <div className="font-bold text-gray-900 group-hover:text-golden-rod-600 transition-colors">{student.name}</div>
                                        <div className="text-xs text-gray-400">ID: #{student.id.toString().padStart(4, '0')}</div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
                                        {student.kyu}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                        student.status === 'active' 
                                            ? 'bg-green-100 text-green-700 border-green-200' 
                                            : 'bg-red-100 text-red-700 border-red-200'
                                    }`}>
                                        {student.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-gray-500 text-sm">
                                    {new Date(student.joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                <FaFilter className="mx-auto text-3xl mb-2 opacity-50" />
                                <p>No se encontraron alumnos con los filtros seleccionados.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs text-gray-500">
                Mostrando <span className="font-bold text-gray-900">{filteredStudents.length > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-gray-900">{endIndex}</span> de <span className="font-bold text-gray-900">{totalItems}</span> resultados
            </div>
            
            <div className="flex items-center gap-2">
                <Button 
                    variant="secondary" 
                    outlined 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="!px-3 !py-1 text-xs"
                >
                    <FaChevronLeft />
                </Button>
                
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                                currentPage === page
                                    ? "bg-golden-rod-500 text-white shadow-md shadow-golden-rod-500/30"
                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <Button 
                    variant="secondary" 
                    outlined 
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="!px-3 !py-1 text-xs"
                >
                    <FaChevronRight />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
