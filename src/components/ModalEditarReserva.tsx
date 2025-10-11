import React, { useState, useEffect } from 'react';
import { Reserva, EstadoReserva } from '../types/Reserva';
import { XIcon, UserIcon } from '../components/icons/Icons';

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

  // Función para calcular hora fin (comentada porque no se usa actualmente)
  // const calcularHoraFin = (horaInicio: string, duracion: number): string => {
  //   const [hora, minuto] = horaInicio.split(':').map(Number);
  //   const horaFin = hora + duracion;
  //   return `${horaFin.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
  // };

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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Editar Reserva</h3>
          <button onClick={onCerrar} className="text-slate-400 hover:text-slate-600 transition-colors duration-200">
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
              <h2 className="text-2xl font-bold text-slate-900">{reserva.nombreCliente}</h2>
              <p className="text-slate-600 mt-1">
                {reserva.telefono} • {reserva.email}
              </p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={(e) => { e.preventDefault(); guardarCambios(); }}>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Información de la Reserva</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={reservaEditada?.fecha || ''}
                    onChange={(e) => handleInputChange('fecha', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                {/* Hora */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hora *
                  </label>
                  <input
                    type="time"
                    value={reservaEditada?.hora || ''}
                    onChange={(e) => handleInputChange('hora', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                {/* Duración */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duración *
                  </label>
                  <select
                    value={reservaEditada?.duracion || 1}
                    onChange={(e) => handleInputChange('duracion', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value={1}>1 hora</option>
                    <option value={2}>2 horas</option>
                    <option value={3}>3 horas</option>
                  </select>
                </div>

                {/* Cancha */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cancha *
                  </label>
                  <select
                    value={reservaEditada?.cancha || ''}
                    onChange={(e) => handleInputChange('cancha', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    {canchas.map(cancha => (
                      <option key={cancha} value={cancha}>{cancha}</option>
                    ))}
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estado *
                  </label>
                  <select
                    value={reservaEditada?.estado || 'pendiente_de_pago'}
                    onChange={(e) => handleInputChange('estado', e.target.value as EstadoReserva)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{getEstadoLabel(estado)}</option>
                    ))}
                  </select>
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Precio Total
                  </label>
                  <div className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-slate-700">
                    S/ {calcularPrecioTotal(reservaEditada?.duracion || 1)}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {reservaEditada?.duracion || 1}h × S/ 50
                  </p>
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

export default ModalEditarReserva;
