import React from 'react';
import { Reserva, EstadoReserva } from '../types/Reserva';

interface ModalVerReservaProps {
  reserva: Reserva | null;
  abierto: boolean;
  onCerrar: () => void;
  getEstadoColor: (estado: EstadoReserva) => string;
  getEstadoLabel: (estado: EstadoReserva) => string;
}

const ModalVerReserva: React.FC<ModalVerReservaProps> = ({
  reserva,
  abierto,
  onCerrar,
  getEstadoColor,
  getEstadoLabel
}) => {
  if (!abierto || !reserva) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Detalles de la Reserva</h3>
            </div>
            <button
              onClick={onCerrar}
              className="text-white hover:text-green-100 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-4">
          <div className="grid grid-cols-1 gap-3">
            
            {/* Información del Cliente */}
            <div className="bg-slate-50 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-xs">
                <div className="bg-white p-1 rounded-md mr-2 shadow-sm">
                  <svg className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Información del Cliente
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Nombre</p>
                  <p className="text-sm font-semibold text-slate-900 bg-white px-2 py-1.5 rounded-md border border-slate-200">
                    {reserva.nombreCliente}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Teléfono</p>
                  <p className="text-sm font-semibold text-slate-900 bg-white px-2 py-1.5 rounded-md border border-slate-200">
                    {reserva.telefono.replace(/-/g, '').startsWith('9') ? reserva.telefono.replace(/-/g, '').slice(0, 9) : '9' + reserva.telefono.replace(/-/g, '').slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-slate-50 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-xs">
                <div className="bg-white p-1 rounded-md mr-2 shadow-sm">
                  <svg className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Precio
              </h4>
              <div className="bg-white px-3 py-2 rounded-md border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 flex items-center">
                  💰 S/ {reserva.precio}
                </p>
              </div>
            </div>

            {/* Comprobante de Pago */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center text-base">
                <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
                  <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Comprobante de Pago
                <span className="ml-2 text-xs text-slate-500 font-normal">(Solo lectura)</span>
              </h4>
              
              {reserva.estado === 'pagado_confirmado' ? (
                <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-4 text-center">
                  <div className="text-green-600 mb-3">
                    <div className="bg-green-100 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-green-800 font-bold text-sm mb-3">✅ Comprobante Disponible</p>
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    📥 Descargar Comprobante
                  </button>
                  <p className="text-xs text-slate-500 mt-2">
                    💡 Solo el cliente puede modificar el comprobante
                  </p>
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-orange-300 rounded-lg p-4 text-center">
                  <div className="text-orange-600 mb-3">
                    <div className="bg-orange-100 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-orange-800 font-bold text-sm">⏳ Pago Pendiente</p>
                  <p className="text-orange-600 text-xs mt-1">El comprobante estará disponible después del pago</p>
                  <p className="text-xs text-slate-500 mt-2">
                    💡 Solo el cliente puede subir el comprobante
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVerReserva;
