export interface Reserva {
  id: string;
  nombreCliente: string;
  telefono: string;
  email: string;
  fecha: string;
  hora: string;
  duracion: number;
  cancha: string;
  estado: EstadoReserva;
  precio: number;
  metodoPago: MetodoPago;
  fechaCreacion: string;
  notas?: string;
}

export type EstadoReserva = 'pendiente_de_pago' | 'pagado_confirmado';

export type MetodoPago = 
  | 'efectivo'
  | 'tarjeta'
  | 'transferencia'
  | 'online'
  | 'yape'
  | 'plin';

export interface Cancha {
  id: string;
  nombre: string;
  tipo: string;
  precioHora: number;
  disponible: boolean;
}

export interface Horario {
  hora: string;
  disponible: boolean;
  reservaId?: string;
}

export interface FiltrosReserva {
  fechaDesde?: string;
  fechaHasta?: string;
  estado?: EstadoReserva;
  cancha?: string;
  cliente?: string;
}
