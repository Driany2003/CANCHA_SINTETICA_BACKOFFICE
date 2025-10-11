export interface Cliente {
  id: string;
  dni: string;
  nombre: string;
  telefono: string;
  email?: string;
  fechaRegistro: string;
  totalReservas: number;
  totalHoras: number;
  totalGastado: number;
  ultimaReserva?: string;
  reservasRealizadas: string[]; // IDs de las reservas
  estado: 'activo' | 'inactivo';
  categoria: 'bronce' | 'plata' | 'oro' | 'diamante';
  notas?: string;
}

export interface EstadisticasCliente {
  totalReservas: number;
  totalHoras: number;
  totalGastado: number;
  promedioHorasPorReserva: number;
  promedioGastoPorReserva: number;
  frecuenciaMensual: number;
  canchasPreferidas: { cancha: string; veces: number }[];
  horariosPreferidos: { hora: string; veces: number }[];
  diasPreferidos: { dia: string; veces: number }[];
}
