import React from 'react';
import { Cliente } from '../types/Cliente';
import { XIcon, TrashIcon, ExclamationTriangleIcon } from '../components/icons/Icons';

interface ModalConfirmarEliminarClienteProps {
  cliente: Cliente | null;
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: () => void;
}

const ModalConfirmarEliminarCliente: React.FC<ModalConfirmarEliminarClienteProps> = ({
  cliente,
  abierto,
  onCerrar,
  onConfirmar
}) => {
  if (!abierto || !cliente) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Confirmar Eliminación</h3>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-slate-900">¿Estás seguro?</h4>
              <p className="text-slate-600">Esta acción no se puede deshacer.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-700">
              Estás a punto de eliminar al cliente <strong>{cliente.nombre}</strong> 
              (DNI: {cliente.dni}) y toda su información asociada.
            </p>
          </div>

          <div className="text-sm text-slate-600 mb-6">
            <p><strong>Información que se eliminará:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Datos personales del cliente</li>
              <li>Historial de reservas</li>
              <li>Estadísticas y preferencias</li>
              <li>Notas y comentarios</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-slate-200">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 flex items-center space-x-2"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Eliminar Cliente</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarEliminarCliente;
