import { useState } from "react";
import type { Route } from "./+types/system";
import { Input } from "~/components/atoms/Input";
import { Select } from "~/components/atoms/Select";
import { Button } from "~/components/atoms/Button";
import { MdSettings, MdEmail, MdSave, MdCheckCircle, MdError, MdSecurity, MdGrade, MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { FaServer } from "react-icons/fa";
import { Modal } from "~/components/molecules/Modal";

interface Rank {
  id: number;
  name: string;
  colorCode: string;
  type: 'Kyu' | 'Dan';
  number: number;
  sortOrder: number;
  requirementMonths: number;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Configuración del Sistema - Minarai" }];
}

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'ranks'>('general');
  
  // -- RANKS STATE --
  const [ranks, setRanks] = useState<Rank[]>([
      { id: 1, name: "10mo Kyu", colorCode: "#ffffff", type: 'Kyu', number: 10, sortOrder: 1, requirementMonths: 0 },
      { id: 2, name: "9no Kyu", colorCode: "#ffff00", type: 'Kyu', number: 9, sortOrder: 2, requirementMonths: 3 },
      { id: 3, name: "8vo Kyu", colorCode: "#ffcc00", type: 'Kyu', number: 8, sortOrder: 3, requirementMonths: 3 },
      { id: 4, name: "1er Dan", colorCode: "#000000", type: 'Dan', number: 1, sortOrder: 11, requirementMonths: 12 },
  ]);
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);
  const [editingRank, setEditingRank] = useState<Rank | null>(null);
  const [rankFormData, setRankFormData] = useState<Omit<Rank, 'id'>>({
      name: "", colorCode: "#000000", type: 'Kyu', number: 0, sortOrder: 0, requirementMonths: 0
  });

  const handleOpenRankModal = (rank?: Rank) => {
      if (rank) {
          setEditingRank(rank);
          setRankFormData({ ...rank });
      } else {
          setEditingRank(null);
          setRankFormData({ name: "", colorCode: "#ffffff", type: 'Kyu', number: 0, sortOrder: ranks.length + 1, requirementMonths: 3 });
      }
      setIsRankModalOpen(true);
  };

  const handleSaveRank = () => {
      if (editingRank) {
          setRanks(prev => prev.map(r => r.id === editingRank.id ? { ...rankFormData, id: r.id } : r));
      } else {
          setRanks(prev => [...prev, { ...rankFormData, id: Math.max(...prev.map(r => r.id), 0) + 1 }]);
      }
      setIsRankModalOpen(false);
  };

  const handleDeleteRank = (id: number) => {
      if (confirm("¿Estás seguro de eliminar este rango?")) {
          setRanks(prev => prev.filter(r => r.id !== id));
      }
  };
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
      { id: 'ranks', label: 'Rangos', icon: MdGrade },
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
                            onClick={() => setActiveTab(tab.id as 'general' | 'email' | 'ranks')}
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

            {activeTab === 'ranks' && (
                <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <MdGrade className="mr-2 text-golden-rod-500" />
                                Configuración de Rangos
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Define los rangos, colores y requisitos.</p>
                        </div>
                        <Button variant="primary" icon={<MdAdd />} onClick={() => handleOpenRankModal()}>
                            Agregar Rango
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rango</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cinturón</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Req. Meses</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ranks.sort((a,b) => a.sortOrder - b.sortOrder).map((rank) => (
                                    <tr key={rank.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rank.sortOrder}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{rank.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rank.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-8 h-4 rounded border border-gray-200 shadow-sm" 
                                                    style={{ backgroundColor: rank.colorCode }} 
                                                />
                                                <span className="text-xs text-gray-400 font-mono">{rank.colorCode}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rank.requirementMonths} meses</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleOpenRankModal(rank)}
                                                className="text-golden-rod-600 hover:text-golden-rod-900 mr-3"
                                            >
                                                <MdEdit className="text-lg" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteRank(rank.id)}
                                                className="text-red-400 hover:text-red-700"
                                            >
                                                <MdDelete className="text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
      </div>

      <Modal isOpen={isRankModalOpen} onClose={() => setIsRankModalOpen(false)} title={editingRank ? "Editar Rango" : "Nuevo Rango"}>
          <div className="space-y-4">
              <Input 
                  label="Nombre del Rango" 
                  value={rankFormData.name} 
                  onChange={(e) => setRankFormData({...rankFormData, name: e.target.value})}
                  placeholder="Ej: 10mo Kyu"
              />
              <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Tipo</label>
                      <Select 
                          options={[{ value: 'Kyu', label: 'Kyu' }, { value: 'Dan', label: 'Dan' }]}
                          value={rankFormData.type}
                          onChange={(val) => setRankFormData({...rankFormData, type: val as 'Kyu' | 'Dan'})}
                      />
                  </div>
                  <Input 
                      label="Número" 
                      type="number"
                      value={rankFormData.number} 
                      onChange={(e) => setRankFormData({...rankFormData, number: parseInt(e.target.value)})}
                  />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <Input 
                      label="Orden (Sort Order)" 
                      type="number"
                      value={rankFormData.sortOrder} 
                      onChange={(e) => setRankFormData({...rankFormData, sortOrder: parseInt(e.target.value)})}
                  />
                  <Input 
                      label="Meses Requeridos" 
                      type="number"
                      value={rankFormData.requirementMonths} 
                      onChange={(e) => setRankFormData({...rankFormData, requirementMonths: parseInt(e.target.value)})}
                  />
              </div>
              <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Color del Cinturón</label>
                  <div className="flex items-center gap-3">
                      <input 
                          type="color" 
                          value={rankFormData.colorCode} 
                          onChange={(e) => setRankFormData({...rankFormData, colorCode: e.target.value})}
                          className="h-10 w-20 rounded cursor-pointer"
                      />
                      <Input 
                          value={rankFormData.colorCode} 
                          onChange={(e) => setRankFormData({...rankFormData, colorCode: e.target.value})}
                          placeholder="#000000"
                          wrapperClassName="flex-1"
                      />
                  </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                  <Button variant="secondary" onClick={() => setIsRankModalOpen(false)}>Cancelar</Button>
                  <Button variant="primary" onClick={handleSaveRank}>Guardar</Button>
              </div>
          </div>
      </Modal>
    </div>
  );
}
