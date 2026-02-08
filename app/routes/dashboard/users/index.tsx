import { Link } from "react-router";
import { FaUserPlus, FaEdit, FaTrash, FaUser, FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export function meta({}: any) {
  return [{ title: "Gestión de Usuarios - Minarai" }];
}

export default function Users() {
  // Mock Data
  const users = [
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

  return (
    <div className="space-y-6 animate-fade-in font-raleway h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Gestión de Usuarios</h1>
           <p className="text-gray-500 text-sm">Administra los usuarios y sus alumnos asociados.</p>
        </div>
        
        <Link to="/dashboard/users/create" className="flex items-center gap-2 bg-black-beauty-900 text-golden-rod-500 px-5 py-2.5 rounded-lg hover:bg-black-beauty-800 transition-colors font-bold shadow-lg shadow-black-beauty-900/10 active:scale-95 duration-200">
            <FaUserPlus />
            Agregar Usuario
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
                type="text" 
                placeholder="Buscar por nombre, email..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-rod-400 focus:border-transparent transition-all"
            />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-rod-400 text-gray-600 bg-white">
            <option value="all">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="tutor">Padre/Tutor</option>
            <option value="student">Alumno</option>
        </select>
         <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-rod-400 text-gray-600 bg-white">
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="px-6 py-4">Usuario</th>
                        <th className="px-6 py-4">Rol</th>
                        <th className="px-6 py-4">Estado</th>
                        <th className="px-6 py-4">Alumnos Asociados</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-golden-rod-100 text-golden-rod-700 flex items-center justify-center font-bold text-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                    <GoDotFill className={user.status === 'active' ? 'text-green-500' : 'text-red-500'} />
                                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {user.students.length > 0 ? user.students.map((student, idx) => (
                                        <div key={idx} className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white" title={`${student.name} - ${student.rank}`}>
                                            <img className="h-full w-full rounded-full object-cover" src={student.image} alt={student.name} />
                                        </div>
                                    )) : (
                                        <span className="text-xs text-gray-400 italic">Sin alumnos</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-golden-rod-600 hover:bg-golden-rod-50 rounded-lg transition-colors" title="Editar">
                                        <FaEdit />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
