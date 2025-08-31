import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  TimesCircleIcon, 
  EditIcon, 
  TrashIcon,
  PlusIcon
} from '../components/icons/Icons';
import { Cancha } from '../types/Reserva';

const Canchas: React.FC = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([
    {
      id: '1',
      nombre: 'Cancha 1',
      tipo: 'Fútbol 11',
      precioHora: 60,
      disponible: true
    },
    {
      id: '2',
      nombre: 'Cancha 2',
      tipo: 'Fútbol 11',
      precioHora: 60,
      disponible: false
    },
    {
      id: '3',
      nombre: 'Cancha 3',
      tipo: 'Fútbol 7',
      precioHora: 80,
      disponible: true
    }
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [canchaEditando, setCanchaEditando] = useState<Cancha | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    precioHora: 0,
    disponible: true
  });

  const tiposCancha = ['Fútbol 11', 'Fútbol 7', 'Fútbol 5', 'Paddle', 'Tenis'];

  const handleInputChange = (campo: string, valor: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      tipo: '',
      precioHora: 0,
      disponible: true
    });
    setCanchaEditando(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (canchaEditando) {
      // Editar cancha existente
      setCanchas(prev => prev.map(cancha => 
        cancha.id === canchaEditando.id 
          ? { ...cancha, ...formData }
          : cancha
      ));
    } else {
      // Crear nueva cancha
      const nuevaCancha: Cancha = {
        id: Date.now().toString(),
        ...formData
      };
      setCanchas(prev => [...prev, nuevaCancha]);
    }
    
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const editarCancha = (cancha: Cancha) => {
    setCanchaEditando(cancha);
    setFormData({
      nombre: cancha.nombre,
      tipo: cancha.tipo,
      precioHora: cancha.precioHora,
      disponible: cancha.disponible
    });
    setMostrarFormulario(true);
  };

  const eliminarCancha = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cancha?')) {
      setCanchas(prev => prev.filter(cancha => cancha.id !== id));
    }
  };

  const toggleDisponibilidad = (id: string) => {
    setCanchas(prev => prev.map(cancha => 
      cancha.id === id 
        ? { ...cancha, disponible: !cancha.disponible }
        : cancha
    ));
  };

  const getEstadoColor = (disponible: boolean) => {
    return disponible ? 'status-confirmed' : 'status-cancelled';
  };

  const getEstadoIcon = (disponible: boolean) => {
    return disponible ? '✅' : '❌';
  };

  const getEstadoLabel = (disponible: boolean) => {
    return disponible ? 'Disponible' : 'Ocupada';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Gestión de Canchas</h1>
              <p className="text-slate-600 mt-2">
                Administra el estado y configuración de las canchas del sistema
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{canchas.length}</p>
                  <p className="text-xs text-slate-500">Total Canchas</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {canchas.filter(c => c.disponible).length}
                  </p>
                  <p className="text-xs text-slate-500">Disponibles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="stat-icon bg-gradient-to-br from-blue-500 to-indigo-600">
                <span className="text-3xl">⚽</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">Total de Canchas</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">{canchas.length}</p>
                <p className="text-sm font-medium text-blue-600">+0%</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="stat-icon bg-gradient-to-br from-emerald-500 to-green-600">
                <span className="text-3xl">✅</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">Disponibles</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {canchas.filter(c => c.disponible).length}
                </p>
                <p className="text-sm font-medium text-green-600">+0%</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="stat-icon bg-gradient-to-br from-amber-500 to-orange-600">
                <span className="text-3xl">❌</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">Ocupadas</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {canchas.filter(c => !c.disponible).length}
                </p>
                <p className="text-sm font-medium text-orange-600">+0%</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="stat-icon bg-gradient-to-br from-purple-500 to-pink-600">
                <span className="text-3xl">💰</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">Precio Promedio</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  ${Math.round(canchas.reduce((sum, c) => sum + c.precioHora, 0) / canchas.length)}
                </p>
                <p className="text-sm font-medium text-purple-600">+0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Cancha */}
        {mostrarFormulario && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {canchaEditando ? 'Editar Cancha' : 'Nueva Cancha'}
              </h2>
              <button
                onClick={() => {
                  setMostrarFormulario(false);
                  limpiarFormulario();
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <TimesCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nombre de la Cancha *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="input-field"
                    placeholder="Ej: Cancha Principal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tipo de Cancha *
                  </label>
                  <select
                    required
                    value={formData.tipo}
                    onChange={(e) => handleInputChange('tipo', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Selecciona el tipo</option>
                    {tiposCancha.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Precio por Hora *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="10"
                      value={formData.precioHora}
                      onChange={(e) => handleInputChange('precioHora', parseInt(e.target.value))}
                      className="input-field pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estado
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="disponible"
                        checked={formData.disponible}
                        onChange={() => handleInputChange('disponible', true)}
                        className="mr-2 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-slate-700">Disponible</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="disponible"
                        checked={!formData.disponible}
                        onChange={() => handleInputChange('disponible', false)}
                        className="mr-2 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="text-slate-700">Ocupada</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-3 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    limpiarFormulario();
                  }}
                  className="btn-secondary flex items-center justify-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center"
                >
                  {canchaEditando ? (
                    <>
                      <EditIcon className="mr-2 h-5 w-5" />
                      Actualizar Cancha
                    </>
                  ) : (
                    <>
                      <PlusIcon className="mr-2 h-5 w-5" />
                      Crear Cancha
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Canchas */}
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Lista de Canchas</h2>
              <p className="text-slate-600">Administra todas las canchas del sistema</p>
            </div>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="btn-primary flex items-center justify-center"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Nueva Cancha
            </button>
          </div>
          
          <div className="overflow-hidden">
            {/* Tabla para desktop */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th className="table-header">Cancha</th>
                    <th className="table-header">Tipo</th>
                    <th className="table-header">Precio/Hora</th>
                    <th className="table-header">Estado</th>
                    <th className="table-header">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {canchas.map((cancha) => (
                    <tr key={cancha.id} className="table-row">
                      <td className="table-cell">
                        <div className="font-semibold text-slate-900">{cancha.nombre}</div>
                      </td>
                      <td className="table-cell text-slate-600">{cancha.tipo}</td>
                      <td className="table-cell font-bold text-slate-900">${cancha.precioHora}</td>
                      <td className="table-cell">
                        <span className={`status-badge ${getEstadoColor(cancha.disponible)}`}>
                          <span className="mr-2">{getEstadoIcon(cancha.disponible)}</span>
                          {getEstadoLabel(cancha.disponible)}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleDisponibilidad(cancha.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              cancha.disponible
                                ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                                : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                            }`}
                            title={cancha.disponible ? 'Marcar como ocupada' : 'Marcar como disponible'}
                          >
                            {cancha.disponible ? <TimesCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => editarCancha(cancha)}
                            className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                            title="Editar cancha"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => eliminarCancha(cancha.id)}
                            className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-200"
                            title="Eliminar cancha"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards para móvil */}
            <div className="md:hidden space-y-4">
              {canchas.map((cancha) => (
                <div key={cancha.id} className="card-hover">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{cancha.nombre}</h3>
                      <p className="text-slate-600">{cancha.tipo}</p>
                      <p className="font-bold text-slate-900 text-lg">${cancha.precioHora}/hora</p>
                    </div>
                    <span className={`status-badge ${getEstadoColor(cancha.disponible)}`}>
                      <span className="mr-2">{getEstadoIcon(cancha.disponible)}</span>
                      {getEstadoLabel(cancha.disponible)}
                    </span>
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => toggleDisponibilidad(cancha.id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        cancha.disponible
                          ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                          : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                      title={cancha.disponible ? 'Marcar como ocupada' : 'Marcar como disponible'}
                    >
                      {cancha.disponible ? <TimesCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => editarCancha(cancha)}
                      className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                      title="Editar cancha"
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => eliminarCancha(cancha.id)}
                      className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-200"
                      title="Eliminar cancha"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canchas;
