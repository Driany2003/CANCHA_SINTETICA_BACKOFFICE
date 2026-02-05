import React from "react";
import { Link } from "react-router-dom";
import { Calendar, DollarSign, Users, Percent } from "lucide-react";

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
      cambioPositivo: true,
      Icono: Calendar,
      iconoBg: "bg-blue-100",
      iconoColor: "text-blue-600",
    },
    {
      titulo: "Ingresos Confirmados",
      valor: `S/ ${ingresosTotales.toLocaleString()}`,
      cambio: "+18%",
      cambioPositivo: true,
      Icono: DollarSign,
      iconoBg: "bg-emerald-100",
      iconoColor: "text-emerald-600",
    },
    {
      titulo: "Clientes Únicos",
      valor: clientesUnicos.toString(),
      cambio: "+8%",
      cambioPositivo: true,
      Icono: Users,
      iconoBg: "bg-violet-100",
      iconoColor: "text-violet-600",
    },
    {
      titulo: "Reservas Pagadas",
      valor: `${Math.round((reservasPagadas / totalReservas) * 100)}%`,
      cambio: "+5%",
      cambioPositivo: true,
      Icono: Percent,
      iconoBg: "bg-amber-100",
      iconoColor: "text-amber-600",
    },
  ];

  const getEstadoColor = (estado: EstadoReserva) => {
    switch (estado) {
      case "pagado_confirmado":
        return "bg-emerald-100 text-emerald-600 font-bold";
      case "pendiente_de_pago":
        return "bg-amber-100 text-amber-600 font-bold";
      default:
        return "bg-red-100 text-red-600 font-bold";
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

  const getIniciales = (nombre: string) => {
    const partes = nombre.trim().split(/\s+/);
    if (partes.length >= 2) {
      return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
    }
    return nombre.slice(0, 2).toUpperCase();
  };

  const AVATAR_COLORS = [
    "bg-rose-400",
    "bg-amber-400",
    "bg-orange-400",
    "bg-violet-400",
    "bg-emerald-400",
    "bg-sky-400",
  ];

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
      {/* Card exterior: envuelve todo (título + card interior) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        </div>

        {/* Card interior: envuelve solo las 4 métricas */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {estadisticas.map((stat, index) => {
            const IconComponent = stat.Icono;
            return (
              <div
                key={index}
                className="py-6 px-6 first:pt-0 sm:first:pt-6 last:pb-0 sm:last:pb-6 flex items-stretch gap-4"
              >
                {/* Icono grande a la izquierda */}
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${stat.iconoBg} ${stat.iconoColor}`}>
                  <IconComponent className="h-8 w-8" strokeWidth={2} />
                </div>
                {/* Contenido a la derecha: valor, etiqueta y badge */}
                <div className="flex flex-col justify-center min-w-0">
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {stat.valor}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.titulo}
                    </p>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        stat.cambioPositivo
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {stat.cambio}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Reservas Recientes - estilo Recent Invoices */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-4 sm:px-8 sm:pt-4 sm:pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Reservas Recientes
              </h2>
            </div>
            <Link
              to="/reservas"
              className="inline-flex items-center justify-center shrink-0 bg-white border border-slate-200 text-slate-700 font-medium py-2.5 px-5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              Ver todas
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Tabla para desktop */}
          <div className="hidden md:block">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Teléfono
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Fecha y Horario
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Cancha
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Local
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {reservasRecientes.map((reserva, index) => (
                  <tr
                    key={reserva.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
                        >
                          {getIniciales(reserva.nombreCliente)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {reserva.nombreCliente}
                          </div>
                          <div className="text-gray-500 text-sm mt-0.5">
                            {reserva.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {reserva.telefono}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatFechaHora(
                        reserva.fecha,
                        reserva.hora,
                        reserva.duracion,
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {reserva.cancha}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getNombreLocal(reserva.localId)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      S/ {reserva.precio}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${getEstadoColor(reserva.estado)}`}
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
          <div className="md:hidden p-4 space-y-4">
            {reservasRecientes.map((reserva, index) => (
              <div
                key={reserva.id}
                className="bg-gray-50 rounded-lg border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
                    >
                      {getIniciales(reserva.nombreCliente)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {reserva.nombreCliente}
                      </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      {formatFechaHora(
                        reserva.fecha,
                        reserva.hora,
                        reserva.duracion,
                      )}
                    </p>
                    <p className="text-gray-600 text-sm">{reserva.cancha}</p>
                    <p className="text-gray-600 text-sm">
                      {getNombreLocal(reserva.localId)}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{reserva.email}</p>
                    <p className="text-gray-500 text-xs">{reserva.telefono}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-900 mb-2">
                      S/ {reserva.precio}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${getEstadoColor(reserva.estado)}`}
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
