import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';
import { XIcon } from '../components/icons/Icons';

interface ModalEditarClienteProps {
  cliente: Cliente | null;
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (clienteEditado: Cliente) => void;
}

const ModalEditarCliente: React.FC<ModalEditarClienteProps> = ({
  cliente,
  abierto,
  onCerrar,
  onGuardar
}) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        dni: cliente.dni || '',
        nombre: cliente.nombre || '',
        telefono: cliente.telefono || '',
        email: cliente.email || '',
        estado: cliente.estado || 'activo'
      });
    }
  }, [cliente]);

  if (!abierto || !cliente) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre && formData.telefono && formData.dni) {
      const clienteEditado: Cliente = {
        ...cliente,
        dni: formData.dni,
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.email || '',
        estado: formData.estado || 'activo'
      };
      onGuardar(clienteEditado);
    }
  };

  const handleInputChange = (campo: string, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Editar Cliente</h3>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* DNI */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              DNI *
            </label>
            <input
              type="text"
              value={formData.dni || ''}
              onChange={(e) => handleInputChange('dni', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ingrese el DNI"
              required
            />
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              value={formData.nombre || ''}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ingrese el nombre completo"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.telefono || ''}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ingrese el teléfono"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ingrese el email (opcional)"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Estado *
            </label>
            <select
              value={formData.estado || 'activo'}
              onChange={(e) => handleInputChange('estado', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarCliente;
