import React from "react";
import { Link } from "react-router-dom";

import { Reserva, EstadoReserva, OrigenReserva } from "../types/Reserva";

const Dashboard: React.FC = () => {
  // Usar los mismos datos que en Reservas.tsx
  const todasLasReservas: Reserva[] = [
    {
      id: "1",
      nombreCliente: "Juan Pérez",
      telefono: "123-456-7890",
      email: "juan@email.com",
      fecha: "2024-01-15",
      hora: "14:00",
      duracion: 2,
      cancha: "Cancha 1",
      estado: "pagado_confirmado" as EstadoReserva,
      precio: 120,
      metodoPago: "efectivo",
      fechaCreacion: "2024-01-10",
      origen: "local" as OrigenReserva,
      localId: "1",
      notas: "Cliente regular",
    },
    {
      id: "2",
      nombreCliente: "María García",
      telefono: "098-765-4321",
      email: "maria@email.com",
      fecha: "2024-01-16",
      hora: "16:00",
      duracion: 1,
      cancha: "Cancha 2",
      estado: "pendiente_de_pago" as EstadoReserva,
      precio: 60,
      metodoPago: "tarjeta",
      fechaCreacion: "2024-01-11",
      origen: "web" as OrigenReserva,
      localId: "1",
      notas: "Primera vez",
    },
    {
      id: "3",
      nombreCliente: "Carlos López",
      telefono: "555-123-4567",
      email: "carlos@email.com",
      fecha: "2024-01-17",
      hora: "18:00",
      duracion: 3,
      cancha: "Cancha 1",
      estado: "pendiente_de_pago" as EstadoReserva,
      precio: 180,
      metodoPago: "transferencia",
      fechaCreacion: "2024-01-12",
      origen: "local" as OrigenReserva,
      localId: "2",
      notas: "Grupo de amigos",
    },
    {
      id: "4",
      nombreCliente: "Ana Martínez",
      telefono: "987-654-3210",
      email: "ana@email.com",
      fecha: "2024-01-18",
      hora: "20:00",
      duracion: 2,
      cancha: "Cancha 3",
      estado: "pagado_confirmado" as EstadoReserva,
      precio: 120,
      metodoPago: "efectivo",
      fechaCreacion: "2024-01-13",
      origen: "web" as OrigenReserva,
      localId: "2",
      notas: "Cliente VIP",
    },
    {
      id: "5",
      nombreCliente: "Luis Rodríguez",
      telefono: "456-789-0123",
      email: "luis@email.com",
      fecha: "2024-01-19",
      hora: "10:00",
      duracion: 1,
      cancha: "Cancha 1",
      estado: "pendiente_de_pago" as EstadoReserva,
      precio: 60,
      metodoPago: "tarjeta",
      fechaCreacion: "2024-01-14",
      origen: "local" as OrigenReserva,
      localId: "1",
      notas: "Reserva matutina",
    },
    {
      id: "6",
      nombreCliente: "Carmen Silva",
      telefono: "789-012-3456",
      email: "carmen@email.com",
      fecha: "2024-01-20",
      hora: "15:00",
      duracion: 3,
      cancha: "Cancha 2",
      estado: "pagado_confirmado" as EstadoReserva,
      precio: 180,
      metodoPago: "transferencia",
      fechaCreacion: "2024-01-15",
      origen: "web" as OrigenReserva,
      localId: "3",
      notas: "Torneo local",
    },
    {
      id: "7",
      nombreCliente: "Roberto Torres",
      telefono: "321-654-0987",
      email: "roberto@email.com",
      fecha: "2024-01-21",
      hora: "17:00",
      duracion: 2,
      cancha: "Cancha 3",
      estado: "pendiente_de_pago" as EstadoReserva,
      precio: 120,
      metodoPago: "efectivo",
      fechaCreacion: "2024-01-16",
      origen: "local" as OrigenReserva,
      localId: "2",
      notas: "Cliente nuevo",
    },
    {
      id: "8",
      nombreCliente: "Patricia Vega",
      telefono: "654-321-0987",
      email: "patricia@email.com",
      fecha: "2024-01-22",
      hora: "19:00",
      duracion: 1,
      cancha: "Cancha 1",
      estado: "pagado_confirmado" as EstadoReserva,
      precio: 60,
      metodoPago: "yape",
      fechaCreacion: "2024-01-17",
      origen: "web" as OrigenReserva,
      localId: "1",
      notas: "Reserva express",
    },
  ];

  // Mostrar solo las más recientes (últimas 5)
  const reservasRecientes = todasLasReservas.slice(0, 5);

  // Datos de locales para mostrar nombres
  const locales = [
    { id: "1", nombre: "Complejo de Fútbol Norte" },
    { id: "2", nombre: "Complejo de Fútbol Sur" },
    { id: "3", nombre: "Complejo de Fútbol Este" },
  ];

  // Función para obtener nombre del local
  const getNombreLocal = (localId: string) => {
    const local = locales.find((l) => l.id === localId);
    return local ? local.nombre : "Local no encontrado";
  };

  // Calcular estadísticas reales basadas en los datos
  const totalReservas = todasLasReservas.length;
  const reservasPagadas = todasLasReservas.filter(
    (r) => r.estado === "pagado_confirmado",
  ).length;
  const ingresosTotales = todasLasReservas
    .filter((r) => r.estado === "pagado_confirmado")
    .reduce((total, r) => total + r.precio, 0);
  const clientesUnicos = new Set(todasLasReservas.map((r) => r.nombreCliente))
    .size;

  const estadisticas = [
    {
      titulo: "Total Reservas",
      valor: totalReservas.toString(),
      cambio: "+12%",
      color: "from-green-500 to-emerald-600",
      icono: "📅",
    },
    {
      titulo: "Ingresos Confirmados",
      valor: `S/ ${ingresosTotales.toLocaleString()}`,
      cambio: "+18%",
      color: "from-green-600 to-emerald-700",
      icono: "💰",
    },
    {
      titulo: "Clientes Únicos",
      valor: clientesUnicos.toString(),
      cambio: "+8%",
      color: "from-emerald-500 to-teal-600",
      icono: "👥",
    },
    {
      titulo: "Reservas Pagadas",
      valor: `${Math.round((reservasPagadas / totalReservas) * 100)}%`,
      cambio: "+5%",
      color: "from-green-500 to-emerald-600",
      icono: "⚽",
    },
  ];

  const getEstadoColor = (estado: EstadoReserva) => {
    switch (estado) {
      case "pagado_confirmado":
        return "bg-green-100 text-green-800";
      case "pendiente_de_pago":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstadoLabel = (estado: EstadoReserva) => {
    switch (estado) {
      case "pagado_confirmado":
        return "Pagado - Confirmado";
      case "pendiente_de_pago":
        return "Pendiente de Pago";
      default:
        return "Desconocido";
    }
  };

  // Función para formatear fecha (comentada porque no se usa actualmente)
  // const formatFecha = (fecha: string) => {
  //   return new Date(fecha).toLocaleDateString('es-ES', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric'
  //   });
  // };

  const formatFechaHora = (fecha: string, hora: string, duracion: number) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Calcular hora de fin (exactamente en horas)
    const [horaInicio, minutoInicio] = hora.split(":");
    const horaFin = parseInt(horaInicio) + duracion;
    const horaFinFormateada = `${horaFin.toString().padStart(2, "0")}:${minutoInicio}`;

    return (
      <div className="text-slate-600 font-medium">
        <div className="font-semibold">{fechaFormateada}</div>
        <div className="text-sm text-slate-500">
          {hora} - {horaFinFormateada}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 px-8 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-lg text-slate-600 mt-3">
            Bienvenido al panel de control de Cancha Sintética
          </p>
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
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.titulo}
                </p>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.valor}
                </p>
                <p className="text-sm font-medium text-green-600">
                  {stat.cambio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reservas Recientes */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Reservas Recientes
            </h2>
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
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead>
                <tr>
                  <th className="table-header">Cliente</th>
                  <th className="table-header">Teléfono</th>
                  <th className="table-header">Fecha y Horario</th>
                  <th className="table-header">Cancha</th>
                  <th className="table-header">Local</th>
                  <th className="table-header">Precio</th>
                  <th className="table-header">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y-2 divide-gray-100">
                {reservasRecientes.map((reserva) => (
                  <tr key={reserva.id} className="table-row">
                    <td className="table-cell">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {reserva.nombreCliente}
                        </div>
                        <div className="text-xs text-slate-500">
                          {reserva.email}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {reserva.telefono}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {formatFechaHora(
                          reserva.fecha,
                          reserva.hora,
                          reserva.duracion,
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {reserva.cancha}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-slate-600 font-medium">
                        {getNombreLocal(reserva.localId)}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="font-bold text-slate-900 text-lg">
                        S/ {reserva.precio}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(reserva.estado)}`}
                      >
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
              <div
                key={reserva.id}
                className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">
                      {reserva.nombreCliente}
                    </h3>
                    <p className="text-slate-600 text-sm mb-1">
                      {formatFechaHora(
                        reserva.fecha,
                        reserva.hora,
                        reserva.duracion,
                      )}
                    </p>
                    <p className="text-slate-600 text-sm">{reserva.cancha}</p>
                    <p className="text-slate-600 text-sm font-medium">
                      {getNombreLocal(reserva.localId)}
                    </p>
                    <p className="text-slate-500 text-xs">{reserva.email}</p>
                    <p className="text-slate-500 text-xs">{reserva.telefono}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-slate-900 text-lg mb-2">
                      S/ {reserva.precio}
                    </p>
                    <span
                      className={`status-badge ${getEstadoColor(reserva.estado)}`}
                    >
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
          <h2 className="text-2xl font-bold text-slate-900">
            Próximas Reservas del Día
          </h2>
          <span className="text-sm text-slate-500 font-medium">Hoy</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-medium">
                En 30 min
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              Juan Pérez
            </h3>
            <p className="text-slate-600 text-sm mb-1">Cancha 1 - Fútbol</p>
            <p className="text-slate-600 text-sm mb-3">18:00 - 20:00</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">S/ 80</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Pagado - Confirmado
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-medium">
                En 1 hora
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              María García
            </h3>
            <p className="text-slate-600 text-sm mb-1">Cancha 2 - Fútbol</p>
            <p className="text-slate-600 text-sm mb-3">19:00 - 20:00</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">S/ 45</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                Pendiente de Pago
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-500 font-medium">
                En 2 horas
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              Carlos López
            </h3>
            <p className="text-slate-600 text-sm mb-1">Cancha 3 - Fútbol</p>
            <p className="text-slate-600 text-sm mb-3">20:00 - 22:00</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-bold text-lg">S/ 120</span>
              <span className="px-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Pagado - Confirmado
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
