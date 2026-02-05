import React from 'react';
import { Reserva, EstadoReserva } from '../types/Reserva';
import { XIcon, ClockIcon, CurrencyDollarIcon } from '../components/icons/Icons';
import { MOTIVOS_RECHAZO } from './ModalRechazarReserva';

interface ModalVerReservaProps {
  reserva: Reserva | null;
  abierto: boolean;
  onCerrar: () => void;
  onAprobar?: (reservaId: string) => void;
  getEstadoColor: (estado: EstadoReserva) => string;
  getEstadoLabel: (estado: EstadoReserva) => string;
}

const ModalVerReserva: React.FC<ModalVerReservaProps> = ({
  reserva,
  abierto,
  onCerrar,
  onAprobar,
  getEstadoColor,
  getEstadoLabel
}) => {
  if (!abierto || !reserva) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Detalles de la Reserva</h3>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-4 space-y-4">
          {/* Información Principal */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">{reserva.nombreCliente}</h2>
              <p className="text-slate-600 text-sm">
                {reserva.telefono}
              </p>
            </div>
          </div>

          {/* Información de la Reserva */}
          <div className="bg-slate-50 rounded-lg p-3">
            <h4 className="text-base font-semibold text-slate-900 mb-3">Información de la Reserva</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Cancha */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cancha
                </label>
                <div className="flex items-center space-x-2 bg-white px-2 py-1.5 rounded-md border border-slate-200">
                  <span className="text-sm text-slate-900">{reserva.cancha}</span>
                </div>
              </div>

              {/* Hora */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Hora
                </label>
                <div className="flex items-center space-x-2 bg-white px-2 py-1.5 rounded-md border border-slate-200">
                  <ClockIcon className="h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-900">{reserva.hora}</span>
                </div>
              </div>

              {/* Duración */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Duración
                </label>
                <div className="flex items-center space-x-2 bg-white px-2 py-1.5 rounded-md border border-slate-200">
                  <span className="text-sm text-slate-900">{reserva.duracion} hora{reserva.duracion !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Precio
                </label>
                <div className="flex items-center space-x-2 bg-white px-2 py-1.5 rounded-md border border-slate-200">
                  <CurrencyDollarIcon className="h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-900">S/ {reserva.precio}</span>
                </div>
              </div>
            </div>
          </div>

          {reserva.estado === 'rechazado' && (reserva.motivoRechazo?.length || reserva.observacionRechazo) && (
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <h4 className="text-base font-semibold text-red-900 mb-2">Motivo(s) de rechazo</h4>
              {reserva.motivoRechazo?.length ? (
                <ul className="list-disc list-inside text-sm text-red-800 space-y-1 mb-2">
                  {reserva.motivoRechazo.map((id) => (
                    <li key={id}>{MOTIVOS_RECHAZO.find((m) => m.id === id)?.label ?? id}</li>
                  ))}
                </ul>
              ) : null}
              {reserva.observacionRechazo && (
                <p className="text-sm text-red-700 mt-2">
                  <span className="font-medium">Observación:</span> {reserva.observacionRechazo}
                </p>
              )}
            </div>
          )}

          {/* Comprobante de Pago */}
          <div className="bg-slate-50 rounded-lg p-3">
            <h4 className="text-base font-semibold text-slate-900 mb-3">Comprobante de Pago</h4>
            
            {reserva.estado === 'pagado_confirmado' ? (
              <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-4 text-center">
                <div className="text-green-600 mb-3">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-green-800 font-bold text-sm">Pago Confirmado</p>
              </div>
            ) : reserva.origen === 'web' ? (
              <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-2">
                    <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-green-800 font-bold text-sm">Comprobante de Pago Recibido</p>
                  <p className="text-green-600 text-xs mt-1">Verificar monto y confirmar pago</p>
                </div>
                
                {/* Imagen del comprobante */}
                <div className="mb-3">
                  <img 
                    src="https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Comprobante+de+Pago" 
                    alt="Comprobante de pago" 
                    className="w-full h-32 object-cover rounded-lg border border-slate-200"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-orange-300 rounded-lg p-4 text-center">
                <div className="text-orange-600 mb-3">
                  <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-orange-800 font-bold text-sm">Pago Pendiente</p>
                <p className="text-orange-600 text-xs mt-1">Reserva local - pago en efectivo</p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCerrar}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Cerrar
            </button>
            {reserva.origen === 'web' && reserva.estado === 'pendiente_de_pago' && onAprobar && (
              <button
                onClick={() => onAprobar(reserva.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Aprobar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVerReserva;
