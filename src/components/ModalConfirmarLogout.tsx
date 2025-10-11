import React from 'react';
import { LogoutIcon } from './icons/Icons';

interface ModalConfirmarLogoutProps {
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: () => void;
}

const ModalConfirmarLogout: React.FC<ModalConfirmarLogoutProps> = ({
  abierto,
  onCerrar,
  onConfirmar
}) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-slate-500 bg-opacity-75 " onClick={onCerrar} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
          {/* Header */}
          <div className="bg-white px-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Confirmar Cierre de Sesión
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <LogoutIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">
                  ¿Estás seguro de que quieres cerrar sesión? 
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Tendrás que iniciar sesión nuevamente para acceder al sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
            <button
              onClick={onCerrar}
              className="btn-secondary w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirmar}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 w-full sm:w-auto flex items-center justify-center"
            >
              <LogoutIcon className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarLogout;
