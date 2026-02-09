import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, DollarSign, Users, Percent, ChevronLeft, ChevronRight } from "lucide-react";

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
        return "bg-emerald-500/25 text-emerald-800 font-bold dark:bg-emerald-500/30 dark:text-emerald-200";
      case "pagado_pendiente_confirmacion":
        return "bg-sky-500/25 text-sky-800 font-bold dark:bg-sky-500/30 dark:text-sky-200";
      case "pendiente_de_pago":
        return "bg-amber-500/25 text-amber-800 font-bold dark:bg-amber-500/30 dark:text-amber-200";
      case "cancelado":
        return "bg-rose-500/25 text-rose-800 font-bold dark:bg-rose-500/30 dark:text-rose-200";
      case "rechazado":
        return "bg-red-500/25 text-red-800 font-bold dark:bg-red-500/30 dark:text-red-200";
      default:
        return "bg-red-500/25 text-red-800 font-bold dark:bg-red-500/30 dark:text-red-200";
    }
  };

  const getEstadoLabel = (estado: EstadoReserva) => {
    switch (estado) {
      case "pagado_confirmado":
        return "Pagado - Confirmado";
      case "pagado_pendiente_confirmacion":
        return "Pendiente de confirmación";
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

  const carouselRef = useRef<HTMLDivElement>(null);

  const proximasReservasHoy = [
    { nombre: "Juan Pérez", cancha: "Cancha 1 - Fútbol", horario: "18:00 - 20:00", precio: 80, estado: "pagado_confirmado" as EstadoReserva, tiempoFalta: "En 30 min", statusColor: "bg-green-500" },
    { nombre: "María García", cancha: "Cancha 2 - Fútbol", horario: "19:00 - 20:00", precio: 45, estado: "pendiente_de_pago" as EstadoReserva, tiempoFalta: "En 1 hora", statusColor: "bg-orange-500" },
    { nombre: "Carlos López", cancha: "Cancha 3 - Fútbol", horario: "20:00 - 22:00", precio: 120, estado: "pagado_confirmado" as EstadoReserva, tiempoFalta: "En 2 horas", statusColor: "bg-green-500" },
    { nombre: "Ana Martínez", cancha: "Cancha 1 - Fútbol", horario: "21:00 - 23:00", precio: 120, estado: "pagado_confirmado" as EstadoReserva, tiempoFalta: "En 3 horas", statusColor: "bg-green-500" },
  ];

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const gap = 16;
    const cardWidth = (carouselRef.current.clientWidth - gap * 2) / 3;
    const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
    <div className="space-y-8 px-4 sm:px-5 lg:px-6 py-7">
      <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800 py-7 px-5 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        </div>

        {/* Cards de métricas (4 KPIs con el mismo fondo que la página en dark) */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101f28] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-800">
            {estadisticas.map((stat, index) => (
              <div
                key={index}
                className="py-6 px-6 first:pt-0 sm:first:pt-6 last:pb-0 sm:last:pb-6"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  {stat.titulo}
                </p>
                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {stat.valor}
                  </p>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-sm font-semibold ${
                      stat.cambioPositivo
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                    }`}
                  >
                    {stat.cambio}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 pt-6 pb-4 sm:pt-4 sm:pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Reservas Recientes
              </h2>
            </div>
            <Link
              to="/reservas"
              className="inline-flex items-center justify-center shrink-0 bg-white dark:bg-[#101f28] border border-slate-200 dark:border-[#344054] text-slate-700 dark:text-slate-200 font-medium py-2.5 px-5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#152832] hover:border-slate-400 transition-all duration-200"
            >
              Ver todas
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#101f28]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">Teléfono</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">Fecha y Horario</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">Cancha</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">Local</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#667085] dark:text-slate-400">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent">
                {reservasRecientes.map((reserva, index) => (
                  <tr
                    key={reserva.id}
                    className="border-b border-gray-200 dark:border-gray-800 last:border-b-0 bg-white dark:bg-transparent hover:bg-gray-50/50 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
                        >
                          {getIniciales(reserva.nombreCliente)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            {reserva.nombreCliente}
                          </div>
                          <div className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">
                            {reserva.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                      {reserva.telefono}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                      {formatFechaHora(
                        reserva.fecha,
                        reserva.hora,
                        reserva.duracion,
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                      {reserva.cancha}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">
                      {getNombreLocal(reserva.localId)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
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
                className="bg-gray-50 dark:bg-white/[0.03] rounded-lg border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
                    >
                      {getIniciales(reserva.nombreCliente)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {reserva.nombreCliente}
                      </h3>
                    <p className="text-gray-600 dark:text-slate-300 text-sm mb-1">
                      {formatFechaHora(
                        reserva.fecha,
                        reserva.hora,
                        reserva.duracion,
                      )}
                    </p>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">{reserva.cancha}</p>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">
                      {getNombreLocal(reserva.localId)}
                    </p>
                    <p className="text-gray-500 dark:text-slate-400 text-xs mt-1">{reserva.email}</p>
                    <p className="text-gray-500 dark:text-slate-400 text-xs">{reserva.telefono}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">
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

      <section className="bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Próximas Reservas del Día
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-200 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-200 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-5 px-5 scroll-smooth scrollbar-hide"
        >
          {proximasReservasHoy.map((reserva) => (
            <div
              key={reserva.nombre + reserva.horario}
              className="flex-[0_0_calc((100%-2rem)/3)] min-w-0 flex-shrink-0 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-white/[0.03] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-3 h-3 rounded-full ${reserva.statusColor}`} />
                <span className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                  {reserva.tiempoFalta}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
                {reserva.nombre}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">{reserva.cancha}</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{reserva.horario}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 dark:text-emerald-400 font-bold text-lg">
                  S/ {reserva.precio}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getEstadoColor(reserva.estado)}`}
                >
                  {getEstadoLabel(reserva.estado)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
