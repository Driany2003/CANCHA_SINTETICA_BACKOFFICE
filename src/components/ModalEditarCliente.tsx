import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/Cliente';
import { XIcon, UserIcon, PhoneIcon, MailIcon } from '../components/icons/Icons';

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
        nombre: cliente.nombre || '',
        telefono: cliente.telefono || '',
        email: cliente.email || ''
      });
    }
  }, [cliente]);

  if (!abierto || !cliente) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.nombre || formData.nombre.trim() === '') {
      alert('El nombre completo es obligatorio');
      return;
    }
    
    if (!formData.telefono || formData.telefono.trim() === '') {
      alert('El teléfono es obligatorio');
      return;
    }
    
    // Validar que el teléfono tenga exactamente 9 dígitos y empiece con 9
    const telefonoLimpio = formData.telefono.replace(/\D/g, ''); // Solo números
    if (telefonoLimpio.length !== 9 || !telefonoLimpio.startsWith('9')) {
      alert('El teléfono debe tener 9 dígitos y empezar con 9');
      return;
    }
    
    if (!formData.email || formData.email.trim() === '') {
      alert('El email es obligatorio');
      return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor ingrese un email válido');
      return;
    }
    
    const clienteEditado: Cliente = {
      ...cliente,
      nombre: formData.nombre.trim(),
      telefono: telefonoLimpio,
      email: formData.email.trim()
    };
    onGuardar(clienteEditado);
  };

  const handleInputChange = (campo: string, valor: string) => {
    let valorProcesado = valor;
    
    if (campo === 'telefono') {
      // Solo permitir números
      valorProcesado = valor.replace(/\D/g, '');
    } else if (campo === 'nombre') {
      // Solo permitir letras y espacios
      valorProcesado = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [campo]: valorProcesado }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información Principal */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{cliente.nombre}</h2>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Información de Contacto</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Solo letras y espacios"
                    required
                    maxLength={50}
                  />
                  <p className="text-xs text-slate-500 mt-1">Solo se permiten letras y espacios</p>
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
                    placeholder="9XXXXXXXX (9 dígitos)"
                    required
                    maxLength={9}
                  />
                  <p className="text-xs text-slate-500 mt-1">Debe empezar con 9 y tener 9 dígitos</p>
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Debe ser un correo electrónico válido</p>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6">
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
    </div>
  );
};

export default ModalEditarCliente;
