import type { Route } from "./+types/login";
import { redirect, useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "../components/atoms/Input";
import { useAuthStore } from "../store/useAuthStore";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bienvenido al Dojo" },
    { name: "description", content: "Login to Minarai" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  // Mock login for now
  return redirect("/");
}

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      await login({ email });
      navigate("/dashboard");
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black-beauty-950 font-raleway">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black-beauty-950">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-6xl tracking-wide text-golden-rod-500 font-bebas">
              Bienvenido al Dojo
            </h1>
            <p className="mt-2 text-sm text-black-beauty-300 font-raleway">
              Por favor ingresa tus credenciales
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-2xl">
            <div className="space-y-4">
              <Input
                label="Correo Electrónico"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="usuario@ejemplo.com"
              />

              <Input
                label="Contraseña"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
            
            {error && (
                <div className="text-barbados-cherry-500 text-sm font-raleway text-center">
                    {error}
                </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-golden-rod-500 py-2 px-4 text-lg font-bold text-black-beauty-900 shadow-sm hover:bg-golden-rod-400 focus:outline-none focus:ring-2 focus:ring-golden-rod-500 focus:ring-offset-2 transition-colors duration-200 font-bebas tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {loading ? "INGRESANDO..." : "INGRESAR"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image Placeholder */}
      <div className="hidden lg:block w-1/2 relative bg-black-beauty-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-golden-rod-500 text-3xl font-bebas flex flex-col items-center gap-4 animate-pulse">
             <div className="w-32 h-32 bg-golden-rod-500/10 rounded-full flex items-center justify-center border-2 border-golden-rod-500">
                <span className="text-4xl text-golden-rod-500">変</span>
             </div>
             <span>Imagen del Dojo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
