import React, { useState, useEffect } from 'react';
import { Reserva, EstadoReserva } from '../types/Reserva';

interface ModalEditarReservaProps {
  reserva: Reserva | null;
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (reservaEditada: Reserva) => void;
  getEstadoColor: (estado: EstadoReserva) => string;
  getEstadoLabel: (estado: EstadoReserva) => string;
}

const ModalEditarReserva: React.FC<ModalEditarReservaProps> = ({
  reserva,
  abierto,
  onCerrar,
  onGuardar,
  getEstadoColor,
  getEstadoLabel
}) => {
  const [reservaEditada, setReservaEditada] = useState<Partial<Reserva>>({});
  const [canchas] = useState(['Cancha 1', 'Cancha 2', 'Cancha 3']);
  const [estados] = useState<EstadoReserva[]>(['pendiente_de_pago', 'pagado_confirmado']);

  useEffect(() => {
    if (reserva) {
      setReservaEditada(reserva);
    }
  }, [reserva]);

  const calcularHoraFin = (horaInicio: string, duracion: number): string => {
    const [hora, minuto] = horaInicio.split(':').map(Number);
    const horaFin = hora + duracion;
    return `${horaFin.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
  };

  const calcularPrecioTotal = (duracion: number): number => {
    return duracion * 50;
  };

  const handleInputChange = (campo: keyof Reserva, valor: any) => {
    setReservaEditada(prev => {
      const nuevo = { ...prev, [campo]: valor };
      
      if (campo === 'duracion') {
        nuevo.precio = calcularPrecioTotal(valor);
      }
      
      return nuevo;
    });
  };

  const guardarCambios = () => {
    if (reservaEditada && reserva) {
      const reservaCompleta: Reserva = {
        ...reserva,
        ...reservaEditada
      };
      onGuardar(reservaCompleta);
      onCerrar();
    }
  };

  if (!abierto || !reserva) return null;

  // Solo permitir editar si el estado es pendiente_de_pago
  if (reserva.estado !== 'pendiente_de_pago') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No se puede editar</h3>
          <p className="text-slate-600 mb-4">
            Solo se pueden editar reservas con estado "Pendiente de Pago"
          </p>
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Editar Reserva</h3>
              <p className="text-sm text-blue-100 mt-1">{reserva.nombreCliente}</p>
            </div>
            <button
              onClick={onCerrar}
              className="text-white hover:text-blue-100 transition-colors duration-200"
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
            
            {/* Fecha y Hora */}
            <div className="bg-slate-50 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-xs">
                <div className="bg-white p-1 rounded-md mr-2 shadow-sm">
                  <svg className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 0 002 2z" />
                  </svg>
                </div>
                Fecha y Hora
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Fecha</p>
                  <input
                    type="date"
                    value={reservaEditada?.fecha || ''}
                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Hora Inicio</p>
                  <input
                    type="time"
                    value={reservaEditada?.hora || ''}
                    onChange={(e) => handleInputChange('hora', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Duración</p>
                  <select
                    value={reservaEditada?.duracion || 1}
                    onChange={(e) => handleInputChange('duracion', parseInt(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value={1}>1h</option>
                    <option value={2}>2h</option>
                    <option value={3}>3h</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cancha y Estado */}
            <div className="bg-slate-50 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-xs">
                <div className="bg-white p-1 rounded-md mr-2 shadow-sm">
                  <svg className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                Cancha y Estado
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Cancha</p>
                  <select
                    value={reservaEditada?.cancha || ''}
                    onChange={(e) => handleInputChange('cancha', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    {canchas.map(cancha => (
                      <option key={cancha} value={cancha}>{cancha}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">Estado</p>
                  <select
                    value={reservaEditada?.estado || 'pendiente_de_pago'}
                    onChange={(e) => handleInputChange('estado', e.target.value as EstadoReserva)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{getEstadoLabel(estado)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Precio Calculado */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center text-xs">
                <div className="bg-white p-1 rounded-md mr-2 shadow-sm">
                  <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Precio Calculado
              </h4>
              <div className="bg-white px-3 py-2 rounded-md border border-blue-200 text-center">
                <p className="text-sm font-semibold text-blue-700">
                  💰 {reservaEditada?.duracion || 1}h × S/ 50 = S/ {calcularPrecioTotal(reservaEditada?.duracion || 1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con Botones */}
        <div className="bg-slate-50 px-4 py-3 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={guardarCambios}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarReserva;
