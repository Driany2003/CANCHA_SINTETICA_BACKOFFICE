import React from 'react';
import { XIcon, BuildingOfficeIcon, TrashIcon } from './icons/Icons';
import { Local } from '../types/Empresa';

interface ModalConfirmarEliminarLocalProps {
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: () => void;
  local: Local | null;
}

const ModalConfirmarEliminarLocal: React.FC<ModalConfirmarEliminarLocalProps> = ({ 
  abierto, 
  onCerrar, 
  onConfirmar, 
  local 
}) => {
  if (!abierto || !local) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" onClick={onCerrar}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Eliminar Local</h3>
                  <p className="text-sm text-slate-600">Esta acción no se puede deshacer</p>
                </div>
              </div>
              <button
                onClick={onCerrar}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-6">
            {/* Información del Local */}
            <div className="flex items-start space-x-4">
              <div className="h-16 w-16 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <BuildingOfficeIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-900">{local.nombre}</h4>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Dirección:</span> {local.direccion}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Teléfono:</span> {local.telefono}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Email:</span> {local.email}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Estado:</span> 
                    <span className={`ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      local.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {local.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Advertencia */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <TrashIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    ¿Estás seguro de que quieres eliminar este local?
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Esta acción eliminará permanentemente:
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>La información del local</li>
                      <li>Todas las canchas asociadas a este local</li>
                      <li>Todas las reservas relacionadas con este local</li>
                    </ul>
                    <p className="mt-2 font-medium">
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
              <button
                onClick={onCerrar}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirmar}
                className="btn-danger flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Eliminar Local
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarEliminarLocal;
