import React, { useState, useMemo } from 'react';
import { 
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
  FilterIcon,
  DownloadIcon
} from '../components/icons/Icons';
import { Usuario, RolUsuario, FiltrosUsuario } from '../types/Usuario';
import { Local } from '../types/Empresa';
import ModalCrearUsuario from '../components/ModalCrearUsuario';
import ModalEditarUsuario from '../components/ModalEditarUsuario';
import ModalConfirmarEliminarUsuario from '../components/ModalConfirmarEliminarUsuario';

const Usuarios: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltrosUsuario>({
    rol: undefined,
    localId: '',
    activo: undefined,
    busqueda: ''
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  // Simular datos de locales (en una app real vendría de la API)
  const locales: Local[] = [
    {
      id: '1',
      nombre: 'Complejo Deportivo Norte',
      direccion: 'Av. Principal 123, Lima',
      telefono: '01-234-5678',
      email: 'norte@complejo.com',
      activo: true,
      fechaCreacion: '2024-01-01',
      canchas: [],
      empresaId: 'dueño_1'
    },
    {
      id: '2',
      nombre: 'Centro Deportivo Sur',
      direccion: 'Jr. Deportes 456, Lima',
      telefono: '01-345-6789',
      email: 'sur@centro.com',
      activo: true,
      fechaCreacion: '2024-01-15',
      canchas: [],
      empresaId: 'dueño_1'
    },
    {
      id: '3',
      nombre: 'Estadio Los Olivos',
      direccion: 'Av. Universitaria 789, Lima',
      telefono: '01-456-7890',
      email: 'olivos@estadio.com',
      activo: false,
      fechaCreacion: '2024-02-01',
      canchas: [],
      empresaId: 'dueño_1'
    }
  ];

  // Datos de ejemplo de usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      dni: '12345678',
      nombre: 'Roberto Silva',
      email: 'roberto@complejo.com',
      telefono: '987654321',
      rol: 'admin',
      activo: true,
      fechaCreacion: '2024-01-01',
      ultimoAcceso: '2024-01-15',
      notas: 'Administrador principal del sistema'
    },
    {
      id: '2',
      dni: '87654321',
      nombre: 'Patricia Morales',
      email: 'patricia@complejo.com',
      telefono: '987123456',
      rol: 'trabajador',
      localId: '1',
      localNombre: 'Complejo Deportivo Norte',
      activo: true,
      fechaCreacion: '2024-01-05',
      ultimoAcceso: '2024-01-14',
      notas: 'Encargada del local Norte'
    },
    {
      id: '3',
      dni: '11223344',
      nombre: 'Fernando Torres',
      email: 'fernando@complejo.com',
      telefono: '987456789',
      rol: 'trabajador',
      localId: '2',
      localNombre: 'Centro Deportivo Sur',
      activo: true,
      fechaCreacion: '2024-01-08',
      ultimoAcceso: '2024-01-13',
      notas: 'Encargado del local Sur'
    },
    {
      id: '4',
      dni: '55667788',
      nombre: 'Carmen Vargas',
      email: 'carmen@complejo.com',
      telefono: '987789123',
      rol: 'trabajador',
      localId: '3',
      localNombre: 'Estadio Los Olivos',
      activo: false,
      fechaCreacion: '2024-01-10',
      ultimoAcceso: '2024-01-12',
      notas: 'Usuario inactivo'
    }
  ]);

  // Estados para modales
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [usuarioEliminar, setUsuarioEliminar] = useState<Usuario | null>(null);
  const [mostrarFiltrosTabla, setMostrarFiltrosTabla] = useState(false);

  // Filtrar usuarios
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(usuario => {
      // Filtro por rol
      if (filtros.rol && usuario.rol !== filtros.rol) return false;
      
      // Filtro por local
      if (filtros.localId && usuario.localId !== filtros.localId) return false;
      
      // Filtro por estado activo
      if (filtros.activo !== undefined && usuario.activo !== filtros.activo) return false;
      
      // Filtro por búsqueda
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        return (
          usuario.nombre.toLowerCase().includes(busqueda) ||
          usuario.dni.includes(busqueda) ||
          usuario.email.toLowerCase().includes(busqueda) ||
          usuario.telefono.includes(busqueda) ||
          (usuario.localNombre && usuario.localNombre.toLowerCase().includes(busqueda))
        );
      }
      
      return true;
    });
  }, [usuarios, filtros]);

  // Paginación
  const totalPaginas = Math.ceil(usuariosFiltrados.length / elementosPorPagina);
  const inicioIndice = (paginaActual - 1) * elementosPorPagina;
  const finIndice = inicioIndice + elementosPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(inicioIndice, finIndice);

  const handleFiltroChange = (campo: keyof FiltrosUsuario, valor: any) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
    setPaginaActual(1);
  };

  const limpiarFiltros = () => {
    setFiltros({
      rol: undefined,
      localId: '',
      activo: undefined,
      busqueda: ''
    });
    setPaginaActual(1);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  const irAPrimeraPagina = () => setPaginaActual(1);
  const irAUltimaPagina = () => setPaginaActual(totalPaginas);

  // Funciones para manejar usuarios
  const crearUsuario = (nuevoUsuario: Omit<Usuario, 'id' | 'fechaCreacion'>) => {
    const usuario: Usuario = {
      ...nuevoUsuario,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString().split('T')[0]
    };
    setUsuarios(prev => [...prev, usuario]);
    setModalCrearAbierto(false);
  };

  const editarUsuario = (usuarioEditado: Usuario) => {
    setUsuarios(prev => prev.map(u => u.id === usuarioEditado.id ? usuarioEditado : u));
    setModalEditarAbierto(false);
    setUsuarioEditando(null);
  };

  const eliminarUsuario = (usuarioId: string) => {
    setUsuarios(prev => prev.filter(u => u.id !== usuarioId));
    setModalEliminarAbierto(false);
    setUsuarioEliminar(null);
  };

  const abrirModalEdicion = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setModalEditarAbierto(true);
  };

  const abrirModalEliminar = (usuario: Usuario) => {
    setUsuarioEliminar(usuario);
    setModalEliminarAbierto(true);
  };

  const getRolColor = (rol: RolUsuario) => {
    switch (rol) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'trabajador':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolLabel = (rol: RolUsuario) => {
    switch (rol) {
      case 'admin':
        return 'Administrador';
      case 'trabajador':
        return 'Trabajador';
      default:
        return rol;
    }
  };

  const getEstadoColor = (activo: boolean) => {
    return activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getEstadoLabel = (activo: boolean) => {
    return activo ? 'Activo' : 'Inactivo';
  };

  const exportarUsuarios = () => {
    const headers = ['Nombre', 'DNI', 'Email', 'Teléfono', 'Rol', 'Local', 'Estado', 'Último Acceso'];
    const filas = usuariosFiltrados.map((u) => [
      u.nombre,
      u.dni,
      u.email,
      u.telefono,
      getRolLabel(u.rol),
      u.localNombre || 'Sin asignar',
      getEstadoLabel(u.activo),
      u.ultimoAcceso || 'Nunca'
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...filas.map((f) => f.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 px-8 py-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gestión de Usuarios</h1>
      </div>

      {/* Tabla de Usuarios */}
      <div className="card py-5 px-8">
        {/* Fila 1: Título a la izquierda, Export y Nuevo Usuario a la derecha */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 -mx-8 px-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lista de Usuarios</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">Administra los usuarios disponibles en el sistema</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={exportarUsuarios}
              className="inline-flex items-center justify-center gap-2 px-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-200 transition-colors hover:bg-gray-50 dark:hover:bg-slate-600"
              style={{ minHeight: '48px', paddingTop: '12px', paddingBottom: '12px' }}
              title="Exportar usuarios"
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
              Nuevo Usuario
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

        <div className="overflow-hidden -mx-8 pt-2">
          {/* Tabla para desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="table-header pl-8">Usuario</th>
                  <th className="table-header">Contacto</th>
                  <th className="table-header">Rol</th>
                  <th className="table-header">Local Asignado</th>
                  <th className="table-header">Estado</th>
                  <th className="table-header">Último Acceso</th>
                  <th className="table-header text-center w-36 pr-8">Acciones</th>
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
                          placeholder="Nombre, DNI, email..."
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3 align-top">—</td>
                    <td className="px-6 py-3 align-top">
                      <select
                        value={filtros.rol || ''}
                        onChange={(e) => { handleFiltroChange('rol', e.target.value || undefined); setPaginaActual(1); }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Todos</option>
                        <option value="admin">Administrador</option>
                        <option value="trabajador">Trabajador</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 align-top">
                      <select
                        value={filtros.localId}
                        onChange={(e) => { handleFiltroChange('localId', e.target.value); setPaginaActual(1); }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Todos</option>
                        {locales.map((l) => (
                          <option key={l.id} value={l.id}>{l.nombre}</option>
                        ))}
                      </select>
                    </td>
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
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-800">
                {usuariosPaginados.map((usuario) => (
                  <tr key={usuario.id} className="table-row">
                    <td className="table-cell pl-8">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{usuario.nombre}</div>
                          <div className="text-xs text-slate-500">DNI: {usuario.dni}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div>
                        <div className="text-slate-600 font-medium">{usuario.email}</div>
                        <div className="text-sm text-slate-500">{usuario.telefono}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRolColor(usuario.rol)}`}>
                        {getRolLabel(usuario.rol)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {usuario.localNombre || 'Sin asignar'}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(usuario.activo)}`}>
                        {getEstadoLabel(usuario.activo)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {usuario.ultimoAcceso || 'Nunca'}
                      </div>
                    </td>
                    <td className="table-cell pr-8 text-center w-36">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => abrirModalEdicion(usuario)}
                          className="inline-flex items-center justify-center p-2.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-600"
                          title="Editar usuario"
                        >
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => abrirModalEliminar(usuario)}
                          className="inline-flex items-center justify-center p-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600"
                          title="Eliminar usuario"
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

          {/* Cards para móvil */}
          <div className="md:hidden space-y-4">
            {usuariosPaginados.map((usuario) => (
              <div key={usuario.id} className="card-hover">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{usuario.nombre}</h3>
                      <p className="text-slate-600">{usuario.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRolColor(usuario.rol)}`}>
                      {getRolLabel(usuario.rol)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(usuario.activo)}`}>
                      {getEstadoLabel(usuario.activo)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-slate-600 mb-3">
                  <div>
                    <span className="font-semibold">DNI:</span> {usuario.dni}
                  </div>
                  <div>
                    <span className="font-semibold">Teléfono:</span> {usuario.telefono}
                  </div>
                  <div>
                    <span className="font-semibold">Local:</span> {usuario.localNombre || 'Sin asignar'}
                  </div>
                  <div>
                    <span className="font-semibold">Último acceso:</span> {usuario.ultimoAcceso || 'Nunca'}
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                  <button 
                    onClick={() => abrirModalEdicion(usuario)}
                    className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
                    title="Editar usuario"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => abrirModalEliminar(usuario)}
                    className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                    title="Eliminar usuario"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-transparent border-t border-slate-200 dark:border-gray-800">
              <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                <span>
                  Mostrando {inicioIndice + 1} a {Math.min(finIndice, usuariosFiltrados.length)} de {usuariosFiltrados.length} usuarios
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={irAPrimeraPagina}
                  disabled={paginaActual === 1}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === 1
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Primera
                </button>

                <button
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === 1
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Anterior
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                    let numeroPagina: number;
                    if (totalPaginas <= 5) {
                      numeroPagina = i + 1;
                    } else if (paginaActual <= 3) {
                      numeroPagina = i + 1;
                    } else if (paginaActual >= totalPaginas - 2) {
                      numeroPagina = totalPaginas - 4 + i;
                    } else {
                      numeroPagina = paginaActual - 2 + i;
                    }

                    return (
                      <button
                        key={numeroPagina}
                        onClick={() => cambiarPagina(numeroPagina)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                          paginaActual === numeroPagina
                            ? 'bg-green-600 text-white'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === totalPaginas
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Siguiente
                </button>

                <button
                  onClick={irAUltimaPagina}
                  disabled={paginaActual === totalPaginas}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === totalPaginas
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Última
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <ModalCrearUsuario
        abierto={modalCrearAbierto}
        onCerrar={() => setModalCrearAbierto(false)}
        onCreate={crearUsuario}
        locales={locales}
      />

      <ModalEditarUsuario
        usuario={usuarioEditando}
        abierto={modalEditarAbierto}
        onCerrar={() => {
          setModalEditarAbierto(false);
          setUsuarioEditando(null);
        }}
        onUpdate={editarUsuario}
        locales={locales}
      />

      <ModalConfirmarEliminarUsuario
        usuario={usuarioEliminar}
        abierto={modalEliminarAbierto}
        onCerrar={() => {
          setModalEliminarAbierto(false);
          setUsuarioEliminar(null);
        }}
        onConfirmar={eliminarUsuario}
      />
    </div>
  );
};

export default Usuarios;
