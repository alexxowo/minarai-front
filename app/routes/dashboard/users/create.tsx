import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaUser, FaChild, FaCheck, FaArrowRight, FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { Input } from "@/components/atoms/Input";
import { DateSelector } from "@/components/atoms/DateSelector";
import { Button } from "@/components/atoms/Button";

export function meta({}: any) {
  return [{ title: "Crear Usuario - Minarai" }];
}

export default function CreateUser() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    cedula: "",
    email: "",
    address: "",
    students: [] as Array<{
      id: number;
      name: string;
      surname: string;
      birthDate: string;
      joinDate: string;
    }>
  });

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = () => {
    setFormData(prev => ({
      ...prev,
      students: [
        ...prev.students,
        {
          id: Date.now(),
          name: "",
          surname: "",
          birthDate: "",
          joinDate: new Date().toISOString().split('T')[0]
        }
      ]
    }));
  };

  const removeStudent = (id: number) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id)
    }));
  };

  const handleStudentChange = (id: number, field: string, value: string | Date | null) => {
    let finalValue = value;
    if (value instanceof Date) {
        finalValue = value.toISOString().split('T')[0];
    }

    setFormData(prev => ({
      ...prev,
      students: prev.students.map(s => s.id === id ? { ...s, [field]: finalValue || '' } : s)
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    
    // Simulate successful creation with Toastify
    Toastify({
      text: "Usuario creado satisfactoriamente",
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){} // Callback after click
    }).showToast();
    
    // Navigate back after delay
    setTimeout(() => {
        navigate("/dashboard/users");
    }, 2000);
  };

  const steps = [
    { number: 1, title: "Información Básica", icon: FaUser },
    { number: 2, title: "Asignar Alumnos", icon: FaChild },
    { number: 3, title: "Verificación", icon: FaCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto font-raleway animate-fade-in relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide mb-2">Crear Nuevo Usuario</h1>
        <p className="text-gray-500 text-sm">Complete la información para registrar un nuevo usuario y sus alumnos.</p>
      </div>

      {/* Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative z-10">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex flex-col items-center flex-1 relative group">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-300 z-10 bg-white ${
                  step >= s.number 
                    ? "border-golden-rod-500 bg-golden-rod-500 text-black-beauty-900 shadow-lg shadow-golden-rod-500/30" 
                    : "border-gray-200 text-gray-300"
                }`}
              >
                <s.icon />
              </div>
              <span className={`mt-3 text-sm font-semibold transition-colors duration-300 ${
                  step >= s.number ? "text-gray-900" : "text-gray-400"
              }`}>
                {s.title}
              </span>
              
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className={`absolute top-6 left-1/2 w-full h-[2px] transition-colors duration-500 -z-10 ${
                    step > s.number ? "bg-golden-rod-500" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
        {step === 1 && (
            <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-golden-rod-500 rounded-full"></span>
                    Información Personal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                        label="Nombre"
                        name="name" 
                        value={formData.name} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. Juan"
                    />
                    <Input 
                        label="Apellido"
                        name="surname" 
                        value={formData.surname} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. Pérez"
                    />
                    <Input 
                        label="Cédula / ID"
                        name="cedula" 
                        value={formData.cedula} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. 12345678"
                    />
                    <Input 
                        label="Correo Electrónico"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. juan@example.com"
                    />
                    <Input 
                        label="Dirección"
                        name="address" 
                        value={formData.address} 
                        onChange={handleBasicInfoChange}
                        wrapperClassName="md:col-span-2"
                        placeholder="Ej. Av. Principal 123"
                    />
                </div>
            </div>
        )}

        {step === 2 && (
             <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                         <span className="w-1 h-6 bg-golden-rod-500 rounded-full"></span>
                        Alumnos Asociados
                    </h2>
                    <Button 
                        variant="secondary" 
                        onClick={addStudent}
                        icon={<FaPlus />}
                        type="button"
                    >
                        Agregar Alumno
                    </Button>
                </div>

                <div className="space-y-6">
                    {formData.students.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                            <FaChild className="mx-auto text-4xl text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">No hay alumnos asignados aún.</p>
                            <p className="text-xs text-gray-400">Haga clic en "Agregar Alumno" para comenzar.</p>
                        </div>
                    ) : (
                        formData.students.map((student, index) => (
                            <div key={student.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative group animate-fade-in-up">
                                <button 
                                    onClick={() => removeStudent(student.id)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2"
                                    title="Eliminar Alumno"
                                >
                                    <FaTrash />
                                </button>
                                <span className="absolute -top-3 left-4 bg-white px-3 py-1 text-xs font-bold text-gray-500 border border-gray-200 rounded-full shadow-sm">
                                    Alumno #{index + 1}
                                </span>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <Input 
                                        label="Nombre"
                                        value={student.name}
                                        onChange={(e) => handleStudentChange(student.id, 'name', e.target.value)}
                                        placeholder="Nombre del alumno"
                                    />
                                    <Input 
                                        label="Apellido"
                                        value={student.surname}
                                        onChange={(e) => handleStudentChange(student.id, 'surname', e.target.value)}
                                        placeholder="Apellido del alumno"
                                    />
                                    <DateSelector 
                                        label="Fecha de Nacimiento"
                                        selected={student.birthDate ? new Date(student.birthDate + 'T12:00:00') : null}
                                        onChange={(date) => handleStudentChange(student.id, 'birthDate', date)}
                                    />
                                    <DateSelector 
                                        label="Fecha de Ingreso"
                                        selected={student.joinDate ? new Date(student.joinDate + 'T12:00:00') : null}
                                        onChange={(date) => handleStudentChange(student.id, 'joinDate', date)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
             </div>
        )}

        {step === 3 && (
            <div className="animate-fade-in">
                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                    Verificación de Datos
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="font-bebas text-lg text-gray-900 border-b border-gray-200 pb-2 mb-4">Usuario</h3>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Nombre Completo:</dt>
                                <dd className="font-bold text-gray-900">{formData.name} {formData.surname}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Cédula:</dt>
                                <dd className="font-bold text-gray-900">{formData.cedula}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Email:</dt>
                                <dd className="font-bold text-gray-900">{formData.email}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Dirección:</dt>
                                <dd className="font-bold text-gray-900">{formData.address}</dd>
                            </div>
                        </dl>
                     </div>

                     <div className="space-y-4">
                        <h3 className="font-bebas text-lg text-gray-900 border-b border-gray-200 pb-2">Alumnos ({formData.students.length})</h3>
                        {formData.students.map((student, idx) => (
                             <div key={idx} className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-gray-900">{student.name} {student.surname}</div>
                                    <span className="text-xs bg-golden-rod-100 text-golden-rod-700 px-2 py-0.5 rounded">Nuevo Ingreso</span>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 flex gap-4">
                                    <span>Nacimiento: {student.birthDate}</span>
                                    <span>Ingreso: {student.joinDate}</span>
                                </div>
                             </div>
                        ))}
                     </div>
                </div>
            </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
         {step > 1 ? (
             <Button 
                variant="secondary"
                outlined
                onClick={handleBack}
                icon={<FaArrowLeft />}
                className="hover:bg-gray-50 border-gray-300 text-gray-600" // Overriding colors for neutral look
             >
                Anterior
             </Button>
         ) : (
            <div></div> // Spacer
         )}

         {step < 3 ? (
            <Button 
                variant="secondary"
                onClick={handleNext}
                className="flex-row-reverse"
                icon={<FaArrowRight />}
            >
                Siguiente
            </Button>
         ) : (
             <Button 
                variant="primary"
                onClick={handleSubmit}
                icon={<FaCheck />}
                className="flex-row-reverse"
             >
                Verificar y Crear
            </Button>
         )}
      </div>
    </div>
  );
}
