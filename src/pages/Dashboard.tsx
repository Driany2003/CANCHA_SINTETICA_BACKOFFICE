import React from 'react';
import { Link } from 'react-router-dom';

import { Reserva, EstadoReserva } from '../types/Reserva';

const Dashboard: React.FC = () => {
  const estadisticas = [
    {
      titulo: 'Total Reservas',
      valor: '156',
      cambio: '+12%',
      color: 'from-green-500 to-emerald-600',
      icono: '📅'
    },
    {
      titulo: 'Ingresos del Mes',
      valor: 'S/ 9,840',
      cambio: '+18%',
      color: 'from-green-600 to-emerald-700',
      icono: '💰'
    },
    {
      titulo: 'Clientes Activos',
      valor: '89',
      cambio: '+8%',
      color: 'from-emerald-500 to-teal-600',
      icono: '👥'
    },
    {
      titulo: 'Canchas Ocupadas',
      valor: '78%',
      cambio: '+5%',
      color: 'from-green-500 to-emerald-600',
      icono: '⚽'
    }
  ];

  const reservasRecientes: Reserva[] = [
    {
      id: '1',
      nombreCliente: 'Juan Pérez',
      telefono: '51 912345678',
      email: 'juan.perez@email.com',
      fecha: '2024-01-15',
      hora: '18:00',
      duracion: 2,
      cancha: 'Cancha 1',
      precio: 120,
      estado: 'pagado_confirmado' as EstadoReserva,
      metodoPago: 'efectivo',
      notas: 'Cliente regular',
      fechaCreacion: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      nombreCliente: 'María García',
      telefono: '51 923456789',
      email: 'maria.garcia@email.com',
      fecha: '2024-01-15',
      hora: '20:00',
      duracion: 1,
      cancha: 'Cancha 2',
      precio: 60,
      estado: 'pendiente_de_pago' as EstadoReserva,
      metodoPago: 'tarjeta',
      notas: 'Primera vez',
      fechaCreacion: '2024-01-12T14:30:00Z'
    },
    {
      id: '3',
      nombreCliente: 'Carlos López',
      telefono: '51 934567890',
      email: 'carlos.lopez@email.com',
      fecha: '2024-01-16',
      hora: '19:00',
      duracion: 2,
      cancha: 'Cancha 3',
      precio: 120,
      estado: 'pagado_confirmado' as EstadoReserva,
      metodoPago: 'transferencia',
      notas: '',
      fechaCreacion: '2024-01-13T16:45:00Z'
    }
  ];

  const getEstadoColor = (estado: EstadoReserva) => {
    switch (estado) {
      case 'pagado_confirmado':
        return 'status-confirmed';
      case 'pendiente_de_pago':
        return 'status-pending-payment';
      default:
        return 'status-pending-payment';
    }
  };

  const getEstadoLabel = (estado: EstadoReserva) => {
    switch (estado) {
      case 'pagado_confirmado':
        return 'Pagado - Confirmado';
      case 'pendiente_de_pago':
        return 'Pendiente de Pago';
      default:
        return 'Pendiente de Pago';
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
    
    return `${fechaFormateada} - ${hora} a ${horaFinFormateada}`;
  };

  return (
    <div className="space-y-8 px-8 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <p className="text-lg text-slate-600 mt-3">Bienvenido al panel de control de Cancha Sintética</p>
        </div>

      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {estadisticas.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center space-x-4">
              <div className={`stat-icon bg-gradient-to-br ${stat.color}`}>
                <span className="text-3xl">{stat.icono}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.titulo}</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.valor}</p>
                <p className="text-sm font-medium text-green-600">{stat.cambio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reservas Recientes */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Reservas Recientes</h2>
            <p className="text-slate-600">Últimas reservas del sistema</p>
          </div>
          <Link
            to="/reservas"
            className="btn-outline flex items-center justify-center"
          >
            Ver todas
          </Link>
        </div>
        
        <div className="overflow-hidden">
          {/* Tabla para desktop */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-green-200">
              <thead>
                <tr>
                  <th className="table-header">Cliente</th>
                  <th className="table-header">Teléfono</th>
                  <th className="table-header">Fecha y Horario</th>
                  <th className="table-header">Cancha</th>
                  <th className="table-header">Precio</th>
                  <th className="table-header">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-200">
                {reservasRecientes.map((reserva) => (
                  <tr key={reserva.id} className="table-row">
                    <td className="table-cell">
                      <div>
                        <div className="font-semibold text-slate-900">{reserva.nombreCliente}</div>
                        <div className="text-xs text-slate-500">{reserva.email}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">{reserva.telefono}</div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">{formatFechaHora(reserva.fecha, reserva.hora, reserva.duracion)}</div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">{reserva.cancha}</div>
                    </td>
                    <td className="table-cell">
                      <div className="font-bold text-slate-900 text-lg">S/ {reserva.precio}</div>
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge ${getEstadoColor(reserva.estado)}`}>
                        {getEstadoLabel(reserva.estado)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards para móvil */}
          <div className="md:hidden space-y-4">
            {reservasRecientes.map((reserva) => (
              <div key={reserva.id} className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                                      <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-lg mb-1">{reserva.nombreCliente}</h3>
                      <p className="text-slate-600 text-sm mb-1">{formatFechaHora(reserva.fecha, reserva.hora, reserva.duracion)}</p>
                      <p className="text-slate-600 text-sm">{reserva.cancha}</p>
                      <p className="text-slate-500 text-xs">{reserva.email}</p>
                      <p className="text-slate-500 text-xs">{reserva.telefono}</p>
                    </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-slate-900 text-lg mb-2">S/ {reserva.precio}</p>
                    <span className={`status-badge ${getEstadoColor(reserva.estado)}`}>
                      {getEstadoLabel(reserva.estado)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Próximas Reservas del Día */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Próximas Reservas del Día</h2>
          <span className="text-sm text-slate-500 font-medium">Hoy</span>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-medium">En 30 min</span>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">Juan Pérez</h3>
            <p className="text-slate-600 text-sm mb-1">Cancha 1 - Fútbol</p>
            <p className="text-slate-600 text-sm mb-3">18:00 - 20:00</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">S/ 80</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Pagado - Confirmado</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-medium">En 1 hora</span>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">María García</h3>
            <p className="text-slate-600 text-sm mb-1">Cancha 2 - Fútbol</p>
            <p className="text-slate-600 text-sm mb-3">19:00 - 20:00</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">S/ 45</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Pendiente de Pago</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-medium">En 2 horas</span>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">Carlos López</h3>
            <p className="text-slate-600 text-sm mb-1">Cancha 3 - Fútbol</p>
            <p className="text-slate-600 text-sm mb-3">20:00 - 22:00</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">S/ 120</span>
              <span className="px-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Pagado - Confirmado</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
