import React, { useState } from 'react';
import { 
  DollarSignIcon,
  UsersIcon,
  DownloadIcon,
  ChartIcon
} from '../components/icons/Icons';

const Reportes: React.FC = () => {
  const [filtroActivo, setFiltroActivo] = useState('diario');

  const datosReservas = [
    { fecha: '2024-01-15', reservas: 12, ingresos: 720 },
    { fecha: '2024-01-16', reservas: 15, ingresos: 900 },
    { fecha: '2024-01-17', reservas: 18, ingresos: 1080 },
    { fecha: '2024-01-18', reservas: 14, ingresos: 840 },
    { fecha: '2024-01-19', reservas: 20, ingresos: 1200 },
    { fecha: '2024-01-20', reservas: 22, ingresos: 1320 },
    { fecha: '2024-01-21', reservas: 16, ingresos: 960 }
  ];

  const topClientes = [
    { nombre: 'Juan Pérez', reservas: 15, totalGastado: 900 },
    { nombre: 'María García', reservas: 12, totalGastado: 720 },
    { nombre: 'Carlos López', reservas: 10, totalGastado: 600 },
    { nombre: 'Ana Martínez', reservas: 8, totalGastado: 480 },
    { nombre: 'Luis Rodríguez', reservas: 7, totalGastado: 420 }
  ];

  const estadisticasGenerales = [
    { titulo: 'Total Reservas', valor: '127', cambio: '+12%', color: 'from-blue-500 to-indigo-600', icono: '📅' },
    { titulo: 'Ingresos Totales', valor: '$7,620', cambio: '+8%', color: 'from-emerald-500 to-green-600', icono: '💰' },
    { titulo: 'Clientes Activos', valor: '45', cambio: '+5%', color: 'from-purple-500 to-pink-600', icono: '👥' },
    { titulo: 'Canchas Ocupadas', valor: '78%', cambio: '+3%', color: 'from-amber-500 to-orange-600', icono: '⚽' }
  ];

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Reportes y Analytics</h1>
              <p className="text-slate-600 mt-2">
                Análisis detallado del rendimiento del negocio
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">127</p>
                  <p className="text-xs text-slate-500">Total Reservas</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$7,620</p>
                  <p className="text-xs text-slate-500">Ingresos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros de Período */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-3">
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

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {estadisticasGenerales.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="flex items-center space-x-4">
                <div className={`stat-icon bg-gradient-to-br ${stat.color}`}>
                  <span className="text-3xl">{stat.icono}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.titulo}</p>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{stat.valor}</p>
                  <p className="text-sm font-medium text-emerald-600">{stat.cambio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de Reservas por Día */}
        <div className="card mb-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Reservas por Día</h2>
              <p className="text-slate-600">Análisis de reservas y ingresos diarios</p>
            </div>
            <button className="btn-outline flex items-center justify-center">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Exportar
            </button>
          </div>
          
          <div className="space-y-4">
            {datosReservas.map((dato, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {new Date(dato.fecha).getDate()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{formatFecha(dato.fecha)}</p>
                    <p className="text-sm text-slate-600">{dato.reservas} reservas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">${dato.ingresos}</p>
                  <p className="text-sm text-slate-600">Ingresos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clientes */}
        <div className="card mb-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Top Clientes</h2>
              <p className="text-slate-600">Clientes con mayor volumen de reservas</p>
            </div>
            <button className="btn-outline flex items-center justify-center">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Exportar Reporte
            </button>
          </div>
          
          <div className="space-y-4">
            {topClientes.map((cliente, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                    index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-600' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gradient-to-br from-blue-500 to-indigo-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{cliente.nombre}</p>
                    <p className="text-sm text-slate-600">{cliente.reservas} reservas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">${cliente.totalGastado}</p>
                  <p className="text-sm text-slate-600">Total gastado</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Acciones Rápidas</h2>
              <p className="text-slate-600">Herramientas para análisis avanzado</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-hover">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4">
                <ChartIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">Reporte Detallado</h3>
              <p className="text-slate-600 text-center mb-4">Genera reportes personalizados con filtros avanzados</p>
              <button className="btn-primary w-full inline-block">Generar Reporte</button>
            </div>

            <div className="card-hover">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 mb-4">
                <DollarSignIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">Análisis Financiero</h3>
              <p className="text-slate-600 text-center mb-4">Revisa ingresos, gastos y rentabilidad del negocio</p>
              <button className="btn-outline w-full inline-block">Ver Análisis</button>
            </div>

            <div className="card-hover">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">Clientes VIP</h3>
              <p className="text-slate-600 text-center mb-4">Identifica y gestiona tus mejores clientes</p>
              <button className="btn-outline w-full inline-block">Ver Clientes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
