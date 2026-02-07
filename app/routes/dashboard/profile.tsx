
import type { Route } from "./+types/profile";
import { useAuthStore } from "../../store/useAuthStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mi Perfil - Minarai" },
  ];
}

export default function Profile() {
  const { user } = useAuthStore();

  if (!user) return null;

  // Static mock data
  const staticData = {
    joinDate: "Ene 2024",
    bio: "Administrador del sistema encargado de la gestión de usuarios y pagos.",
    phone: "+58 424 222 2222",
    location: "Punto Fijo, Falcon, Venezuela",
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-barbados-cherry-500 to-barbados-cherry-700"></div>

        <div className="px-6 py-4 relative">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6">
            {user.image ? (
                <img
                    src={user.image}
                    alt={user.name}
                    className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover"
                />
            ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
                    {user.name.charAt(0)}
                </div>
            )}
          </div>

          {/* Header Info */}
          <div className="ml-40 pt-2">
            <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">{user.name}</h1>
            <p className="text-gray-500 text-sm font-medium">{user.email}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="capitalize px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800">
                    {user.role}
                </span>
                <span className="mx-2">•</span>
                <span>Miembro desde {staticData.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="border-t border-gray-100 px-6 py-6 card-body">
            <h3 className="text-lg font-medium text-gray-900 mb-4 font-bebas">Información Personal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-500">Biografía</label>
                    <p className="mt-1 text-sm text-gray-900">{staticData.bio}</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Teléfono</label>
                        <p className="mt-1 text-sm text-gray-900">{staticData.phone}</p>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-500">Ubicación</label>
                        <p className="mt-1 text-sm text-gray-900">{staticData.location}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
