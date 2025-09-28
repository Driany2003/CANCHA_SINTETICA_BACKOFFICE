import React, { useState } from 'react';
import { XIcon, BuildingOfficeIcon } from './icons/Icons';
import { Local } from '../types/Empresa';

interface ModalCrearLocalProps {
  abierto: boolean;
  onCerrar: () => void;
  onCrear: (local: Omit<Local, 'id' | 'fechaCreacion' | 'empresaId'>) => void;
}

const ModalCrearLocal: React.FC<ModalCrearLocalProps> = ({ abierto, onCerrar, onCrear }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    activo: true
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleInputChange = (campo: string, valor: string | boolean) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre del local es requerido';
    } else if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es requerida';
    } else if (formData.direccion.trim().length < 10) {
      nuevosErrores.direccion = 'La dirección debe tener al menos 10 caracteres';
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!/^[0-9\s\-\(\)]+$/.test(formData.telefono)) {
      nuevosErrores.telefono = 'El teléfono solo puede contener números, espacios, guiones y paréntesis';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onCrear(formData);
      limpiarFormulario();
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      activo: true
    });
    setErrores({});
  };

  const handleCerrar = () => {
    limpiarFormulario();
    onCerrar();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" onClick={handleCerrar}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Nuevo Local</h3>
                  <p className="text-sm text-slate-600">Agregar un nuevo local a la empresa</p>
                </div>
              </div>
              <button
                onClick={handleCerrar}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre del Local */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre del Local *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  onFocus={handleFocus}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errores.nombre ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Ej: Complejo Deportivo Central - Sede Norte"
                />
                {errores.nombre && (
                  <p className="text-red-600 text-xs mt-1">{errores.nombre}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  onFocus={handleFocus}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errores.direccion ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Ej: Av. Túpac Amaru 456, Independencia, Lima"
                />
                {errores.direccion && (
                  <p className="text-red-600 text-xs mt-1">{errores.direccion}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  onFocus={handleFocus}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errores.telefono ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Ej: 01-345-6789"
                />
                {errores.telefono && (
                  <p className="text-red-600 text-xs mt-1">{errores.telefono}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={handleFocus}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errores.email ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Ej: norte@complejodeportivo.com"
                />
                {errores.email && (
                  <p className="text-red-600 text-xs mt-1">{errores.email}</p>
                )}
              </div>

              {/* Estado */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estado
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="activo"
                      checked={formData.activo === true}
                      onChange={() => handleInputChange('activo', true)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Activo</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="activo"
                      checked={formData.activo === false}
                      onChange={() => handleInputChange('activo', false)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700">Inactivo</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCerrar}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Crear Local
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearLocal;
