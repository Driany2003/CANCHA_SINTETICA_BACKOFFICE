import React from 'react';
import { Cliente } from '../types/Cliente';
import { XIcon, UserIcon, PhoneIcon, MailIcon } from '../components/icons/Icons';

interface ModalDetallesClienteProps {
  cliente: Cliente | null;
  abierto: boolean;
  onCerrar: () => void;
}

const ModalDetallesCliente: React.FC<ModalDetallesClienteProps> = ({
  cliente,
  abierto,
  onCerrar
}) => {
  if (!abierto || !cliente) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Detalles del Cliente</h3>
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

          {/* Información de Contacto */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Información de Contacto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Teléfono</p>
                  <p className="text-slate-900">{cliente.telefono}</p>
                </div>
              </div>
              {cliente.email && (
                <div className="flex items-center space-x-3">
                  <MailIcon className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Email</p>
                    <p className="text-slate-900">{cliente.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-slate-200">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallesCliente;
