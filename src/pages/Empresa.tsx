import React, { useState, useMemo } from 'react';
import { PlusIcon, EditIcon, TrashIcon, BuildingOfficeIcon, MapPinIcon, PhoneIcon, MailIcon, SearchIcon, FilterIcon, DownloadIcon } from '../components/icons/Icons';
import { Local, FiltrosLocal } from '../types/Empresa';
import ModalCrearLocal from '../components/ModalCrearLocal';
import ModalEditarLocal from '../components/ModalEditarLocal';
import ModalConfirmarEliminarLocal from '../components/ModalConfirmarEliminarLocal';

const Empresa: React.FC = () => {
  // Estados para la empresa
  const [empresa] = useState({
    id: '1',
    nombreComercial: 'Complejo Deportivo Central',
    ruc: '20123456789',
    fechaCreacion: '2024-01-01'
  });

  // Estados para locales
  const [locales, setLocales] = useState<Local[]>([
    {
      id: '1',
      nombre: 'Complejo Deportivo Central - Sede Principal',
      direccion: 'Av. Deportiva 123, San Isidro, Lima',
      telefono: '01-234-5678',
      email: 'principal@complejodeportivo.com',
      activo: true,
      fechaCreacion: '2024-01-01',
      empresaId: '1'
    },
    {
      id: '2',
      nombre: 'Complejo Deportivo Central - Sede Norte',
      direccion: 'Av. Túpac Amaru 456, Independencia, Lima',
      telefono: '01-345-6789',
      email: 'norte@complejodeportivo.com',
      activo: true,
      fechaCreacion: '2024-01-15',
      empresaId: '1'
    },
    {
      id: '3',
      nombre: 'Complejo Deportivo Central - Sede Sur',
      direccion: 'Av. Javier Prado 789, Surco, Lima',
      telefono: '01-456-7890',
      email: 'sur@complejodeportivo.com',
      activo: false,
      fechaCreacion: '2024-02-01',
      empresaId: '1'
    }
  ]);

  // Estados para filtros
  const [filtros, setFiltros] = useState<FiltrosLocal>({
    activo: undefined,
    busqueda: ''
  });

  // Estados para modales
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [localEditando, setLocalEditando] = useState<Local | null>(null);
  const [localEliminar, setLocalEliminar] = useState<Local | null>(null);
  const [mostrarFiltrosTabla, setMostrarFiltrosTabla] = useState(false);

  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  // Filtrar locales
  const localesFiltrados = useMemo(() => {
    return locales.filter(local => {
      const coincideBusqueda = !filtros.busqueda || 
        local.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        local.direccion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        local.telefono.includes(filtros.busqueda) ||
        local.email.toLowerCase().includes(filtros.busqueda.toLowerCase());
      
      const coincideEstado = filtros.activo === undefined || local.activo === filtros.activo;
      
      return coincideBusqueda && coincideEstado;
    });
  }, [locales, filtros]);

  // Paginación
  const localesPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    return localesFiltrados.slice(inicio, inicio + elementosPorPagina);
  }, [localesFiltrados, paginaActual]);

  const totalPaginas = Math.ceil(localesFiltrados.length / elementosPorPagina);

  // Funciones para manejar filtros
  const handleFiltroChange = (campo: keyof FiltrosLocal, valor: string | boolean | undefined) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
    setPaginaActual(1);
  };

  const limpiarFiltros = () => {
    setFiltros({ activo: undefined, busqueda: '' });
    setPaginaActual(1);
  };

  // Funciones para CRUD de locales
  const crearLocal = (nuevoLocal: Omit<Local, 'id' | 'fechaCreacion' | 'empresaId'>) => {
    const local: Local = {
      ...nuevoLocal,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString(),
      empresaId: empresa.id
    };
    setLocales(prev => [...prev, local]);
    setModalCrearAbierto(false);
  };

  const editarLocal = (localActualizado: Local) => {
    setLocales(prev => prev.map(local => 
      local.id === localActualizado.id ? localActualizado : local
    ));
    setModalEditarAbierto(false);
    setLocalEditando(null);
  };

  const eliminarLocal = (localId: string) => {
    setLocales(prev => prev.filter(local => local.id !== localId));
    setModalEliminarAbierto(false);
    setLocalEliminar(null);
  };

  // Funciones para abrir modales
  const abrirModalEdicion = (local: Local) => {
    setLocalEditando(local);
    setModalEditarAbierto(true);
  };

  const abrirModalEliminar = (local: Local) => {
    setLocalEliminar(local);
    setModalEliminarAbierto(true);
  };

  // Funciones para obtener colores y etiquetas
  const getEstadoColor = (activo: boolean) => {
    return activo 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getEstadoLabel = (activo: boolean) => {
    return activo ? 'Activo' : 'Inactivo';
  };

  const exportarLocales = () => {
    const headers = ['Nombre', 'Dirección', 'Teléfono', 'Email', 'Estado', 'Fecha Creación'];
    const filas = localesFiltrados.map((l) => [
      l.nombre,
      l.direccion,
      l.telefono,
      l.email,
      getEstadoLabel(l.activo),
      typeof l.fechaCreacion === 'string' ? l.fechaCreacion : new Date(l.fechaCreacion).toISOString().slice(0, 10)
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...filas.map((f) => f.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `locales_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 px-8 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gestión de Empresa</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Administra la información de la empresa y sus locales
          </p>
        </div>
      </div>

      {/* Información de la Empresa */}
      <div className="card">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{empresa.nombreComercial}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">RUC: {empresa.ruc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Locales */}
      <div className="card py-5 px-8">
        {/* Fila 1: Título a la izquierda, Export y Nuevo Local a la derecha */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200 -mx-8 px-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Lista de Locales</h2>
            <p className="text-sm text-gray-500 mt-0.5">Administra los locales disponibles en el sistema</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={exportarLocales}
              className="inline-flex items-center justify-center gap-2 px-4 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              style={{ minHeight: '48px', paddingTop: '12px', paddingBottom: '12px' }}
              title="Exportar locales"
            >
              <DownloadIcon className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => setModalCrearAbierto(true)}
              className="inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
              style={{ minHeight: '48px', paddingTop: '12px', paddingBottom: '12px' }}
            >
              <PlusIcon className="h-4 w-4" />
              Nuevo Local
            </button>
          </div>
        </div>

        {/* Fila 2: Buscador a la izquierda, Filter a la derecha */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 pb-2">
          <div className="relative w-full sm:max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filtros.busqueda}
              onChange={(e) => {
                handleFiltroChange('busqueda', e.target.value);
                setPaginaActual(1);
              }}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="button"
            onClick={() => setMostrarFiltrosTabla((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-200 transition-colors hover:bg-gray-50 dark:hover:bg-slate-600 flex-shrink-0 ${
              mostrarFiltrosTabla ? 'ring-2 ring-green-500 border-green-500' : ''
            }`}
            title={mostrarFiltrosTabla ? 'Ocultar filtros' : 'Mostrar filtros por columna'}
          >
            <FilterIcon className="h-4 w-4" />
            Filter
          </button>
        </div>

        {/* Tabla Desktop */}
        <div className="overflow-hidden -mx-8 pt-2">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header pl-8">Local</th>
                <th className="table-header">Contacto</th>
                <th className="table-header">Estado</th>
                <th className="table-header">Fecha Creación</th>
                <th className="table-header text-center w-32 pr-8">Acciones</th>
              </tr>
            </thead>
            {mostrarFiltrosTabla && (
              <tbody className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <td className="px-6 py-3 align-top pl-8">
                    <div className="relative">
                      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={filtros.busqueda}
                        onChange={(e) => { handleFiltroChange('busqueda', e.target.value); setPaginaActual(1); }}
                        placeholder="Nombre, dirección..."
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-3 align-top">—</td>
                  <td className="px-6 py-3 align-top">
                    <select
                      value={filtros.activo === undefined ? '' : filtros.activo.toString()}
                      onChange={(e) => { handleFiltroChange('activo', e.target.value === '' ? undefined : e.target.value === 'true'); setPaginaActual(1); }}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Todos</option>
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 align-top">—</td>
                  <td className="px-6 py-3 align-top pr-8 text-center">—</td>
                </tr>
              </tbody>
            )}
            <tbody className="bg-white divide-y divide-gray-200">
              {localesPaginados.map((local) => (
                <tr key={local.id} className="table-row">
                  <td className="table-cell pl-8">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{local.nombre}</div>
                        <div className="text-xs text-slate-500 flex items-center mt-1">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {local.direccion}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-slate-900">
                      <div className="flex items-center mb-1">
                        <PhoneIcon className="h-4 w-4 mr-2 text-slate-400" />
                        {local.telefono}
                      </div>
                      <div className="flex items-center">
                        <MailIcon className="h-4 w-4 mr-2 text-slate-400" />
                        {local.email}
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(local.activo)}`}>
                      {getEstadoLabel(local.activo)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-slate-500">
                      {new Date(local.fechaCreacion).toLocaleDateString('es-PE')}
                    </div>
                  </td>
                  <td className="table-cell pr-8 text-center w-32">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => abrirModalEdicion(local)}
                        className="inline-flex items-center justify-center p-2.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-600"
                        title="Editar local"
                      >
                        <EditIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => abrirModalEliminar(local)}
                        className="inline-flex items-center justify-center p-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600"
                        title="Eliminar local"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Cards Móviles */}
        <div className="md:hidden space-y-4 p-6">
          {localesPaginados.map((local) => (
            <div key={local.id} className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{local.nombre}</h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-1">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {local.direccion}
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(local.activo)}`}>
                  {getEstadoLabel(local.activo)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <PhoneIcon className="h-4 w-4 mr-2 text-slate-400" />
                  {local.telefono}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MailIcon className="h-4 w-4 mr-2 text-slate-400" />
                  {local.email}
                </div>
                <div className="text-sm text-slate-500">
                  Creado: {new Date(local.fechaCreacion).toLocaleDateString('es-PE')}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => abrirModalEdicion(local)}
                  className="btn-secondary flex-1 flex items-center justify-center"
                >
                  <EditIcon className="h-4 w-4 mr-2" />
                  Editar
                </button>
                <button
                  onClick={() => abrirModalEliminar(local)}
                  className="btn-danger flex-1 flex items-center justify-center"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="px-6 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-700">
                Mostrando {((paginaActual - 1) * elementosPorPagina) + 1} a {Math.min(paginaActual * elementosPorPagina, localesFiltrados.length)} de {localesFiltrados.length} locales
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                  disabled={paginaActual === 1}
                  className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <span className="px-3 py-1 text-sm text-slate-700">
                  {paginaActual} de {totalPaginas}
                </span>
                <button
                  onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                  className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      <ModalCrearLocal
        abierto={modalCrearAbierto}
        onCerrar={() => setModalCrearAbierto(false)}
        onCrear={crearLocal}
      />

      <ModalEditarLocal
        abierto={modalEditarAbierto}
        onCerrar={() => {
          setModalEditarAbierto(false);
          setLocalEditando(null);
        }}
        onEditar={editarLocal}
        local={localEditando}
      />

      <ModalConfirmarEliminarLocal
        abierto={modalEliminarAbierto}
        onCerrar={() => {
          setModalEliminarAbierto(false);
          setLocalEliminar(null);
        }}
        onConfirmar={() => localEliminar && eliminarLocal(localEliminar.id)}
        local={localEliminar}
      />
    </div>
  );
};

export default Empresa;
