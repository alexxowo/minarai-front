import { useState } from "react";
import type { Route } from "./+types/bulk-operations";
import { FaUserGraduate, FaTrophy, FaCheck, FaSearch, FaArrowRight, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { MdBolt, MdCheckCircle } from "react-icons/md";
import { Button } from "~/components/atoms/Button";
import { Input } from "~/components/atoms/Input";
import DashboardPlaceholder from "../../../components/pages/DashboardPlaceholder";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Operaciones Masivas - Minarai" }];
}

// Mock Data
const MOCK_STUDENTS = [
    { id: 1, name: "Juan Pérez", belt: "9no Kyu" },
    { id: 2, name: "María González", belt: "8vo Kyu" },
    { id: 3, name: "Carlos López", belt: "Sin Rango" },
    { id: 4, name: "Ana Martínez", belt: "7mo Kyu" },
    { id: 5, name: "Luis Rodríguez", belt: "6to Kyu" },
    { id: 6, name: "Sofía Hernández", belt: "1er Dan" },
];

const MOCK_ACHIEVEMENTS = [
    { id: 1, title: "Primer Examen", description: "Completó su primer examen de grado." },
    { id: 2, title: "Asistencia Perfecta", description: "Asistió a todas las clases del mes." },
    { id: 3, title: "Espíritu de Lucha", description: "Demostró gran actitud en el combate." },
    { id: 4, title: "Torneo Regional", description: "Participó en el torneo regional." },
];

