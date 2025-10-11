import React, { useState } from 'react';
import { Usuario, RolUsuario } from '../types/Usuario';
import { Local } from '../types/Empresa';
import { XIcon, UserIcon } from '../components/icons/Icons';

interface ModalCrearUsuarioProps {
  abierto: boolean;
  onCerrar: () => void;
  onCreate: (usuario: Omit<Usuario, 'id' | 'fechaCreacion'>) => void;
  locales: Local[];
}

const ModalCrearUsuario: React.FC<ModalCrearUsuarioProps> = ({
  abierto,
  onCerrar,
  onCreate,
  locales
}) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    email: '',
    telefono: '',
    rol: 'trabajador' as RolUsuario,
    localId: '',
    activo: true
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleInputChange = (campo: string, valor: any) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[campo]) {
      setErrores(prev => ({ ...prev, [campo]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    // Validar DNI
    if (!formData.dni.trim()) {
      nuevosErrores.dni = 'El DNI es requerido';
    } else if (!/^\d{8}$/.test(formData.dni.replace(/\D/g, ''))) {
      nuevosErrores.dni = 'El DNI debe tener exactamente 8 dígitos';
    }

    // Validar nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido';
    }

    // Validar teléfono
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!/^9\d{8}$/.test(formData.telefono.replace(/\D/g, ''))) {
      nuevosErrores.telefono = 'El teléfono debe empezar con 9 y tener 9 dígitos';
    }

    // Validar local para trabajadores
    if (formData.rol === 'trabajador' && !formData.localId) {
      nuevosErrores.localId = 'Debe seleccionar un local para trabajadores';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    const nuevoUsuario: Omit<Usuario, 'id' | 'fechaCreacion'> = {
      dni: formData.dni.replace(/\D/g, ''),
      nombre: formData.nombre.trim(),
      email: formData.email.trim().toLowerCase(),
      telefono: formData.telefono.replace(/\D/g, ''),
      rol: formData.rol,
      localId: formData.rol === 'trabajador' ? formData.localId : undefined,
      localNombre: formData.rol === 'trabajador' 
        ? locales.find(l => l.id === formData.localId)?.nombre 
        : undefined,
      activo: formData.activo
    };

    onCreate(nuevoUsuario);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormData({
      dni: '',
      nombre: '',
      email: '',
      telefono: '',
      rol: 'trabajador',
      localId: '',
      activo: true
    });
    setErrores({});
  };

  const handleCerrar = () => {
    limpiarFormulario();
    onCerrar();
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Crear Nuevo Usuario</h3>
          <button
            onClick={handleCerrar}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Información Principal */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Nuevo Usuario del Sistema</h2>
              <p className="text-slate-600 mt-1">
                Complete la información para crear un nuevo usuario
              </p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Información del Usuario</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* DNI */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    DNI *
                  </label>
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => {
                      const valor = e.target.value.replace(/\D/g, '');
                      if (valor.length <= 8) {
                        handleInputChange('dni', valor);
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errores.dni ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="12345678"
                    maxLength={8}
                  />
                  {errores.dni && (
                    <p className="text-red-600 text-xs mt-1">{errores.dni}</p>
                  )}
                </div>

                {/* Nombre Completo */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errores.nombre ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="Ej: Juan Pérez"
                    maxLength={50}
                  />
                  {errores.nombre && (
                    <p className="text-red-600 text-xs mt-1">{errores.nombre}</p>
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
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errores.email ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="usuario@empresa.com"
                    maxLength={100}
                  />
                  {errores.email && (
                    <p className="text-red-600 text-xs mt-1">{errores.email}</p>
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
                    onChange={(e) => {
                      const valor = e.target.value.replace(/\D/g, '');
                      if (valor.length <= 9) {
                        handleInputChange('telefono', valor);
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errores.telefono ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="987654321"
                    maxLength={9}
                  />
                  {errores.telefono && (
                    <p className="text-red-600 text-xs mt-1">{errores.telefono}</p>
                  )}
                </div>

                {/* Rol */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rol *
                  </label>
                  <select
                    value={formData.rol}
                    onChange={(e) => {
                      const nuevoRol = e.target.value as RolUsuario;
                      handleInputChange('rol', nuevoRol);
                      // Limpiar local si cambia a admin
                      if (nuevoRol === 'admin') {
                        handleInputChange('localId', '');
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="trabajador">Trabajador</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                {/* Local Asignado */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Local Asignado {formData.rol === 'trabajador' && '*'}
                  </label>
                  <select
                    value={formData.localId}
                    onChange={(e) => handleInputChange('localId', e.target.value)}
                    disabled={formData.rol === 'admin'}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      formData.rol === 'admin' ? 'bg-slate-100 cursor-not-allowed' : ''
                    } ${errores.localId ? 'border-red-300' : 'border-slate-300'}`}
                  >
                    <option value="">
                      {formData.rol === 'admin' ? 'No aplica para administradores' : 'Seleccionar local'}
                    </option>
                    {locales.map(local => (
                      <option key={local.id} value={local.id}>
                        {local.nombre}
                      </option>
                    ))}
                  </select>
                  {errores.localId && (
                    <p className="text-red-600 text-xs mt-1">{errores.localId}</p>
                  )}
                  {formData.rol === 'admin' && (
                    <p className="text-slate-500 text-xs mt-1">
                      Los administradores tienen acceso a todos los locales
                    </p>
                  )}
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={formData.activo.toString()}
                    onChange={(e) => handleInputChange('activo', e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={handleCerrar}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearUsuario;
