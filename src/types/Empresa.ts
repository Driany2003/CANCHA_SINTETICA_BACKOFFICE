// Tipos para el sistema de empresa y locales
export interface Empresa {
  id: string;
  nombreComercial: string;
  ruc: string;
  fechaCreacion: string;
}

export interface Cancha {
  id: string;
  nombre: string;
  tipo: string;
  precioHora: number;
  disponible: boolean;
  imagen?: string;
  localId: string;
}

export interface Local {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  activo: boolean;
  fechaCreacion: string;
  empresaId: string;
  canchas?: Cancha[];
}

export interface FiltrosLocal {
  activo?: boolean;
  busqueda?: string;
}
