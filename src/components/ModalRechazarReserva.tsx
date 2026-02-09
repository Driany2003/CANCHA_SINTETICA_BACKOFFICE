import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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

  useEffect(() => {
    if (!abierto) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [abierto, onCerrar]);

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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-[#101f28] rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-600">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Rechazar reserva</h3>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4 border border-transparent dark:border-slate-600/50">
            <p className="font-semibold text-slate-900 dark:text-white">{reserva.nombreCliente}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {reserva.fecha} • {reserva.hora} • {reserva.cancha}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Motivo(s) de rechazo <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {MOTIVOS_RECHAZO.map((motivo) => (
                <label
                  key={motivo.id}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <input
                    type="checkbox"
                    checked={motivosSeleccionados.includes(motivo.id)}
                    onChange={() => toggleMotivo(motivo.id)}
                    className="rounded border-slate-300 dark:border-slate-600 text-red-600 focus:ring-red-500 dark:bg-slate-700"
                  />
                  <span className="text-slate-700 dark:text-slate-200">{motivo.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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

        <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-600">
          <button
            type="button"
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={motivosSeleccionados.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-[#101f28]"
          >
            Confirmar rechazo
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) as unknown as React.ReactElement | null;
};

export default ModalRechazarReserva;
