// Tipos para el sistema de usuarios
export type RolUsuario = 'admin' | 'trabajador';

export interface Usuario {
  id: string;
  dni: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: RolUsuario;
  localId?: string; // Solo para trabajadores, indica a qué local pertenece
  localNombre?: string; // Nombre del local para mostrar
  activo: boolean;
  fechaCreacion: string;
  ultimoAcceso?: string;
  notas?: string;
}

export interface FiltrosUsuario {
  rol?: RolUsuario;
  localId?: string;
  activo?: boolean;
  busqueda?: string;
}
