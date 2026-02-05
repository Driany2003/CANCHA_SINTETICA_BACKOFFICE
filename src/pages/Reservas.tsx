import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon,
  FilterIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  TimesCircleIcon,
  CalendarIcon,
  DownloadIcon
} from '../components/icons/Icons';
import ModalVerReserva from '../components/ModalVerReserva';
import ModalEditarReserva from '../components/ModalEditarReserva';
import ModalConfirmarEliminar from '../components/ModalConfirmarEliminar';
import ModalRechazarReserva from '../components/ModalRechazarReserva';
import { Reserva, EstadoReserva, OrigenReserva } from '../types/Reserva';
import { Local } from '../types/Empresa';
import { CURRENT_USER_ROLE, CURRENT_USER_LOCAL_ID } from '../config/userConfig';

const Reservas: React.FC = () => {
  const [filtros, setFiltros] = useState({
    estado: '',
    cancha: '',
    cliente: '',
    fecha: '',
    origen: ''
  });
  const [localFiltro, setLocalFiltro] = useState<string>('todos');
  const [modalVerAbierto, setModalVerAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [modalRechazarAbierto, setModalRechazarAbierto] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina] = useState(5);
  const [mostrarFiltrosTabla, setMostrarFiltrosTabla] = useState(false);

  // ===== SISTEMA DE FILTRADO POR DUEÑO =====
  const dueñoActualId = 'dueño_1'; // ID del dueño actual
  
  // Datos de locales disponibles
  const todosLosLocales: Local[] = [
    {
      id: '1',
      nombre: 'Complejo de Fútbol Norte',
      direccion: 'Av. Principal 123, Lima Norte',
      telefono: '+51 987 654 321',
      email: 'norte@complejofutbol.com',
      activo: true,
      fechaCreacion: '2024-01-01',
      canchas: [],
      empresaId: 'dueño_1'
    },
    {
      id: '2',
      nombre: 'Centro de Fútbol Sur',
      direccion: 'Jr. Deportes 456, Lima Sur',
      telefono: '+51 987 654 322',
      email: 'sur@centrofutbol.com',
      activo: true,
      fechaCreacion: '2024-01-15',
      canchas: [],
      empresaId: 'dueño_1'
    },
    {
      id: '3',
      nombre: 'Estadio de Fútbol Este',
      direccion: 'Av. Deportiva 789, Lima Este',
      telefono: '+51 987 654 323',
      email: 'este@estadiofutbol.com',
      activo: true,
      fechaCreacion: '2024-02-01',
      canchas: [],
      empresaId: 'dueño_1'
    }
  ];

  // Filtrar solo los locales del dueño actual
  const locales = todosLosLocales.filter(local => local.empresaId === dueñoActualId);
  
  const [reservas, setReservas] = useState<Reserva[]>([
    {
      id: '1',
      nombreCliente: 'Juan Pérez',
      telefono: '123-456-7890',
      email: 'juan@email.com',
      fecha: '2024-01-15',
      hora: '14:00',
      duracion: 2,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado',
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-01-10',
      origen: 'local',
      localId: '1',
      notas: 'Cliente regular'
    },
    {
      id: '2',
      nombreCliente: 'María García',
      telefono: '098-765-4321',
      email: 'maria@email.com',
      fecha: '2024-01-16',
      hora: '16:00',
      duracion: 1,
      cancha: 'Cancha 2',
      estado: 'pendiente_de_pago',
      precio: 60,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-01-11',
      origen: 'web',
      localId: '1',
      notas: 'Primera vez'
    },
    {
      id: '3',
      nombreCliente: 'Carlos López',
      telefono: '555-123-4567',
      email: 'carlos@email.com',
      fecha: '2024-01-17',
      hora: '18:00',
      duracion: 3,
      cancha: 'Cancha 1',
      estado: 'pendiente_de_pago',
      precio: 180,
      metodoPago: 'transferencia',
      fechaCreacion: '2024-01-12',
      origen: 'local',
      localId: '2',
      notas: 'Grupo de amigos'
    },
    {
      id: '4',
      nombreCliente: 'Ana Martínez',
      telefono: '987-654-3210',
      email: 'ana@email.com',
      fecha: '2024-01-18',
      hora: '20:00',
      duracion: 2,
      cancha: 'Cancha 3',
      estado: 'pagado_confirmado',
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-01-13',
      origen: 'web',
      localId: '2',
      notas: 'Cliente VIP'
    },
    {
      id: '5',
      nombreCliente: 'Luis Rodríguez',
      telefono: '456-789-0123',
      email: 'luis@email.com',
      fecha: '2024-01-19',
      hora: '10:00',
      duracion: 1,
      cancha: 'Cancha 1',
      estado: 'pendiente_de_pago',
      precio: 60,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-01-14',
      origen: 'local',
      localId: '1',
      notas: 'Reserva matutina'
    },
    {
      id: '6',
      nombreCliente: 'Carmen Silva',
      telefono: '789-012-3456',
      email: 'carmen@email.com',
      fecha: '2024-01-20',
      hora: '15:00',
      duracion: 3,
      cancha: 'Cancha 2',
      estado: 'pagado_confirmado',
      precio: 180,
      metodoPago: 'transferencia',
      fechaCreacion: '2024-01-15',
      origen: 'web',
      localId: '3',
      notas: 'Torneo local'
    },
    {
      id: '7',
      nombreCliente: 'Roberto Torres',
      telefono: '321-654-0987',
      email: 'roberto@email.com',
      fecha: '2024-01-21',
      hora: '17:00',
      duracion: 2,
      cancha: 'Cancha 3',
      estado: 'pendiente_de_pago',
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-01-16',
      origen: 'local',
      localId: '2',
      notas: 'Cliente nuevo'
    },
    {
      id: '8',
      nombreCliente: 'Patricia Vega',
      telefono: '654-321-0987',
      email: 'patricia@email.com',
      fecha: '2024-01-22',
      hora: '19:00',
      duracion: 1,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado',
      precio: 60,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-01-17',
      origen: 'web',
      localId: '3',
      notas: 'Reserva nocturna'
    }
  ]);

  // Filtrar reservas por local seleccionado (solo para administradores)
  // Para trabajadores, solo mostrar reservas de su local asignado
  const reservasFiltradasPorLocal = CURRENT_USER_ROLE === 'admin' 
    ? (localFiltro === 'todos' 
        ? reservas 
        : reservas.filter(reserva => reserva.localId === localFiltro))
    : reservas.filter(reserva => reserva.localId === CURRENT_USER_LOCAL_ID);

  const canchas = ['Cancha 1', 'Cancha 2', 'Cancha 3'];
  const estados: EstadoReserva[] = ['pendiente_de_pago', 'pagado_confirmado', 'cancelado', 'rechazado'];

  const getEstadoColor = (estado: EstadoReserva) => {
    switch (estado) {
      case 'pagado_confirmado':
        return 'status-confirmed';
      case 'pendiente_de_pago':
        return 'status-pending-payment';
      case 'cancelado':
        return 'status-cancelled';
      case 'rechazado':
        return 'status-rejected';
      default:
        return 'status-pending-payment';
    }
  };

  // Función para obtener icono de estado (comentada porque no se usa actualmente)
  // const getEstadoIcon = (estado: EstadoReserva) => {
  //   switch (estado) {
  //     case 'pagado_confirmado':
  //       return '✅';
  //     case 'pendiente_de_pago':
  //       return '💰';
  //     default:
  //       return '💰';
  //   }
  // };

  const getEstadoLabel = (estado: EstadoReserva) => {
    switch (estado) {
      case 'pagado_confirmado':
        return 'Pagado - Confirmado';
      case 'pendiente_de_pago':
        return 'Pendiente de Pago';
      case 'cancelado':
        return 'Cancelado';
      case 'rechazado':
        return 'Rechazado';
      default:
        return 'Pendiente de Pago';
    }
  };

  const getOrigenColor = (origen: OrigenReserva) => {
    switch (origen) {
      case 'web':
        return 'bg-blue-100 text-blue-800';
      case 'local':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrigenLabel = (origen: OrigenReserva) => {
    switch (origen) {
      case 'web':
        return 'Web';
      case 'local':
        return 'Local';
      default:
        return 'Desconocido';
    }
  };

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const abrirModalVer = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setModalVerAbierto(true);
  };

  const abrirModalEdicion = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setModalEditarAbierto(true);
  };

  const guardarReservaEditada = (reservaEditada: Reserva) => {
    // Actualizar la reserva en el array local
    setReservas(prevReservas => 
      prevReservas.map(r => r.id === reservaEditada.id ? reservaEditada : r)
    );
    setModalEditarAbierto(false);
    setReservaSeleccionada(null);
  };

  const cerrarModalVer = () => {
    setModalVerAbierto(false);
    setReservaSeleccionada(null);
  };

  const aprobarReserva = (reservaId: string) => {
    setReservas(prevReservas => 
      prevReservas.map(reserva => 
        reserva.id === reservaId 
          ? { ...reserva, estado: 'pagado_confirmado' as EstadoReserva }
          : reserva
      )
    );
    cerrarModalVer();
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setReservaSeleccionada(null);
  };

  const abrirModalEliminar = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setModalEliminarAbierto(true);
  };

  const abrirModalRechazar = (reserva: Reserva) => {
    setReservaSeleccionada(reserva);
    setModalRechazarAbierto(true);
  };

  const cerrarModalRechazar = () => {
    setModalRechazarAbierto(false);
    setReservaSeleccionada(null);
  };

  const confirmarRechazo = (reservaActualizada: Reserva) => {
    setReservas(prev => prev.map(r => r.id === reservaActualizada.id ? reservaActualizada : r));
    cerrarModalRechazar();
  };

  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setReservaSeleccionada(null);
  };

  const eliminarReserva = () => {
    if (reservaSeleccionada) {
      setReservas(prevReservas => 
        prevReservas.filter(r => r.id !== reservaSeleccionada.id)
      );
      cerrarModalEliminar();
    }
  };

  const formatFechaHora = (fecha: string, hora: string, duracion: number) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Calcular hora de fin (exactamente en horas)
    const [horaInicio, minutoInicio] = hora.split(':');
    const horaFin = parseInt(horaInicio) + duracion;
    const horaFinFormateada = `${horaFin.toString().padStart(2, '0')}:${minutoInicio}`;
    
    return (
      <div className="text-slate-600 font-medium">
        <div className="font-semibold">{fechaFormateada}</div>
        <div className="text-sm text-slate-500">{hora} - {horaFinFormateada}</div>
      </div>
    );
  };

  const formatFechaHoraLineal = (fecha: string, hora: string, duracion: number) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Calcular hora de fin (exactamente en horas)
    const [horaInicio, minutoInicio] = hora.split(':');
    const horaFin = parseInt(horaInicio) + duracion;
    const horaFinFormateada = `${horaFin.toString().padStart(2, '0')}:${minutoInicio}`;
    
    return `${fechaFormateada} - ${hora} a ${horaFinFormateada}`;
  };



  const reservasFiltradas = reservasFiltradasPorLocal.filter(reserva => {
    if (filtros.estado && reserva.estado !== filtros.estado) return false;
    if (filtros.cancha && reserva.cancha !== filtros.cancha) return false;
    if (filtros.fecha && reserva.fecha !== filtros.fecha) return false;
    if (filtros.cliente && !reserva.nombreCliente.toLowerCase().includes(filtros.cliente.toLowerCase()) && !reserva.telefono.includes(filtros.cliente)) return false;
    if (filtros.origen && reserva.origen !== filtros.origen) return false;
    return true;
  });

  // Funciones de paginación
  const totalPaginas = Math.ceil(reservasFiltradas.length / elementosPorPagina);
  const inicioIndice = (paginaActual - 1) * elementosPorPagina;
  const finIndice = inicioIndice + elementosPorPagina;
  const reservasPaginadas = reservasFiltradas.slice(inicioIndice, finIndice);

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  const irAPrimeraPagina = () => {
    setPaginaActual(1);
  };

  const irAUltimaPagina = () => {
    setPaginaActual(totalPaginas);
  };

  const hoy = new Date().toISOString().slice(0, 10);
  const reservasHoy = reservasFiltradasPorLocal.filter(r => r.fecha === hoy);
  const pendientesPago = reservasFiltradasPorLocal.filter(r => r.estado === 'pendiente_de_pago').length;
  const ingresosConfirmados = reservasFiltradasPorLocal
    .filter(r => r.estado === 'pagado_confirmado')
    .reduce((sum, r) => sum + r.precio, 0);

  return (
    <div className="space-y-8 px-8 py-8">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reservas</h1>
      </div>

      {/* Card principal: título + botón; dentro, card interior que envuelve solo las métricas */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold text-slate-900">Descripción</h2>
          <Link
            to="/nueva-reserva"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Nueva Reserva
          </Link>
        </div>
        {/* Card interior: envuelve solo los datos y números (como en Dashboard) */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <div className="flex flex-col p-4 sm:px-6">
            <p className="text-sm text-slate-500 font-medium mb-2">Total reservas</p>
            <p className="text-3xl font-bold text-slate-900">{reservasFiltradasPorLocal.length}</p>
          </div>
          <div className="flex flex-col p-4 sm:px-6">
            <p className="text-sm text-slate-500 font-medium mb-2">Pendientes de pago</p>
            <p className="text-3xl font-bold text-slate-900">{pendientesPago}</p>
          </div>
          <div className="flex flex-col p-4 sm:px-6">
            <p className="text-sm text-slate-500 font-medium mb-2">Reservas hoy</p>
            <p className="text-3xl font-bold text-slate-900">{reservasHoy.length}</p>
          </div>
          <div className="flex flex-col p-4 sm:px-6">
            <p className="text-sm text-slate-500 font-medium mb-2">Ingresos confirmados</p>
            <p className="text-3xl font-bold text-slate-900">S/ {ingresosConfirmados.toLocaleString()}</p>
          </div>
        </div>
        </div>
      </div>

      {/* Tabla de Reservas */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Izquierda: título y subtítulo */}
          <div>
            <h2 className="text-lg font-bold text-slate-900">Lista de Reservas</h2>
            <p className="text-sm text-gray-500 mt-0.5">Tu lista de reservas recientes</p>
          </div>
          {/* Derecha: segmentado + búsqueda + Filter + Export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              {[
                { value: '', label: 'Todos' },
                { value: 'pagado_confirmado', label: 'Pagado' },
                { value: 'pendiente_de_pago', label: 'Pendiente' },
              ].map(({ value, label }) => (
                <button
                  key={value || 'todos'}
                  type="button"
                  onClick={() => {
                    setFiltros(prev => ({ ...prev, estado: value }));
                    setPaginaActual(1);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    filtros.estado === value
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[200px] sm:max-w-[280px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={filtros.cliente}
                onChange={(e) => {
                  setFiltros(prev => ({ ...prev, cliente: e.target.value }));
                  setPaginaActual(1);
                }}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setMostrarFiltrosTabla(prev => !prev)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 ${
                mostrarFiltrosTabla ? 'ring-2 ring-green-500 border-green-500' : ''
              }`}
              title={mostrarFiltrosTabla ? "Ocultar filtros" : "Mostrar filtros por columna"}
            >
              <FilterIcon className="h-4 w-4" />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              title="Exportar reservas"
            >
              <DownloadIcon className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-8">
          {/* Tabla para desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="table-header">Cliente</th>
                  <th className="table-header">Teléfono</th>
                  <th className="table-header">Fecha y Horario</th>
                  <th className="table-header">Cancha</th>
                  {CURRENT_USER_ROLE === 'admin' && <th className="table-header">Local</th>}
                  <th className="table-header">Precio</th>
                  <th className="table-header">Estado</th>
                  <th className="table-header">Origen</th>
                  <th className="table-header text-center w-44">Acciones</th>
                </tr>
              </thead>
              {mostrarFiltrosTabla && (
                <tbody className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <td className="px-6 py-3 align-top">
                      <div className="relative">
                        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={filtros.cliente}
                          onChange={(e) => { handleFiltroChange('cliente', e.target.value); setPaginaActual(1); }}
                          placeholder="Nombre o teléfono..."
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3 align-top">
                      <input
                        type="text"
                        placeholder="—"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        readOnly
                        tabIndex={-1}
                      />
                    </td>
                    <td className="px-6 py-3 align-top">
                      <div className="relative">
                        <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                          type="date"
                          value={filtros.fecha}
                          onChange={(e) => { handleFiltroChange('fecha', e.target.value); setPaginaActual(1); }}
                          className="w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3 align-top">
                      <select
                        value={filtros.cancha}
                        onChange={(e) => { handleFiltroChange('cancha', e.target.value); setPaginaActual(1); }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Todas</option>
                        {canchas.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </td>
                    {CURRENT_USER_ROLE === 'admin' && (
                      <td className="px-6 py-3 align-top">
                        <select
                          value={localFiltro}
                          onChange={(e) => { setLocalFiltro(e.target.value); setPaginaActual(1); }}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="todos">Todos los Locales</option>
                          {locales.map((local) => (
                            <option key={local.id} value={local.id}>{local.nombre}</option>
                          ))}
                        </select>
                      </td>
                    )}
                    <td className="px-6 py-3 align-top">
                      <div className="px-3 py-2 text-sm text-slate-400">—</div>
                    </td>
                    <td className="px-6 py-3 align-top">
                      <select
                        value={filtros.estado}
                        onChange={(e) => { handleFiltroChange('estado', e.target.value); setPaginaActual(1); }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Todos</option>
                        {estados.map((e) => (
                          <option key={e} value={e}>{getEstadoLabel(e)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-3 align-top">
                      <select
                        value={filtros.origen ?? ''}
                        onChange={(e) => { handleFiltroChange('origen', e.target.value); setPaginaActual(1); }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Todos</option>
                        <option value="web">Web</option>
                        <option value="local">Local</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 w-44" />
                  </tr>
                </tbody>
              )}
              <tbody className="bg-white">
                {reservasPaginadas.map((reserva) => (
                  <tr key={reserva.id} className="table-row border-b border-gray-200 last:border-b-0">
                    <td className="table-cell">
                      <div>
                        <div className="font-semibold text-slate-900">{reserva.nombreCliente}</div>
                        <div className="text-xs text-slate-500">{reserva.email}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {reserva.telefono.replace(/-/g, '').startsWith('9') ? reserva.telefono.replace(/-/g, '').slice(0, 9) : '9' + reserva.telefono.replace(/-/g, '').slice(0, 8)}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">{formatFechaHora(reserva.fecha, reserva.hora, reserva.duracion)}</div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">{reserva.cancha}</div>
                    </td>
                    {CURRENT_USER_ROLE === 'admin' && (
                      <td className="table-cell">
                        <div className="text-slate-600 font-medium">
                          {locales.find(local => local.id === reserva.localId)?.nombre || 'N/A'}
                        </div>
                      </td>
                    )}
                    <td className="table-cell font-bold text-slate-900">S/ {reserva.precio}</td>
                    <td className="table-cell">
                      <span className={`status-badge ${getEstadoColor(reserva.estado)}`}>
                        {getEstadoLabel(reserva.estado)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrigenColor(reserva.origen)}`}>
                        {getOrigenLabel(reserva.origen)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 w-44">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => abrirModalVer(reserva)}
                          className="inline-flex items-center justify-center p-2.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-600"
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={reserva.estado === 'pendiente_de_pago' ? () => abrirModalEdicion(reserva) : undefined}
                          className={`inline-flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 border ${
                            reserva.estado === 'pendiente_de_pago'
                              ? 'text-green-600 hover:text-white hover:bg-green-600 border-green-200 hover:border-green-600 cursor-pointer'
                              : 'text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50'
                          }`}
                          title={reserva.estado === 'pendiente_de_pago' ? "Editar reserva" : "No se puede editar una reserva confirmada"}
                          disabled={reserva.estado === 'pagado_confirmado'}
                        >
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={reserva.estado === 'pendiente_de_pago' ? () => abrirModalRechazar(reserva) : undefined}
                          className={`inline-flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 border ${
                            reserva.estado === 'pendiente_de_pago'
                              ? 'text-amber-600 hover:text-white hover:bg-amber-600 border-amber-200 hover:border-amber-600 cursor-pointer'
                              : 'text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50'
                          }`}
                          title={reserva.estado === 'pendiente_de_pago' ? "Rechazar reserva" : "Solo se puede rechazar una reserva pendiente"}
                          disabled={reserva.estado !== 'pendiente_de_pago'}
                        >
                          <TimesCircleIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={reserva.estado === 'pendiente_de_pago' ? () => abrirModalEliminar(reserva) : undefined}
                          className={`inline-flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 border ${
                            reserva.estado === 'pendiente_de_pago'
                              ? 'text-red-600 hover:text-white hover:bg-red-600 border-red-200 hover:border-red-600 cursor-pointer'
                              : 'text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50'
                          }`}
                          title={reserva.estado === 'pendiente_de_pago' ? "Eliminar reserva" : "No se puede eliminar una reserva confirmada"}
                          disabled={reserva.estado === 'pagado_confirmado'}
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

          {/* Controles de Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-200">
              <div className="flex items-center text-sm text-slate-700">
                <span>
                  Mostrando {inicioIndice + 1} a {Math.min(finIndice, reservasFiltradas.length)} de {reservasFiltradas.length} reservas
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Botón Primera Página */}
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

                {/* Botón Página Anterior */}
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

                {/* Números de Página */}
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
                          numeroPagina === paginaActual
                            ? 'bg-green-600 text-white'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}
                </div>

                {/* Botón Página Siguiente */}
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

                {/* Botón Última Página */}
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

          {/* Cards para móvil */}
          <div className="md:hidden space-y-4">
            {reservasPaginadas.map((reserva) => (
              <div key={reserva.id} className="card-hover">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{reserva.nombreCliente}</h3>
                    <p className="text-slate-600">
                      {reserva.telefono.replace(/-/g, '').startsWith('9') ? reserva.telefono.replace(/-/g, '').slice(0, 9) : '9' + reserva.telefono.replace(/-/g, '').slice(0, 8)}
                    </p>
                    <p className="text-slate-600">{reserva.cancha}</p>
                    {CURRENT_USER_ROLE === 'admin' && (
                      <p className="text-slate-600 text-sm">
                        📍 {locales.find(local => local.id === reserva.localId)?.nombre || 'N/A'}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`status-badge ${getEstadoColor(reserva.estado)}`}>
                      {getEstadoLabel(reserva.estado)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrigenColor(reserva.origen)}`}>
                      {getOrigenLabel(reserva.origen)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                  <div>
                    <span className="font-semibold">Fecha y Hora:</span> {formatFechaHoraLineal(reserva.fecha, reserva.hora, reserva.duracion)}
                  </div>
                  <div>
                    <span className="font-semibold">Duración:</span> {reserva.duracion}h
                  </div>
                  <div>
                    <span className="font-semibold">Precio:</span> S/ {reserva.precio}
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                  <button 
                    onClick={() => abrirModalVer(reserva)}
                    className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
                    title="Ver detalles"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={reserva.estado === 'pendiente_de_pago' ? () => abrirModalEdicion(reserva) : undefined}
                    className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                      reserva.estado === 'pendiente_de_pago'
                        ? 'text-green-600 hover:text-green-700 hover:bg-green-50 cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={reserva.estado === 'pendiente_de_pago' ? "Editar reserva" : "No se puede editar una reserva confirmada"}
                    disabled={reserva.estado === 'pagado_confirmado'}
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={reserva.estado === 'pendiente_de_pago' ? () => abrirModalRechazar(reserva) : undefined}
                    className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                      reserva.estado === 'pendiente_de_pago'
                        ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50 cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={reserva.estado === 'pendiente_de_pago' ? "Rechazar reserva" : "Solo se puede rechazar una reserva pendiente"}
                    disabled={reserva.estado !== 'pendiente_de_pago'}
                  >
                    <TimesCircleIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={reserva.estado === 'pendiente_de_pago' ? () => abrirModalEliminar(reserva) : undefined}
                    className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                      reserva.estado === 'pendiente_de_pago'
                        ? 'text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={reserva.estado === 'pendiente_de_pago' ? "Eliminar reserva" : "No se puede eliminar una reserva confirmada"}
                    disabled={reserva.estado === 'pagado_confirmado'}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalVerReserva
        reserva={reservaSeleccionada}
        abierto={modalVerAbierto}
        onCerrar={cerrarModalVer}
        onAprobar={aprobarReserva}
        getEstadoColor={getEstadoColor}
        getEstadoLabel={getEstadoLabel}
      />
      
      <ModalEditarReserva
        reserva={reservaSeleccionada}
        abierto={modalEditarAbierto}
        onCerrar={cerrarModalEditar}
        onGuardar={guardarReservaEditada}
        getEstadoColor={getEstadoColor}
        getEstadoLabel={getEstadoLabel}
      />
      
      <ModalConfirmarEliminar
        reserva={reservaSeleccionada}
        abierto={modalEliminarAbierto}
        onCerrar={cerrarModalEliminar}
        onConfirmar={eliminarReserva}
      />
      
      <ModalRechazarReserva
        reserva={reservaSeleccionada}
        abierto={modalRechazarAbierto}
        onCerrar={cerrarModalRechazar}
        onConfirmar={confirmarRechazo}
      />
    </div>
  );
};

export default Reservas;
