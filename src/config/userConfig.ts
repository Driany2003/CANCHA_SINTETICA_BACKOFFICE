// Configuración de usuario y roles
// En un sistema real, esto vendría de la autenticación/contexto

export type UserRole = 'admin' | 'trabajador';

// ===== CONFIGURACIÓN ACTUAL =====
// Cambiar estos valores para probar diferentes usuarios:
export const CURRENT_USER_ID = '2'; // ID del usuario actual (simulado)
export const CURRENT_USER_ROLE = 'admin' as UserRole; // Cambiar a 'admin' para probar
export const CURRENT_USER_LOCAL_ID = '1'; // ID del local asignado (solo para trabajadores)

// Información del usuario actual
export const CURRENT_USER = {
  id: CURRENT_USER_ID,
  role: CURRENT_USER_ROLE,
  localId: CURRENT_USER_ROLE === 'trabajador' ? CURRENT_USER_LOCAL_ID : undefined,
  name: CURRENT_USER_ROLE === 'admin' ? 'Administrador' : 'Trabajador',
  permissions: {
    canViewDashboard: CURRENT_USER_ROLE === 'admin',
    canViewReservas: true, // Ambos roles pueden ver reservas
    canCreateReservas: true, // Ambos roles pueden crear reservas
    canManageCanchas: CURRENT_USER_ROLE === 'admin',
    canManageClientes: CURRENT_USER_ROLE === 'admin',
    canManageUsuarios: CURRENT_USER_ROLE === 'admin', // Solo admins pueden gestionar usuarios
    canManageEmpresa: CURRENT_USER_ROLE === 'admin', // Solo admins pueden gestionar empresa
    canViewReportes: CURRENT_USER_ROLE === 'admin',
  }
};

// Menús disponibles por rol
export const MENU_ITEMS_BY_ROLE = {
  admin: [
    { path: '/', label: 'Dashboard' },
    { path: '/reservas', label: 'Reservas' },
    { path: '/nueva-reserva', label: 'Nueva Reserva' },
    { path: '/canchas', label: 'Canchas' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/usuarios', label: 'Usuarios' },
    { path: '/empresa', label: 'Empresa' },
    { path: '/reportes', label: 'Reportes' },
  ],
  trabajador: [
    { path: '/reservas', label: 'Reservas' },
    { path: '/nueva-reserva', label: 'Nueva Reserva' },
  ]
};
