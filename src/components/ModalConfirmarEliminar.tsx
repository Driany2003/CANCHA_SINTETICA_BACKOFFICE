import React from 'react';
import { Reserva } from '../types/Reserva';

interface ModalConfirmarEliminarProps {
  reserva: Reserva | null;
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: () => void;
}

const ModalConfirmarEliminar: React.FC<ModalConfirmarEliminarProps> = ({
  reserva,
  abierto,
  onCerrar,
  onConfirmar
}) => {
  if (!abierto || !reserva) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">¿Eliminar Reserva?</h3>
          <p className="text-slate-600 text-sm">
            Esta acción no se puede deshacer. Se eliminará permanentemente la reserva de:
          </p>
        </div>

        {/* Información de la Reserva */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="font-semibold text-slate-900 text-lg mb-2">{reserva.nombreCliente}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <span className="font-medium">Fecha:</span><br />
                {reserva.fecha}
              </div>
              <div>
                <span className="font-medium">Hora:</span><br />
                {reserva.hora}
              </div>
              <div>
                <span className="font-medium">Cancha:</span><br />
                {reserva.cancha}
              </div>
              <div>
                <span className="font-medium">Precio:</span><br />
                S/ {reserva.precio}
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            Sí, Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarEliminar;
