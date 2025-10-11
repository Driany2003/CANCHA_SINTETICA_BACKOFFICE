import React, { useState, useMemo } from 'react';
import { 
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  UserIcon
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

  return (
    <div className="space-y-8 px-8 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Usuarios</h1>
          <p className="text-slate-600 mt-1">
            Administra los usuarios del sistema y sus permisos por local
          </p>
        </div>
        <div className="flex-shrink-0 md:ml-6 ">
          <button
            onClick={() => setModalCrearAbierto(true)}
            className="btn-primary whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Filtros</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Buscar
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={filtros.busqueda}
                onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
                className="input-field pl-8 py-2 text-sm"
                placeholder="Nombre, DNI, email, teléfono..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rol
            </label>
            <select
              value={filtros.rol || ''}
              onChange={(e) => handleFiltroChange('rol', e.target.value || undefined)}
              className="input-field py-2 text-sm"
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="trabajador">Trabajador</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Local
            </label>
            <select
              value={filtros.localId}
              onChange={(e) => handleFiltroChange('localId', e.target.value)}
              className="input-field py-2 text-sm"
            >
              <option value="">Todos los locales</option>
              {locales.map(local => (
                <option key={local.id} value={local.id}>
                  {local.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estado
            </label>
            <select
              value={filtros.activo === undefined ? '' : filtros.activo.toString()}
              onChange={(e) => handleFiltroChange('activo', e.target.value === '' ? undefined : e.target.value === 'true')}
              className="input-field py-2 text-sm"
            >
              <option value="">Todos</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
            <div className="text-sm text-slate-600">
              <span className="font-medium">Tip:</span> Filtra por nombre, DNI, email, teléfono, rol, local y estado
            </div>
            <div className="flex space-x-2">
              <button
                onClick={limpiarFiltros}
                className="btn-secondary flex items-center justify-center px-3 py-1 text-sm"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-sm text-slate-600">
            {usuariosFiltrados.length} usuario{usuariosFiltrados.length !== 1 ? 's' : ''} encontrado{usuariosFiltrados.length !== 1 ? 's' : ''}
            {totalPaginas > 1 && ` • Página ${paginaActual} de ${totalPaginas}`}
          </span>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="card">
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 mb-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900">Lista de Usuarios</h2>
          </div>
          <div className="flex-shrink-0 lg:ml-6">
            <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
              {usuariosFiltrados.length} usuario{usuariosFiltrados.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="overflow-hidden">
          {/* Tabla para desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead>
                <tr>
                  <th className="table-header">Usuario</th>
                  <th className="table-header">Contacto</th>
                  <th className="table-header">Rol</th>
                  <th className="table-header">Local Asignado</th>
                  <th className="table-header">Estado</th>
                  <th className="table-header">Último Acceso</th>
                  <th className="table-header text-center w-36">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {usuariosPaginados.map((usuario) => (
                  <tr key={usuario.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{usuario.nombre}</div>
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
                    <td className="px-6 py-4 text-sm text-slate-900 w-36">
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
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-200">
              <div className="flex items-center text-sm text-slate-700">
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