export default function BulkOperations() {
  const [step, setStep] = useState(1);
  const [selectedOperation, setSelectedOperation] = useState<'achievements' | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentToggle = (id: number) => {
      setSelectedStudents(prev => 
          prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
  };

  const handleSelectAllStudents = () => {
      if (selectedStudents.length === filteredStudents.length) {
          setSelectedStudents([]);
      } else {
          setSelectedStudents(filteredStudents.map(s => s.id));
      }
  };

  const handleAchievementToggle = (id: number) => {
      setSelectedAchievements(prev => 
          prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
      );
  };

  const handleExecute = () => {
      // Mock execution
      console.log("Executing Bulk Operation:", {
          operation: selectedOperation,
          students: selectedStudents,
          achievements: selectedAchievements
      });
      alert(`Se han otorgado ${selectedAchievements.length} logros a ${selectedStudents.length} alumnos existosamente.`);
      // Reset
      setStep(1);
      setSelectedOperation(null);
      setSelectedStudents([]);
      setSelectedAchievements([]);
  };

  return (
    <div className="space-y-6 animate-fade-in font-raleway h-full flex flex-col pb-10">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide">Operaciones Masivas</h1>
           <p className="text-gray-500 text-sm">Ejecuta acciones sobre múltiples registros simultáneamente.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className={`px-2 py-1 rounded ${step === 1 ? 'bg-golden-rod-100 text-golden-rod-700 font-bold' : ''}`}>1. Operación</span>
            <span className="text-gray-300">/</span>
            <span className={`px-2 py-1 rounded ${step === 2 ? 'bg-golden-rod-100 text-golden-rod-700 font-bold' : ''}`}>2. Alumnos</span>
            <span className="text-gray-300">/</span>
            <span className={`px-2 py-1 rounded ${step === 3 ? 'bg-golden-rod-100 text-golden-rod-700 font-bold' : ''}`}>3. Logros</span>
            <span className="text-gray-300">/</span>
            <span className={`px-2 py-1 rounded ${step === 4 ? 'bg-golden-rod-100 text-golden-rod-700 font-bold' : ''}`}>4. Confirmar</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
          
          {/* STEP 1: Select Operation */}
          {step === 1 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Selecciona el tipo de operación</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                      <button 
                          onClick={() => setSelectedOperation('achievements')}
                          className={`
                              p-6 rounded-xl border-2 flex flex-col items-center text-center gap-4 transition-all
                              ${selectedOperation === 'achievements' 
                                  ? 'border-golden-rod-500 bg-golden-rod-50 shadow-md transform scale-105' 
                                  : 'border-gray-200 hover:border-golden-rod-300 hover:bg-gray-50'}
                          `}
                      >
                          <div className={`
                              h-16 w-16 rounded-full flex items-center justify-center text-2xl
                              ${selectedOperation === 'achievements' ? 'bg-golden-rod-200 text-golden-rod-700' : 'bg-gray-100 text-gray-400'}
                          `}>
                              <FaTrophy />
                          </div>
                          <div>
                              <h3 className="font-bold text-lg text-gray-900">Otorgar Logros</h3>
                              <p className="text-sm text-gray-500">Asigna medallas o reconocimientos a múltiples alumnos de una sola vez.</p>
                          </div>
                          {selectedOperation === 'achievements' && <FaCheckCircle className="text-golden-rod-500 text-xl" />}
                      </button>

                      {/* Placeholder for future operations */}
                      <button disabled className="p-6 rounded-xl border-2 border-gray-100 flex flex-col items-center text-center gap-4 opacity-50 cursor-not-allowed">
                          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-300">
                              <MdBolt />
                          </div>
                          <div>
                              <h3 className="font-bold text-lg text-gray-400">Próximamente</h3>
                              <p className="text-sm text-gray-400">Más operaciones masivas estarán disponibles pronto.</p>
                          </div>
                      </button>
                  </div>
              </div>
          )}

          {/* STEP 2: Select Students */}
          {step === 2 && (
              <div className="flex-1 flex flex-col space-y-4">
                  <h2 className="text-xl font-bold text-gray-800">Selecciona los alumnos</h2>
                  <div className="flex gap-4 mb-2">
                       <Input 
                          placeholder="Buscar alumno..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          wrapperClassName="flex-1"
                          icon={<FaSearch className="text-gray-400" />}
                       />
                       <Button variant="secondary" onClick={handleSelectAllStudents}>
                           {selectedStudents.length === filteredStudents.length ? "Deseleccionar Todos" : "Seleccionar Todos"}
                       </Button>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 overflow-y-auto max-h-[400px]">
                      <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                  <th className="px-6 py-3 text-left">
                                      <span className="sr-only">Select</span>
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rango Actual</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                              {filteredStudents.map(student => (
                                  <tr 
                                      key={student.id} 
                                      className={`hover:bg-gray-50 cursor-pointer ${selectedStudents.includes(student.id) ? 'bg-golden-rod-50/50' : ''}`}
                                      onClick={() => handleStudentToggle(student.id)}
                                  >
                                      <td className="px-6 py-4">
                                          <div className={`
                                              w-5 h-5 rounded border flex items-center justify-center transition-colors
                                              ${selectedStudents.includes(student.id) ? 'bg-golden-rod-500 border-golden-rod-500 text-white' : 'border-gray-300'}
                                          `}>
                                              {selectedStudents.includes(student.id) && <FaCheck className="text-xs" />}
                                          </div>
                                      </td>
                                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                                      <td className="px-6 py-4 text-sm text-gray-500">{student.belt}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                  <p className="text-right text-sm text-gray-500">Seleccionados: {selectedStudents.length}</p>
              </div>
          )}

          {/* STEP 3: Select Achievements */}
          {step === 3 && (
              <div className="flex-1 flex flex-col space-y-4">
                  <h2 className="text-xl font-bold text-gray-800">Selecciona los logros a otorgar</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px] p-1">
                      {MOCK_ACHIEVEMENTS.map(achievement => (
                          <div 
                              key={achievement.id}
                              onClick={() => handleAchievementToggle(achievement.id)}
                              className={`
                                  p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 relative overflow-hidden
                                  ${selectedAchievements.includes(achievement.id) 
                                      ? 'border-golden-rod-500 bg-golden-rod-50 shadow-md ring-1 ring-golden-rod-500' 
                                      : 'border-gray-200 hover:border-golden-rod-300 hover:bg-gray-50'}
                              `}
                          >
                              <div className={`
                                  flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                  ${selectedAchievements.includes(achievement.id) ? 'bg-golden-rod-200 text-golden-rod-700' : 'bg-gray-100 text-gray-400'}
                              `}>
                                  <FaTrophy />
                              </div>
                              <div>
                                  <h3 className="font-bold text-gray-900 line-clamp-1">{achievement.title}</h3>
                                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{achievement.description}</p>
                              </div>
                              {selectedAchievements.includes(achievement.id) && (
                                  <div className="absolute top-2 right-2 text-golden-rod-500">
                                      <FaCheckCircle />
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
                  <p className="text-right text-sm text-gray-500">Seleccionados: {selectedAchievements.length}</p>
              </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto w-full text-center">
                  <div className="w-16 h-16 rounded-full bg-golden-rod-100 text-golden-rod-600 flex items-center justify-center text-3xl mb-4">
                      <MdCheckCircle />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Confirmar Operación</h2>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full text-left space-y-4">
                      <div>
                          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Operación</p>
                          <p className="text-lg text-gray-900 flex items-center gap-2">
                              <FaTrophy className="text-golden-rod-500" /> Otorgar Logros
                          </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Alumnos ({selectedStudents.length})</p>
                              <ul className="mt-1 space-y-1 max-h-32 overflow-y-auto text-sm text-gray-700">
                                  {MOCK_STUDENTS.filter(s => selectedStudents.includes(s.id)).map(s => (
                                      <li key={s.id}>• {s.name}</li>
                                  ))}
                              </ul>
                          </div>
                          <div>
                              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Logros ({selectedAchievements.length})</p>
                              <ul className="mt-1 space-y-1 max-h-32 overflow-y-auto text-sm text-gray-700">
                                  {MOCK_ACHIEVEMENTS.filter(a => selectedAchievements.includes(a.id)).map(a => (
                                      <li key={a.id}>• {a.title}</li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <p className="text-sm text-gray-500">Esta acción no se puede deshacer fácilmente. Verifique la información antes de continuar.</p>
              </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-gray-100 flex justify-between mt-auto">
              <Button 
                  variant="secondary" 
                  disabled={step === 1} 
                  onClick={() => setStep(step - 1)}
                  icon={<FaArrowLeft />}
              >
                  Anterior
              </Button>
              
              {step < 4 ? (
                  <Button 
                      variant="primary" 
                      disabled={
                          (step === 1 && !selectedOperation) ||
                          (step === 2 && selectedStudents.length === 0) ||
                          (step === 3 && selectedAchievements.length === 0)
                      }
                      onClick={() => setStep(step + 1)}
                  >
                      Siguiente <FaArrowRight className="ml-2" />
                  </Button>
              ) : (
                  <Button 
                      variant="primary" 
                      onClick={handleExecute}
                  >
                      Confirmar y Ejecutar
                  </Button>
              )}
          </div>
      </div>
    </div>
  );
}
