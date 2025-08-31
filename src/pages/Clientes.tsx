import React, { useState, useEffect, useCallback } from 'react';
import { Cliente } from '../types/Cliente';
import { 
  SearchIcon, 
  UserIcon,
  EyeIcon,
  EditIcon,
  TrashIcon
} from '../components/icons/Icons';
import ModalDetallesCliente from '../components/ModalDetallesCliente';
import ModalEditarCliente from '../components/ModalEditarCliente';
import ModalConfirmarEliminarCliente from '../components/ModalConfirmarEliminarCliente';

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [modalDetallesAbierto, setModalDetallesAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  
  const [filtros, setFiltros] = useState({
    nombre: '',
    estado: ''
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina] = useState(5);

  // Datos de ejemplo para clientes
  useEffect(() => {
    const clientesEjemplo: Cliente[] = [
      {
        id: '1',
        dni: '12345678',
        nombre: 'Carlos Mendoza',
        telefono: '987-654-321',
        email: 'carlos@email.com',
        fechaRegistro: '2024-01-15',
        totalReservas: 12,
        totalHoras: 24,
        totalGastado: 1200,
        ultimaReserva: '2024-03-20',
        reservasRealizadas: ['1', '2', '3'],
        estado: 'activo',
        categoria: 'oro',
        notas: 'Cliente frecuente, prefiere cancha 1'
      },
      {
        id: '2',
        dni: '23456789',
        nombre: 'Ana García',
        telefono: '987-123-456',
        email: 'ana@email.com',
        fechaRegistro: '2024-02-01',
        totalReservas: 8,
        totalHoras: 16,
        totalGastado: 800,
        ultimaReserva: '2024-03-18',
        reservasRealizadas: ['4', '5'],
        estado: 'activo',
        categoria: 'plata',
        notas: 'Juega fútbol los fines de semana'
      },
      {
        id: '3',
        dni: '34567890',
        nombre: 'Luis Torres',
        telefono: '987-789-123',
        email: 'luis@email.com',
        fechaRegistro: '2024-01-20',
        totalReservas: 20,
        totalHoras: 40,
        totalGastado: 2000,
        ultimaReserva: '2024-03-22',
        reservasRealizadas: ['6', '7', '8'],
        estado: 'activo',
        categoria: 'diamante',
        notas: 'Cliente VIP, reserva semanal'
      },
      {
        id: '4',
        dni: '45678901',
        nombre: 'María López',
        telefono: '987-456-789',
        email: 'maria@email.com',
        fechaRegistro: '2024-02-10',
        totalReservas: 5,
        totalHoras: 10,
        totalGastado: 500,
        ultimaReserva: '2024-03-15',
        reservasRealizadas: ['9'],
        estado: 'activo',
        categoria: 'bronce',
        notas: 'Nueva cliente'
      },
      {
        id: '5',
        dni: '56789012',
        nombre: 'Roberto Silva',
        telefono: '987-321-654',
        email: 'roberto@email.com',
        fechaRegistro: '2024-01-05',
        totalReservas: 15,
        totalHoras: 30,
        totalGastado: 1500,
        ultimaReserva: '2024-03-10',
        reservasRealizadas: ['10', '11'],
        estado: 'inactivo',
        categoria: 'plata',
        notas: 'No ha reservado en 2 semanas'
      }
    ];
    
    setClientes(clientesEjemplo);
    setClientesFiltrados(clientesEjemplo);
  }, []);



  const getEstadoColor = (estado: string) => {
    return estado === 'activo' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const limpiarFiltros = () => {
    setFiltros({ nombre: '', estado: '' });
  };

  const aplicarFiltros = useCallback(() => {
    let filtrados = clientes;
    
    // Si no hay filtros activos, mostrar todos los clientes
    if (!filtros.nombre && !filtros.estado) {
      setClientesFiltrados(clientes);
      setPaginaActual(1);
      return;
    }
    
    if (filtros.nombre) {
      filtrados = filtrados.filter(cliente => 
        cliente.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
    
    if (filtros.estado) {
      filtrados = filtrados.filter(cliente => cliente.estado === filtros.estado);
    }
    
    setClientesFiltrados(filtrados);
    setPaginaActual(1);
  }, [clientes, filtros]);

  // Aplicar filtros automáticamente cuando cambien
  useEffect(() => {
    aplicarFiltros();
  }, [filtros]);

  // Inicializar clientesFiltrados con todos los clientes al cargar
  useEffect(() => {
    if (clientes.length > 0 && clientesFiltrados.length === 0) {
      setClientesFiltrados(clientes);
    }
  }, [clientes, clientesFiltrados.length]);

  const abrirModalDetalles = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setModalDetallesAbierto(true);
  };

  const cerrarModalDetalles = () => {
    setModalDetallesAbierto(false);
    setClienteSeleccionado(null);
  };

  const abrirModalEditar = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setModalEditarAbierto(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
    setClienteSeleccionado(null);
  };

  const abrirModalEliminar = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setModalEliminarAbierto(true);
  };

  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setClienteSeleccionado(null);
  };

  const eliminarCliente = () => {
    if (clienteSeleccionado) {
      setClientes(prevClientes => 
        prevClientes.filter(c => c.id !== clienteSeleccionado.id)
      );
      setClientesFiltrados(prevClientes => 
        prevClientes.filter(c => c.id !== clienteSeleccionado.id)
      );
      cerrarModalEliminar();
    }
  };

  const guardarClienteEditado = (clienteEditado: Cliente) => {
    setClientes(prevClientes => 
      prevClientes.map(c => c.id === clienteEditado.id ? clienteEditado : c)
    );
    setClientesFiltrados(prevClientes => 
      prevClientes.map(c => c.id === clienteEditado.id ? clienteEditado : c)
    );
    cerrarModalEditar();
  };

  // Paginación
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);
  const inicioIndice = (paginaActual - 1) * clientesPorPagina;
  const finIndice = inicioIndice + clientesPorPagina;
  const clientesPaginados = clientesFiltrados.slice(inicioIndice, finIndice);

  // Debug: verificar el estado de los clientes
  useEffect(() => {
    console.log('Clientes cargados:', clientes);
    console.log('Clientes filtrados:', clientesFiltrados);
    console.log('Clientes paginados:', clientesPaginados);
  }, [clientes, clientesFiltrados, clientesPaginados]);

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  const irAPrimeraPagina = () => setPaginaActual(1);
  const irAUltimaPagina = () => setPaginaActual(totalPaginas);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Gestión de Clientes</h1>
              <p className="text-slate-600 mt-2">
                Control y fidelización de clientes del sistema
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{clientes.length}</p>
                  <p className="text-xs text-slate-500">Total Clientes</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {clientes.filter(c => c.estado === 'activo').length}
                  </p>
                  <p className="text-xs text-slate-500">Clientes Activos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Buscar por nombre
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={filtros.nombre}
                  onChange={(e) => handleFiltroChange('nombre', e.target.value)}
                  placeholder="Nombre del cliente..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            

            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => handleFiltroChange('estado', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={limpiarFiltros}
                className="px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors duration-200"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Clientes */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-header text-center">Cliente</th>
                  <th className="table-header text-center">Contacto</th>
                  <th className="table-header text-center">Estadísticas</th>
                  <th className="table-header text-center">Estado</th>
                  <th className="table-header text-center">Última Reserva</th>
                  <th className="table-header text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {clientesPaginados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{cliente.nombre}</div>
                          <div className="text-sm text-slate-500">ID: {cliente.id}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="table-cell">
                      <div className="text-sm text-slate-900">
                        <div className="mb-1">
                          {cliente.telefono}
                        </div>
                        {cliente.email && (
                          <div className="text-slate-500 text-xs">{cliente.email}</div>
                        )}
                      </div>
                    </td>
                    
                    <td className="table-cell">
                      <div className="text-sm text-slate-900">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-semibold text-blue-600">{cliente.totalReservas}</div>
                            <div className="text-slate-500">Reservas</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-green-600">{cliente.totalHoras}h</div>
                            <div className="text-slate-500">Horas</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-purple-600">S/ {cliente.totalGastado}</div>
                            <div className="text-slate-500">Total</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(cliente.estado)}`}>
                        {cliente.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    
                    <td className="table-cell">
                      <div className="text-sm text-slate-900">
                        {cliente.ultimaReserva ? (
                          <div>
                            {cliente.ultimaReserva}
                          </div>
                        ) : (
                          <span className="text-slate-400">Sin reservas</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="table-cell">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => abrirModalDetalles(cliente)}
                          className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => abrirModalEditar(cliente)}
                          className="inline-flex items-center justify-center p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all duration-200"
                          title="Editar cliente"
                        >
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => abrirModalEliminar(cliente)}
                          className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                          title="Eliminar cliente"
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

          {/* Controles de Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-200">
              <div className="flex items-center text-sm text-slate-700">
                <span>
                  Mostrando {inicioIndice + 1} a {Math.min(finIndice, clientesFiltrados.length)} de {clientesFiltrados.length} clientes
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

        {/* Cards para móvil */}
        <div className="md:hidden space-y-4 mt-6">
          {clientesPaginados.map((cliente) => (
            <div key={cliente.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">{cliente.nombre}</h3>
                  <p className="text-slate-600 text-sm">{cliente.telefono}</p>
                  {cliente.email && <p className="text-slate-500 text-xs">{cliente.email}</p>}
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(cliente.estado)}`}>
                    {cliente.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                <div className="text-center">
                  <span className="font-semibold text-blue-600">{cliente.totalReservas}</span>
                  <div className="text-xs text-slate-500">Reservas</div>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-green-600">{cliente.totalHoras}h</span>
                  <div className="text-xs text-slate-500">Horas</div>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-purple-600">S/ {cliente.totalGastado}</span>
                  <div className="text-xs text-slate-500">Total</div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                <button 
                  onClick={() => abrirModalDetalles(cliente)}
                  className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
                  title="Ver detalles"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => abrirModalEditar(cliente)}
                  className="inline-flex items-center justify-center p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all duration-200"
                  title="Editar cliente"
                >
                  <EditIcon className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => abrirModalEliminar(cliente)}
                  className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="Eliminar cliente"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modales */}
      <ModalDetallesCliente
        cliente={clienteSeleccionado}
        abierto={modalDetallesAbierto}
        onCerrar={cerrarModalDetalles}
      />
      
      <ModalEditarCliente
        cliente={clienteSeleccionado}
        abierto={modalEditarAbierto}
        onCerrar={cerrarModalEditar}
        onGuardar={guardarClienteEditado}
      />
      
      <ModalConfirmarEliminarCliente
        cliente={clienteSeleccionado}
        abierto={modalEliminarAbierto}
        onCerrar={cerrarModalEliminar}
        onConfirmar={eliminarCliente}
      />
    </div>
  );
};

export default Clientes;
