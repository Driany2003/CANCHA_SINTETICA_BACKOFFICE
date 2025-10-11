import React, { useState, useMemo } from 'react';
import { 
  DownloadIcon,
  ChartIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '../components/icons/Icons';
import { Local } from '../types/Empresa';
import { Reserva, EstadoReserva, OrigenReserva } from '../types/Reserva';

const Reportes: React.FC = () => {
  const [filtroActivo, setFiltroActivo] = useState('diario');
  const [localSeleccionado, setLocalSeleccionado] = useState<string>('');
  const [vistaDetallada, setVistaDetallada] = useState(false);

  // Datos históricos de reservas para análisis semanal y mensual
  const todasLasReservas: Reserva[] = useMemo(() => [
    // Enero 2024 - Semana 1
    {
      id: '1',
      nombreCliente: 'Juan Pérez',
      telefono: '123-456-7890',
      email: 'juan@email.com',
      fecha: '2024-01-02',
      hora: '14:00',
      duracion: 2,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-01-01',
      origen: 'local' as OrigenReserva,
      localId: '1',
      notas: 'Cliente regular'
    },
    {
      id: '2',
      nombreCliente: 'María García',
      telefono: '098-765-4321',
      email: 'maria@email.com',
      fecha: '2024-01-03',
      hora: '16:00',
      duracion: 1,
      cancha: 'Cancha 2',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 60,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-01-02',
      origen: 'web' as OrigenReserva,
      localId: '1',
      notas: 'Primera vez'
    },
    // Enero 2024 - Semana 2
    {
      id: '3',
      nombreCliente: 'Carlos López',
      telefono: '555-123-4567',
      email: 'carlos@email.com',
      fecha: '2024-01-08',
      hora: '18:00',
      duracion: 3,
      cancha: 'Cancha 1',
      estado: 'pendiente_de_pago' as EstadoReserva,
      precio: 180,
      metodoPago: 'transferencia',
      fechaCreacion: '2024-01-07',
      origen: 'local' as OrigenReserva,
      localId: '2',
      notas: 'Grupo de amigos'
    },
    {
      id: '4',
      nombreCliente: 'Ana Martínez',
      telefono: '987-654-3210',
      email: 'ana@email.com',
      fecha: '2024-01-10',
      hora: '20:00',
      duracion: 2,
      cancha: 'Cancha 3',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-01-09',
      origen: 'web' as OrigenReserva,
      localId: '2',
      notas: 'Cliente VIP'
    },
    // Enero 2024 - Semana 3
    {
      id: '5',
      nombreCliente: 'Luis Rodríguez',
      telefono: '456-789-0123',
      email: 'luis@email.com',
      fecha: '2024-01-15',
      hora: '10:00',
      duracion: 1,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 60,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-01-14',
      origen: 'local' as OrigenReserva,
      localId: '1',
      notas: 'Reserva matutina'
    },
    {
      id: '6',
      nombreCliente: 'Carmen Silva',
      telefono: '789-012-3456',
      email: 'carmen@email.com',
      fecha: '2024-01-17',
      hora: '15:00',
      duracion: 3,
      cancha: 'Cancha 2',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 180,
      metodoPago: 'transferencia',
      fechaCreacion: '2024-01-16',
      origen: 'web' as OrigenReserva,
      localId: '3',
      notas: 'Torneo local'
    },
    // Enero 2024 - Semana 4
    {
      id: '7',
      nombreCliente: 'Roberto Torres',
      telefono: '321-654-0987',
      email: 'roberto@email.com',
      fecha: '2024-01-22',
      hora: '17:00',
      duracion: 2,
      cancha: 'Cancha 3',
      estado: 'pendiente_de_pago' as EstadoReserva,
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-01-21',
      origen: 'local' as OrigenReserva,
      localId: '2',
      notas: 'Cliente nuevo'
    },
    {
      id: '8',
      nombreCliente: 'Patricia Vega',
      telefono: '654-321-0987',
      email: 'patricia@email.com',
      fecha: '2024-01-25',
      hora: '19:00',
      duracion: 1,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 60,
      metodoPago: 'yape',
      fechaCreacion: '2024-01-24',
      origen: 'web' as OrigenReserva,
      localId: '1',
      notas: 'Reserva express'
    },
    // Febrero 2024 - Semana 1
    {
      id: '9',
      nombreCliente: 'Diego Morales',
      telefono: '111-222-3333',
      email: 'diego@email.com',
      fecha: '2024-02-05',
      hora: '16:00',
      duracion: 2,
      cancha: 'Cancha 2',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-02-04',
      origen: 'local' as OrigenReserva,
      localId: '1',
      notas: 'Entrenamiento'
    },
    {
      id: '10',
      nombreCliente: 'Elena Ruiz',
      telefono: '444-555-6666',
      email: 'elena@email.com',
      fecha: '2024-02-07',
      hora: '18:00',
      duracion: 1,
      cancha: 'Cancha 1',
      estado: 'pendiente_de_pago' as EstadoReserva,
      precio: 60,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-02-06',
      origen: 'web' as OrigenReserva,
      localId: '2',
      notas: 'Partido amistoso'
    },
    // Febrero 2024 - Semana 2
    {
      id: '11',
      nombreCliente: 'Fernando Castro',
      telefono: '777-888-9999',
      email: 'fernando@email.com',
      fecha: '2024-02-12',
      hora: '20:00',
      duracion: 2,
      cancha: 'Cancha 3',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'transferencia',
      fechaCreacion: '2024-02-11',
      origen: 'local' as OrigenReserva,
      localId: '3',
      notas: 'Liga local'
    },
    {
      id: '12',
      nombreCliente: 'Gabriela Herrera',
      telefono: '000-111-2222',
      email: 'gabriela@email.com',
      fecha: '2024-02-14',
      hora: '15:00',
      duracion: 3,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 180,
      metodoPago: 'yape',
      fechaCreacion: '2024-02-13',
      origen: 'web' as OrigenReserva,
      localId: '1',
      notas: 'Torneo San Valentín'
    },
    // Febrero 2024 - Semana 3
    {
      id: '13',
      nombreCliente: 'Héctor Jiménez',
      telefono: '333-444-5555',
      email: 'hector@email.com',
      fecha: '2024-02-19',
      hora: '14:00',
      duracion: 1,
      cancha: 'Cancha 2',
      estado: 'pendiente_de_pago' as EstadoReserva,
      precio: 60,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-02-18',
      origen: 'local' as OrigenReserva,
      localId: '2',
      notas: 'Práctica individual'
    },
    {
      id: '14',
      nombreCliente: 'Isabel Mendoza',
      telefono: '666-777-8888',
      email: 'isabel@email.com',
      fecha: '2024-02-21',
      hora: '17:00',
      duracion: 2,
      cancha: 'Cancha 3',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'tarjeta',
      fechaCreacion: '2024-02-20',
      origen: 'web' as OrigenReserva,
      localId: '3',
      notas: 'Equipo femenino'
    },
    // Marzo 2024 - Semana 1
    {
      id: '15',
      nombreCliente: 'Javier Ortega',
      telefono: '999-000-1111',
      email: 'javier@email.com',
      fecha: '2024-03-04',
      hora: '19:00',
      duracion: 2,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'plin',
      fechaCreacion: '2024-03-03',
      origen: 'local' as OrigenReserva,
      localId: '1',
      notas: 'Inicio de temporada'
    },
    {
      id: '16',
      nombreCliente: 'Karla Sánchez',
      telefono: '222-333-4444',
      email: 'karla@email.com',
      fecha: '2024-03-06',
      hora: '16:00',
      duracion: 1,
      cancha: 'Cancha 2',
      estado: 'pendiente_de_pago' as EstadoReserva,
      precio: 60,
      metodoPago: 'transferencia',
      fechaCreacion: '2024-03-05',
      origen: 'web' as OrigenReserva,
      localId: '2',
      notas: 'Reserva de prueba'
    },
    // Marzo 2024 - Semana 2
    {
      id: '17',
      nombreCliente: 'Leonardo Vargas',
      telefono: '555-666-7777',
      email: 'leonardo@email.com',
      fecha: '2024-03-11',
      hora: '18:00',
      duracion: 3,
      cancha: 'Cancha 3',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 180,
      metodoPago: 'efectivo',
      fechaCreacion: '2024-03-10',
      origen: 'local' as OrigenReserva,
      localId: '3',
      notas: 'Campeonato interno'
    },
    {
      id: '18',
      nombreCliente: 'Mónica Delgado',
      telefono: '888-999-0000',
      email: 'monica@email.com',
      fecha: '2024-03-13',
      hora: '20:00',
      duracion: 2,
      cancha: 'Cancha 1',
      estado: 'pagado_confirmado' as EstadoReserva,
      precio: 120,
      metodoPago: 'yape',
      fechaCreacion: '2024-03-12',
      origen: 'web' as OrigenReserva,
      localId: '1',
      notas: 'Partido nocturno'
    }
  ], []);

  // ID del dueño actual (en un sistema real esto vendría de la autenticación)
  // const empresaActualId = 'empresa_1'; // No usado actualmente

  // Datos de ejemplo de locales
  const locales: Local[] = [
    {
      id: '1',
      nombre: 'Complejo de Fútbol Norte',
      direccion: 'Av. Principal 123, Lima Norte',
      telefono: '+51 987 654 321',
      email: 'norte@complejofutbol.com',
      activo: true,
      fechaCreacion: '2024-01-01',
      empresaId: 'empresa_1',
      canchas: [
        {
          id: '1',
          nombre: 'Cancha Principal',
          tipo: 'Fútbol 11',
          precioHora: 60,
          disponible: true,
          imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
          localId: '1'
        },
        {
          id: '2',
          nombre: 'Cancha Secundaria',
          tipo: 'Fútbol 7',
          precioHora: 80,
          disponible: true,
          imagen: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
          localId: '1'
        }
      ]
    },
    {
      id: '2',
      nombre: 'Centro de Fútbol Sur',
      direccion: 'Jr. Deportes 456, Lima Sur',
      telefono: '+51 987 654 322',
      email: 'sur@centrofutbol.com',
      activo: true,
      fechaCreacion: '2024-01-15',
      empresaId: 'empresa_1',
      canchas: [
        {
          id: '3',
          nombre: 'Cancha Fútbol 5',
          tipo: 'Fútbol 5',
          precioHora: 50,
          disponible: false,
          imagen: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop',
          localId: '2'
        },
        {
          id: '4',
          nombre: 'Cancha Fútbol 8',
          tipo: 'Fútbol 8',
          precioHora: 65,
          disponible: true,
          imagen: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
          localId: '2'
        },
        {
          id: '5',
          nombre: 'Cancha Fútbol 9',
          tipo: 'Fútbol 9',
          precioHora: 70,
          disponible: true,
          imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
          localId: '2'
        }
      ]
    },
    {
      id: '3',
      nombre: 'Estadio de Fútbol Este',
      direccion: 'Av. Deportiva 789, Lima Este',
      telefono: '+51 987 654 323',
      email: 'este@estadiofutbol.com',
      activo: true,
      fechaCreacion: '2024-02-01',
      empresaId: 'empresa_1',
      canchas: [
        {
          id: '6',
          nombre: 'Cancha Olímpica',
          tipo: 'Fútbol 11',
          precioHora: 100,
          disponible: true,
          imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
          localId: '3'
        }
      ]
    }
  ];



  // Calcular datos dinámicamente basados en las reservas reales por período
  const calcularDatosPorPeriodo = useMemo(() => {
    const reservasFiltradas = localSeleccionado 
      ? todasLasReservas.filter(r => r.localId === localSeleccionado)
      : todasLasReservas;

    // Función para obtener la clave del período
    const obtenerClavePeriodo = (fecha: string) => {
      const fechaObj = new Date(fecha);
      
      switch (filtroActivo) {
        case 'semanal':
          // Obtener el lunes de la semana
          const dia = fechaObj.getDay();
          const diff = fechaObj.getDate() - dia + (dia === 0 ? -6 : 1); // Ajustar para que lunes sea el primer día
          const lunes = new Date(fechaObj.setDate(diff));
          return `${lunes.getFullYear()}-W${Math.ceil((lunes.getDate() + new Date(lunes.getFullYear(), 0, 1).getDay()) / 7)}`;
        
        case 'mensual':
          return `${fechaObj.getFullYear()}-${String(fechaObj.getMonth() + 1).padStart(2, '0')}`;
        
        default: // diario
          return fecha;
      }
    };

    // Función para obtener el label del período
    const obtenerLabelPeriodo = (clave: string, fechaEjemplo: string) => {
      const fechaObj = new Date(fechaEjemplo);
      
      switch (filtroActivo) {
        case 'semanal':
          const inicioSemana = new Date(fechaObj);
          const dia = inicioSemana.getDay();
          const diff = inicioSemana.getDate() - dia + (dia === 0 ? -6 : 1);
          inicioSemana.setDate(diff);
          const finSemana = new Date(inicioSemana);
          finSemana.setDate(inicioSemana.getDate() + 6);
          return `${inicioSemana.getDate()}/${inicioSemana.getMonth() + 1} - ${finSemana.getDate()}/${finSemana.getMonth() + 1}`;
        
        case 'mensual':
          const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          return `${meses[fechaObj.getMonth()]} ${fechaObj.getFullYear()}`;
        
        default: // diario
          return fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      }
    };

    // Agrupar por período
    const datosPorPeriodo = reservasFiltradas.reduce((acc, reserva) => {
      const clavePeriodo = obtenerClavePeriodo(reserva.fecha);
      if (!acc[clavePeriodo]) {
        acc[clavePeriodo] = { 
          fecha: obtenerLabelPeriodo(clavePeriodo, reserva.fecha), 
          reservas: 0, 
          ingresos: 0, 
          ingresosConfirmados: 0,
          fechaOriginal: reserva.fecha // Para ordenamiento
        };
      }
      acc[clavePeriodo].reservas += 1;
      acc[clavePeriodo].ingresos += reserva.precio;
      if (reserva.estado === 'pagado_confirmado') {
        acc[clavePeriodo].ingresosConfirmados += reserva.precio;
      }
      return acc;
    }, {} as Record<string, { fecha: string; reservas: number; ingresos: number; ingresosConfirmados: number; fechaOriginal: string }>);

    return Object.values(datosPorPeriodo).sort((a, b) => a.fechaOriginal.localeCompare(b.fechaOriginal));
  }, [todasLasReservas, localSeleccionado, filtroActivo]);

  const localActual = locales.find(local => local.id === localSeleccionado);

  // Configuración de comisiones y tarifas
  const COMISION_RAKI = 0.035; // 3.5% por cada transacción (web y local)
  const IGV_RATE = 0.18; // 18% IGV

  // Cálculos financieros detallados (usa el mismo filtrado por período)
  const calcularMetricasFinancieras = useMemo(() => {
    const reservasFiltradas = localSeleccionado 
      ? todasLasReservas.filter(r => r.localId === localSeleccionado)
      : todasLasReservas;

    const reservasConfirmadas = reservasFiltradas.filter(r => r.estado === 'pagado_confirmado');
    const reservasPendientes = reservasFiltradas.filter(r => r.estado === 'pendiente_de_pago');

    // Ingresos brutos
    const ingresosBrutos = reservasConfirmadas.reduce((sum, r) => sum + r.precio, 0);
    const ingresosPendientes = reservasPendientes.reduce((sum, r) => sum + r.precio, 0);

    // Comisiones de Raki (3.5% por cada transacción)
    const comisionesWeb = reservasConfirmadas
      .filter(r => r.origen === 'web')
      .reduce((sum, r) => sum + (r.precio * COMISION_RAKI), 0);
    
    const comisionesLocal = reservasConfirmadas
      .filter(r => r.origen === 'local')
      .reduce((sum, r) => sum + (r.precio * COMISION_RAKI), 0);

    const totalComisionesRaki = comisionesWeb + comisionesLocal;

    // Ingresos netos (después de comisiones Raki)
    const ingresosNetos = ingresosBrutos - totalComisionesRaki;

    // IGV sobre ingresos netos
    const igvPorPagar = ingresosNetos * IGV_RATE;

    // Ingresos finales (después de IGV)
    const ingresosFinalesTotales = ingresosNetos - igvPorPagar;

    // Desglose por método de pago
    const desgloseMetodoPago = reservasConfirmadas.reduce((acc, reserva) => {
      if (!acc[reserva.metodoPago]) {
        acc[reserva.metodoPago] = { cantidad: 0, monto: 0 };
      }
      acc[reserva.metodoPago].cantidad += 1;
      acc[reserva.metodoPago].monto += reserva.precio;
      return acc;
    }, {} as Record<string, { cantidad: number; monto: number }>);

    // Desglose por origen
    const desgloseOrigen = reservasConfirmadas.reduce((acc, reserva) => {
      if (!acc[reserva.origen]) {
        acc[reserva.origen] = { cantidad: 0, monto: 0, comision: 0 };
      }
      const comision = reserva.precio * COMISION_RAKI; // 3.5% para ambos orígenes
      
      acc[reserva.origen].cantidad += 1;
      acc[reserva.origen].monto += reserva.precio;
      acc[reserva.origen].comision += comision;
      return acc;
    }, {} as Record<string, { cantidad: number; monto: number; comision: number }>);


    return {
      // Totales generales
      totalReservas: reservasFiltradas.length,
      reservasConfirmadas: reservasConfirmadas.length,
      reservasPendientes: reservasPendientes.length,
      
      // Ingresos
      ingresosBrutos,
      ingresosPendientes,
      ingresosNetos,
      ingresosFinalesTotales,
      
      // Comisiones y tarifas
      comisionesWeb,
      comisionesLocal,
      totalComisionesRaki,
      igvPorPagar,
      
      // Desgloses
      desgloseMetodoPago,
      desgloseOrigen,
      
      // Porcentajes
      porcentajeComisionRaki: ingresosBrutos > 0 ? (totalComisionesRaki / ingresosBrutos) * 100 : 0,
      porcentajeIGV: ingresosNetos > 0 ? (igvPorPagar / ingresosNetos) * 100 : 0
    };
  }, [todasLasReservas, localSeleccionado]);



  return (
    <div className="space-y-8 px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Reportes y Analytics</h1>
              <p className="text-slate-600 mt-2">
              {localActual ? `Análisis detallado de ${localActual.nombre}` : 'Selecciona un local para ver reportes específicos'}
              </p>
            </div>
                </div>
              </div>

      {/* Selector de Local */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <BuildingOfficeIcon className="h-6 w-6 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-900">Seleccionar Local</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locales.map(local => (
              <div
                key={local.id}
                onClick={() => setLocalSeleccionado(local.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  localSeleccionado === local.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    localSeleccionado === local.id
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{local.nombre}</h4>
                    <p className="text-sm text-slate-600">{local.direccion}</p>
                    <p className="text-xs text-slate-500 mt-1">{local.canchas?.length || 0} canchas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {localActual && (
        <>

        {/* Filtros de Período */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setVistaDetallada(!vistaDetallada)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                    vistaDetallada
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                      : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <ChartIcon className="h-4 w-4" />
                  <span>{vistaDetallada ? 'Vista Simple' : 'Reporte Detallado'}</span>
                </button>
              </div>
              
              <div className="flex space-x-3">
            <button
              onClick={() => setFiltroActivo('diario')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filtroActivo === 'diario'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
              }`}
            >
              Diario
            </button>
            <button
              onClick={() => setFiltroActivo('semanal')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filtroActivo === 'semanal'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setFiltroActivo('mensual')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filtroActivo === 'mensual'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-md'
              }`}
            >
              Mensual
            </button>
          </div>
        </div>
          </div>



          {/* Dashboard Detallado */}
          {vistaDetallada && (
            <>
              {/* Resumen Financiero Principal */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
                {/* Ingresos Brutos */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Ingresos Brutos</p>
                      <p className="text-2xl font-bold mt-1">S/ {calcularMetricasFinancieras.ingresosBrutos.toLocaleString()}</p>
                      <p className="text-blue-100 text-xs mt-1">Total facturado</p>
                    </div>
                </div>
        </div>

                {/* Comisión Raki */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
            <div>
                      <p className="text-red-100 text-sm font-medium">Comisión Raki</p>
                      <p className="text-2xl font-bold mt-1">S/ {calcularMetricasFinancieras.totalComisionesRaki.toLocaleString()}</p>
                      <p className="text-red-100 text-xs mt-1">{calcularMetricasFinancieras.porcentajeComisionRaki.toFixed(1)}% del total</p>
            </div>
                  </div>
                </div>

                {/* Ingresos Netos */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                  <div>
                      <p className="text-green-100 text-sm font-medium">Ingresos Netos</p>
                      <p className="text-2xl font-bold mt-1">S/ {calcularMetricasFinancieras.ingresosNetos.toLocaleString()}</p>
                      <p className="text-green-100 text-xs mt-1">Después de Raki</p>
                    </div>
                  </div>
                </div>

                {/* Ingresos Finales */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Ingresos Finales</p>
                      <p className="text-2xl font-bold mt-1">S/ {calcularMetricasFinancieras.ingresosFinalesTotales.toLocaleString()}</p>
                      <p className="text-purple-100 text-xs mt-1">Después de IGV</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desglose Detallado */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
                {/* Análisis por Origen */}
                <div className="card">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Análisis por Origen</h3>
                    <p className="text-slate-600">Desglose de reservas web vs locales</p>
        </div>

                  <div className="space-y-4">
                    {Object.entries(calcularMetricasFinancieras.desgloseOrigen).map(([origen, datos]) => (
                      <div key={origen} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${origen === 'web' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                            <span className="font-semibold text-slate-900 capitalize">{origen === 'web' ? 'Reservas Web' : 'Reservas Locales'}</span>
            </div>
                          <span className="text-sm text-slate-600">{datos.cantidad} reservas</span>
          </div>
          
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Ingresos</p>
                            <p className="font-bold text-slate-900">S/ {datos.monto.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Comisión Raki</p>
                            <p className="font-bold text-red-600">S/ {datos.comision.toLocaleString()}</p>
                  </div>
                  <div>
                            <p className="text-slate-600">Neto</p>
                            <p className="font-bold text-green-600">S/ {(datos.monto - datos.comision).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Análisis por Método de Pago */}
                <div className="card">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Métodos de Pago</h3>
                    <p className="text-slate-600">Distribución de pagos confirmados</p>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(calcularMetricasFinancieras.desgloseMetodoPago).map(([metodo, datos]) => (
                      <div key={metodo} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-sm">
                            {metodo === 'efectivo' ? '💵' : 
                             metodo === 'tarjeta' ? '💳' : 
                             metodo === 'transferencia' ? '🏦' : 
                             metodo === 'yape' ? '📱' : 
                             metodo === 'plin' ? '📲' : '💰'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 capitalize">{metodo}</p>
                            <p className="text-sm text-slate-600">{datos.cantidad} transacciones</p>
                  </div>
                </div>
                <div className="text-right">
                          <p className="font-bold text-slate-900">S/ {datos.monto.toLocaleString()}</p>
                          <p className="text-sm text-slate-600">
                            {((datos.monto / calcularMetricasFinancieras.ingresosBrutos) * 100).toFixed(1)}%
                          </p>
                </div>
              </div>
            ))}
          </div>
        </div>
              </div>

              {/* Desglose por Período */}
              <div className="card mb-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Análisis por {filtroActivo === 'diario' ? 'Día' : filtroActivo === 'semanal' ? 'Semana' : 'Mes'}
                  </h3>
                  <p className="text-slate-600">
                    Desglose {filtroActivo} de reservas e ingresos
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 max-h-96 overflow-y-auto">
                  {calcularDatosPorPeriodo.map((periodo, index) => (
                    <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200/50 p-4 hover:shadow-md transition-all duration-200 hover:scale-105 w-48 flex-shrink-0">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xs">
                          {filtroActivo === 'diario' ? 
                            new Date(periodo.fechaOriginal).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) :
                           filtroActivo === 'semanal' ? 'S' + (index + 1) :
                           new Date(periodo.fechaOriginal).toLocaleDateString('es-ES', { month: 'short' })}
            </div>
          </div>
          
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">{periodo.reservas} reservas</p>
                        <p className="text-lg font-bold text-slate-900 mb-1">S/ {periodo.ingresosConfirmados.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">
                          {periodo.ingresos > 0 ? ((periodo.ingresosConfirmados / periodo.ingresos) * 100).toFixed(0) : 0}% confirmado
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Métricas Contables */}
              <div className="card mb-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Resumen Contable</h3>
                  <p className="text-slate-600">Información detallada para contabilidad</p>
            </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {/* Comisiones */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-3">Comisiones Raki</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-red-700 text-sm">Web (3.5%):</span>
                        <span className="font-bold text-red-900">S/ {calcularMetricasFinancieras.comisionesWeb.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-700 text-sm">Local (3.5%):</span>
                        <span className="font-bold text-red-900">S/ {calcularMetricasFinancieras.comisionesLocal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-red-200 pt-2">
                        <span className="text-red-700 text-sm font-semibold">Total:</span>
                        <span className="font-bold text-red-900">S/ {calcularMetricasFinancieras.totalComisionesRaki.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Impuestos */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-3">Impuestos</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-orange-700 text-sm">Base Imponible:</span>
                        <span className="font-bold text-orange-900">S/ {calcularMetricasFinancieras.ingresosNetos.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700 text-sm">IGV (18%):</span>
                        <span className="font-bold text-orange-900">S/ {calcularMetricasFinancieras.igvPorPagar.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700 text-sm">% IGV:</span>
                        <span className="font-bold text-orange-900">{calcularMetricasFinancieras.porcentajeIGV.toFixed(1)}%</span>
                      </div>
              </div>
            </div>

                  {/* Estado de Reservas */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-3">Estado Reservas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-700 text-sm">Confirmadas:</span>
                        <span className="font-bold text-green-900">{calcularMetricasFinancieras.reservasConfirmadas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 text-sm">Pendientes:</span>
                        <span className="font-bold text-green-900">{calcularMetricasFinancieras.reservasPendientes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 text-sm">Ingresos Pend.:</span>
                        <span className="font-bold text-green-900">S/ {calcularMetricasFinancieras.ingresosPendientes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </>
      )}

      {/* Vista General (cuando no hay local seleccionado) */}
      {!localActual && (
        <></>
      )}

      {/* Exportar Reporte */}
      <div className="card">
        <div className="flex flex-col items-center text-center py-8">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
            <DownloadIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Exportar Reporte Completo</h2>
          <p className="text-slate-600 mb-6 max-w-md">
            Descarga un reporte completo en Excel con todas las métricas financieras, análisis por período, comisiones Raki e información contable detallada
          </p>
          <button 
            onClick={() => {
              // Aquí iría la lógica de exportación
              alert('Funcionalidad de exportación a Excel - En desarrollo');
            }}
            className="btn-primary px-8 py-3 text-lg font-semibold flex items-center space-x-3"
          >
            <DownloadIcon className="h-5 w-5" />
            <span>Descargar Excel</span>
          </button>
          <p className="text-xs text-slate-500 mt-3">
            Incluye: Ingresos, Comisiones Raki (3.5%), IGV, Análisis por origen, Métodos de pago
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reportes;