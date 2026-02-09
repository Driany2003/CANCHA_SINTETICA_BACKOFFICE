import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
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
  useEffect(() => {
    if (!abierto) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [abierto, onCerrar]);

  if (!abierto || !reserva) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-[#101f28] rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-slate-200 dark:border-slate-600">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">¿Eliminar Reserva?</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Esta acción no se puede deshacer. Se eliminará permanentemente la reserva de:
          </p>
        </div>

        {/* Información de la Reserva */}
        <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4 mb-6 border border-transparent dark:border-slate-600/50">
          <div className="text-center">
            <p className="font-semibold text-slate-900 dark:text-white text-lg mb-2">{reserva.nombreCliente}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
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
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-[#101f28] transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-[#101f28] transition-colors duration-200"
          >
            Sí, Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) as React.ReactElement | null;
};

export default ModalConfirmarEliminar;
