import React from 'react';
import { Usuario } from '../types/Usuario';
import { XIcon, UserIcon, TrashIcon } from '../components/icons/Icons';

interface ModalConfirmarEliminarUsuarioProps {
  usuario: Usuario | null;
  abierto: boolean;
  onCerrar: () => void;
  onConfirmar: (usuarioId: string) => void;
}

const ModalConfirmarEliminarUsuario: React.FC<ModalConfirmarEliminarUsuarioProps> = ({
  usuario,
  abierto,
  onCerrar,
  onConfirmar
}) => {
  if (!abierto || !usuario) return null;

  const handleConfirmar = () => {
    onConfirmar(usuario.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Eliminar Usuario</h3>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Información del Usuario */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{usuario.nombre}</h2>
              <p className="text-slate-600 mt-1">
                {usuario.email} • {usuario.telefono}
              </p>
              <div className="mt-2 flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  usuario.rol === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {usuario.rol === 'admin' ? 'Administrador' : 'Trabajador'}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  usuario.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {usuario.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          </div>

          {/* Información del Local */}
          {usuario.localNombre && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Local Asignado</h4>
              <p className="text-slate-600">{usuario.localNombre}</p>
            </div>
          )}

          {/* Advertencia */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <TrashIcon className="h-5 w-5 text-red-600 mt-0.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-800 mb-2">
                  ¿Estás seguro de eliminar este usuario?
                </h4>
                <div className="text-sm text-red-700 space-y-1">
                  <p>Esta acción eliminará permanentemente:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>El usuario del sistema</li>
                    <li>Su información personal y de contacto</li>
                    <li>Su asignación al local</li>
                    <li>Su historial de acceso</li>
                  </ul>
                  <p className="font-semibold mt-2">Esta acción no se puede deshacer.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCerrar}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmar}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 flex items-center space-x-2"
            >
              <TrashIcon className="h-4 w-4" />
              <span>Eliminar Usuario</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarEliminarUsuario;
