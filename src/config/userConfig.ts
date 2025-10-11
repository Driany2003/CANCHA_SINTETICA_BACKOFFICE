// Configuración de usuario y roles
// El rol se obtiene automáticamente desde el localStorage después del login

export type UserRole = 'admin' | 'trabajador';

// ===== OBTENER ROL DESDE LOCALSTORAGE =====
// El rol se guarda en localStorage cuando el usuario inicia sesión
const getUserRoleFromStorage = (): UserRole => {
  const storedRole = localStorage.getItem('userRole');
  return (storedRole === 'trabajador' ? 'trabajador' : 'admin') as UserRole;
};

export const CURRENT_USER_ID = '1'; // ID del usuario actual (simulado)
export const CURRENT_USER_ROLE = getUserRoleFromStorage(); // Se obtiene automáticamente del login
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
    canViewReportes: CURRENT_USER_ROLE === 'admin', // Solo admins pueden ver reportes
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
