import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FaUser, FaChild, FaCheck, FaArrowRight, FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { Input } from "@/components/atoms/Input";
import { DateSelector } from "@/components/atoms/DateSelector";
import { Button } from "@/components/atoms/Button";
import { AdministracinRepresentantesApi, RangosApi } from "@/api-client";
import { getApiClient } from "@/utils/api-client";

export function meta({}: any) {
  return [{ title: "Crear Usuario - Minarai" }];
}

export default function CreateUser() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ranks, setRanks] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identificationNumber: "",
    dob: new Date().toISOString().split('T')[0],
    email: "",
    phone: "",
    password: "", // Optional
    userType: "parent", // "parent" or "adult"
    rankId: "1", // White belt default for adult student
    students: [] as Array<{
      id: number;
      firstName: string;
      lastName: string;
      identificationNumber: string;
      dob: string;
      phone: string;
      email: string;
      rankId: string;
    }>
  });

  useEffect(() => {
    const fetchRanks = async () => {
        try {
            const client = getApiClient(RangosApi);
            const response = await client.getRanksRaw();
            const data = await response.raw.json();
            const list = data.data || [];
            setRanks(list);
            if (list.length > 0) {
                setFormData(prev => ({ ...prev, rankId: list[0].id.toString() }));
            }
        } catch (e) {
            console.error("Error loading ranks:", e);
        }
    };
    fetchRanks();
  }, []);

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBasicDateChange = (value: Date | null) => {
    if (value) {
        setFormData(prev => ({ ...prev, dob: value.toISOString().split('T')[0] }));
    }
  };

  const addStudent = () => {
    if (formData.students.length >= 1) {
        Toastify({
            text: "Actualmente solo puedes registrar 1 alumno durante la creación del representante.",
            duration: 3000,
            gravity: "top", position: "right",
            style: { background: "#ffc107", color: "#000" },
        }).showToast();
        return;
    }
    setFormData(prev => ({
      ...prev,
      students: [
        ...prev.students,
        {
          id: Date.now(),
          firstName: "",
          lastName: "",
          identificationNumber: "",
          dob: new Date().toISOString().split('T')[0],
          phone: "",
          email: "",
          rankId: ranks[0]?.id?.toString() || "1"
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
    let finalValue: string | null = null;
    if (value instanceof Date) {
        finalValue = value.toISOString().split('T')[0];
    } else {
        finalValue = value;
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        const client = getApiClient(AdministracinRepresentantesApi);
        
        const payload: any = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            identificationNumber: formData.identificationNumber,
            identification_number: formData.identificationNumber,
            email: formData.email,
            dob: new Date(formData.dob),
            phone: formData.phone,
            password: formData.password || undefined,
        };

        if (formData.userType === 'adult') {
            payload.isAdultStudent = true;
            payload.is_adult_student = true;
            payload.rankId = Number(formData.rankId);
            payload.rank_id = Number(formData.rankId);
        } else {
            payload.createStudent = formData.students.length > 0;
            payload.create_student = formData.students.length > 0;
            if (formData.students.length > 0) {
                const student = formData.students[0];
                payload.student = {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    identificationNumber: student.identificationNumber || undefined,
                    identification_number: student.identificationNumber || undefined,
                    dob: new Date(student.dob),
                    phone: student.phone || undefined,
                    email: student.email || undefined,
                    rankId: Number(student.rankId),
                    rank_id: Number(student.rankId),
                };
            }
        }

        await client.storeRepresentative({ storeRepresentativeRequest: payload });
        
        Toastify({
          text: "Usuario creado satisfactoriamente",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
        }).showToast();
        
        setTimeout(() => {
            navigate("/dashboard/users");
        }, 1500);
    } catch (error: any) {
        console.error("Error creating user:", error);
        let errorMsg = "Error al crear el usuario. Verifica los datos.";
        
        try {
            const errData = await error.response.json();
            if (errData.message) errorMsg = errData.message;
        } catch (e) {}

        Toastify({
          text: errorMsg,
          duration: 4000,
          gravity: "top",
          position: "right",
          style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" },
        }).showToast();
        setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Información Básica", icon: FaUser },
    { number: 2, title: "Asignar Alumno", icon: FaChild },
    { number: 3, title: "Verificación", icon: FaCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto font-raleway animate-fade-in relative pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-bebas tracking-wide mb-2">Crear Nuevo Usuario</h1>
        <p className="text-gray-500 text-sm">Complete la información para registrar un nuevo usuario y su alumno.</p>
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
                    Información Personal del Representante
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                        label="Nombre"
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. Juan"
                    />
                    <Input 
                        label="Apellido"
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. Pérez"
                    />
                    <Input 
                        label="Número de Identificación"
                        name="identificationNumber" 
                        value={formData.identificationNumber} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. V-12345678"
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
                        label="Teléfono"
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleBasicInfoChange}
                        placeholder="Ej. +584141234567"
                    />
                    <div className="md:col-span-1">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                         <DateSelector 
                            selected={formData.dob ? new Date(formData.dob) : null}
                            onChange={handleBasicDateChange}
                         />
                    </div>
                    <Input 
                        label="Contraseña (Opcional)"
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleBasicInfoChange}
                        placeholder="Dejar en blanco para autogenerar"
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuario</label>
                        <select 
                            name="userType"
                            value={formData.userType}
                            onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value }))}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-rod-400 transition-all text-gray-900"
                        >
                            <option value="parent">Padre/Tutor</option>
                            <option value="adult">Alumno Adulto</option>
                        </select>
                    </div>
                </div>
            </div>
        )}

        {step === 2 && (
             <div className="animate-fade-in">
                {formData.userType === 'adult' ? (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-golden-rod-500 rounded-full"></span>
                            Rango / Cinturón Inicial del Alumno Adulto
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona tu Cinturón Inicial</label>
                            <select 
                                value={formData.rankId}
                                onChange={(e) => setFormData(prev => ({ ...prev, rankId: e.target.value }))}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-rod-400 transition-all text-gray-900"
                            >
                                {ranks.map((r: any) => (
                                    <option key={r.id} value={r.id.toString()}>{r.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-1 h-6 bg-golden-rod-500 rounded-full"></span>
                                Alumno Asociado
                            </h2>
                            <Button variant="secondary" icon={<FaPlus />} onClick={addStudent} disabled={formData.students.length >= 1}>
                                Agregar Alumno
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {formData.students.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    <FaChild className="text-4xl text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 mb-4">Puedes asociar un alumno inicialmente.</p>
                                    <Button variant="secondary" onClick={addStudent}>
                                        Agregar Alumno
                                    </Button>
                                </div>
                            ) : (
                                formData.students.map((student, index) => (
                                    <div key={student.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative group animate-fade-in">
                                        <button 
                                            onClick={() => removeStudent(student.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                        <h3 className="font-bold text-gray-700 mb-4 font-bebas tracking-wide">
                                            Alumno {index + 1}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input 
                                                label="Nombre"
                                                value={student.firstName}
                                                onChange={(e) => handleStudentChange(student.id, 'firstName', e.target.value)}
                                                placeholder="Nombre del alumno"
                                            />
                                            <Input 
                                                label="Apellido"
                                                value={student.lastName}
                                                onChange={(e) => handleStudentChange(student.id, 'lastName', e.target.value)}
                                                placeholder="Apellido del alumno"
                                            />
                                            <Input 
                                                label="Número de Identificación (Opcional)"
                                                value={student.identificationNumber}
                                                onChange={(e) => handleStudentChange(student.id, 'identificationNumber', e.target.value)}
                                                placeholder="Ej. V-12345678"
                                            />
                                            <div>
                                                 <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                                                 <DateSelector 
                                                    selected={student.dob ? new Date(student.dob) : null}
                                                    onChange={(date) => handleStudentChange(student.id, 'dob', date)}
                                                 />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Rango / Cinturón Inicial</label>
                                                <select 
                                                    value={student.rankId}
                                                    onChange={(e) => handleStudentChange(student.id, 'rankId', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-rod-400 transition-all text-gray-900"
                                                >
                                                    {ranks.map((r: any) => (
                                                        <option key={r.id} value={r.id.toString()}>{r.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
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
                                <dd className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Número de Identificación:</dt>
                                <dd className="font-bold text-gray-900">{formData.identificationNumber}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Email:</dt>
                                <dd className="font-bold text-gray-900">{formData.email}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Teléfono:</dt>
                                <dd className="font-bold text-gray-900">{formData.phone}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Nacimiento:</dt>
                                <dd className="font-bold text-gray-900">{formData.dob}</dd>
                            </div>
                        </dl>
                     </div>

                     <div className="space-y-4">
                         <h3 className="font-bebas text-lg text-gray-900 border-b border-gray-200 pb-2">Alumnos ({formData.userType === 'adult' ? 1 : formData.students.length})</h3>
                         {formData.userType === 'adult' ? (
                              <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                                 <div className="flex justify-between items-start">
                                     <div className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</div>
                                     <span className="text-xs bg-golden-rod-100 text-golden-rod-700 px-2 py-0.5 rounded">Alumno Adulto</span>
                                 </div>
                                 <div className="mt-2 text-xs text-gray-500 flex flex-col gap-1">
                                     <span>Cinturón Inicial: {ranks.find((r: any) => r.id.toString() === formData.rankId)?.name || ""}</span>
                                     <span>Identificación: {formData.identificationNumber}</span>
                                 </div>
                              </div>
                         ) : (
                             formData.students.map((student, idx) => (
                                  <div key={idx} className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                                     <div className="flex justify-between items-start">
                                         <div className="font-bold text-gray-900">{student.firstName} {student.lastName}</div>
                                         <span className="text-xs bg-golden-rod-100 text-golden-rod-700 px-2 py-0.5 rounded">Nuevo Ingreso</span>
                                     </div>
                                     <div className="mt-2 text-xs text-gray-500 flex flex-col gap-1">
                                         <span>Nacimiento: {student.dob}</span>
                                         <span>Cinturón Inicial: {ranks.find((r: any) => r.id.toString() === student.rankId)?.name || ""}</span>
                                         {student.identificationNumber && <span>Identificación: {student.identificationNumber}</span>}
                                     </div>
                                  </div>
                             ))
                         )}
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
                onClick={handleBack}
                icon={<FaArrowLeft />}
                className="hover:bg-gray-50 border-gray-300 text-gray-600"
                disabled={isSubmitting}
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
                className="flex-row-reverse bg-black-beauty-900 text-golden-rod-500 hover:bg-black-beauty-800"
                icon={<FaArrowRight />}
            >
                Siguiente
            </Button>
         ) : (
             <Button 
                variant="primary"
                onClick={handleSubmit}
                icon={<FaCheck />}
                className="flex-row-reverse bg-green-500 hover:bg-green-600 border-green-500 text-white shadow-green-500/30"
                disabled={isSubmitting}
             >
                {isSubmitting ? "Creando..." : "Verificar y Crear"}
            </Button>
         )}
      </div>
    </div>
  );
}
