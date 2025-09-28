# Sistema de Roles - Cancha Sintética Backoffice

## Descripción
El sistema implementa dos tipos de usuarios con diferentes permisos:

### 👑 Administrador
- **Acceso completo** a todas las secciones
- Puede ver: Dashboard, Reservas, Nueva Reserva, Canchas, Clientes, Reportes
- Puede gestionar: Canchas, Clientes, ver reportes completos

### 👷 Trabajador  
- **Acceso limitado** solo a funciones operativas
- Puede ver: Reservas, Nueva Reserva
- Puede hacer: Crear nuevas reservas, ver lista de reservas, aprobar pagos web

## Cómo cambiar entre roles

### Para probar como Administrador:
1. Abrir el archivo: `src/config/userConfig.ts`
2. Cambiar la línea:
   ```typescript
   export const CURRENT_USER_ROLE: UserRole = 'admin';
   ```

### Para probar como Trabajador:
1. Abrir el archivo: `src/config/userConfig.ts`
2. Cambiar la línea:
   ```typescript
   export const CURRENT_USER_ROLE: UserRole = 'trabajador';
   ```

## Funcionalidades por Rol

### Administrador puede:
- ✅ Ver Dashboard con estadísticas completas
- ✅ Gestionar Canchas (crear, editar, eliminar)
- ✅ Gestionar Clientes (crear, editar, eliminar)
- ✅ Ver Reportes detallados por local
- ✅ Ver todas las Reservas
- ✅ Crear nuevas Reservas
- ✅ Aprobar pagos de reservas web

### Trabajador puede:
- ❌ NO ver Dashboard
- ❌ NO gestionar Canchas
- ❌ NO gestionar Clientes  
- ❌ NO ver Reportes
- ✅ Ver todas las Reservas
- ✅ Crear nuevas Reservas
- ✅ Aprobar pagos de reservas web

## Protección de Rutas
- Las rutas están protegidas automáticamente
- Si un trabajador intenta acceder a una sección no permitida, será redirigido a `/reservas`
- El sidebar solo muestra las opciones disponibles para cada rol

## Implementación Técnica
- **Configuración centralizada**: `src/config/userConfig.ts`
- **Protección de rutas**: `src/components/ProtectedRoute.tsx`
- **Sidebar dinámico**: `src/components/layout/Sidebar.tsx`
- **Permisos granulares**: Sistema de permisos por funcionalidad

## Notas para Producción
En un sistema real, esto se implementaría con:
- Autenticación JWT
- Context API o Redux para estado global
- Base de datos con tabla de usuarios y roles
- Middleware de autorización en el backend
