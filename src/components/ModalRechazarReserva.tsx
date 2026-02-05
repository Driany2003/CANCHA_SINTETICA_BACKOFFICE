import React, { useState, useEffect } from 'react';
import { Reserva } from '../types/Reserva';
import { XIcon } from './icons/Icons';

export const MOTIVOS_RECHAZO = [
  { id: 'pago_falso', label: 'Pago falso' },
  { id: 'imagen_no_legible', label: 'Imagen no legible' },
  { id: 'documento_vencido', label: 'Documento vencido' },
  { id: 'datos_incorrectos', label: 'Datos incorrectos' },
  { id: 'otro', label: 'Otro' },
] as const;

interface ModalRechazarReservaProps {
  reserva: Reserva | null;
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: (reserva: Reserva) => void;
}

const ModalRechazarReserva: React.FC<ModalRechazarReservaProps> = ({
  reserva,
  abierto,
  onCerrar,
  onConfirmar,
}) => {
  const [motivosSeleccionados, setMotivosSeleccionados] = useState<string[]>([]);
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    if (!abierto) {
      setMotivosSeleccionados([]);
      setObservacion('');
    }
  }, [abierto]);

  const toggleMotivo = (id: string) => {
    setMotivosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleConfirmar = () => {
    if (!reserva || motivosSeleccionados.length === 0) return;
    const reservaActualizada: Reserva = {
      ...reserva,
      estado: 'rechazado',
      motivoRechazo: motivosSeleccionados,
      observacionRechazo: observacion.trim() || undefined,
    };
    onConfirmar(reservaActualizada);
    onCerrar();
  };

  if (!abierto || !reserva) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Rechazar reserva</h3>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="font-semibold text-slate-900">{reserva.nombreCliente}</p>
            <p className="text-sm text-slate-600 mt-1">
              {reserva.fecha} • {reserva.hora} • {reserva.cancha}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Motivo(s) de rechazo <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {MOTIVOS_RECHAZO.map((motivo) => (
                <label
                  key={motivo.id}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={motivosSeleccionados.includes(motivo.id)}
                    onChange={() => toggleMotivo(motivo.id)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-slate-700">{motivo.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Observaciones (opcional)
            </label>
            <textarea
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej: el comprobante no corresponde a la reserva..."
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={motivosSeleccionados.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar rechazo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRechazarReserva;
