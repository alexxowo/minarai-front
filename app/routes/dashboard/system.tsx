import { useState } from "react";
import type { Route } from "./+types/system";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";
import { Button } from "~/components/atoms/Button";
import { MdSettings, MdEmail, MdSave, MdCheckCircle, MdError, MdSecurity } from "react-icons/md";
import { FaServer } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Configuración del Sistema - Minarai" }];
}

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<'general' | 'email'>('general');
  // Mock state for SMTP form
  const [smtpConfig, setSmtpConfig] = useState({
      host: "",
      port: "",
      user: "",
      password: "",
      encryption: "tls",
      fromName: "Minarai System",
      fromAddress: "no-reply@minarai.com"
  });

  const handleSmtpChange = (key: string, value: any) => {
      setSmtpConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSmtp = () => {
      console.log("Saving SMTP Config:", smtpConfig);
      // Simulate save
      alert("Configuración SMTP guardada (Mock)");
  };

  const tabs = [
      { id: 'general', label: 'General', icon: MdSettings },
      { id: 'email', label: 'Correo Electrónico', icon: MdEmail },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-raleway h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 font-bebas tracking-wide">Configuración del Sistema</h1>
            <p className="mt-1 text-sm text-gray-500">Administra las preferencias globales y conexiones</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full items-start">
        {/* Vertical Tabs Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-700 font-bebas tracking-wide">Menú de Ajustes</h3>
            </div>
            <nav className="flex flex-col">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'general' | 'email')}
                            className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                                activeTab === tab.id
                                    ? "bg-golden-rod-50 border-golden-rod-500 text-golden-rod-700"
                                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <Icon className={`mr-3 text-lg ${activeTab === tab.id ? "text-golden-rod-500" : "text-gray-400"}`} />
                            {tab.label}
                        </button>
                    )
                })}
            </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
            {activeTab === 'general' && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <MdSettings className="text-6xl mb-4 opacity-20" />
                    <p className="text-lg font-medium">Configuración General</p>
                    <p className="text-sm">No hay opciones disponibles por el momento.</p>
                </div>
            )}

            {activeTab === 'email' && (
                <div className="max-w-2xl mx-auto animate-fade-in">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <MdEmail className="mr-2 text-golden-rod-500" />
                            Configuración SMTP
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Configura el servidor de correo para las notificaciones del sistema.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Servidor SMTP (Host)</label>
                                <Input 
                                    placeholder="smtp.example.com" 
                                    value={smtpConfig.host}
                                    onChange={(e) => handleSmtpChange('host', e.target.value)}
                                    icon={<FaServer className="text-gray-400" />}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Puerto</label>
                                <Input 
                                    placeholder="587" 
                                    value={smtpConfig.port}
                                    onChange={(e) => handleSmtpChange('port', e.target.value)}
                                />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Usuario / Correo</label>
                                <Input 
                                    placeholder="admin@example.com" 
                                    value={smtpConfig.user}
                                    onChange={(e) => handleSmtpChange('user', e.target.value)}
                                    icon={<MdEmail className="text-gray-400" />}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                                <Input 
                                    type="password"
                                    placeholder="••••••••" 
                                    value={smtpConfig.password}
                                    onChange={(e) => handleSmtpChange('password', e.target.value)}
                                    icon={<MdSecurity className="text-gray-400" />}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Encriptación</label>
                            <Select 
                                options={[
                                    { value: 'none', label: 'Ninguna' },
                                    { value: 'ssl', label: 'SSL' },
                                    { value: 'tls', label: 'TLS' },
                                ]}
                                value={smtpConfig.encryption}
                                onChange={(val) => handleSmtpChange('encryption', val)}
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Nombre del Remitente</label>
                                <Input 
                                    placeholder="Sistema Minarai" 
                                    value={smtpConfig.fromName}
                                    onChange={(e) => handleSmtpChange('fromName', e.target.value)}
                                />
                            </div>
                             <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Correo del Remitente</label>
                                <Input 
                                    placeholder="noreply@minarai.com" 
                                    value={smtpConfig.fromAddress}
                                    onChange={(e) => handleSmtpChange('fromAddress', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end gap-3 transition-all">
                             <Button 
                                variant="secondary" 
                                outlined
                                onClick={() => alert("Prueba de conexión iniciada (Mock)")}
                            >
                                Probar Conexión
                            </Button>
                            <Button 
                                variant="primary" 
                                icon={<MdSave />}
                                onClick={handleSaveSmtp}
                            >
                                Guardar Configuración
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
