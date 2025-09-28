# Módulo de Gestión de Usuarios

## Descripción
El módulo de Usuarios permite a los administradores crear, editar y eliminar usuarios del sistema, asignándoles roles específicos y locales de trabajo.

## Funcionalidades

### 👑 Administrador
- **Acceso completo**: Ve todas las secciones del sistema
- **Gestión de usuarios**: Puede crear, editar y eliminar usuarios
- **Sin restricciones de local**: Ve todas las reservas de todos los locales
- **Filtro por local**: Puede filtrar reservas por local específico

### 👷 Trabajador
- **Acceso limitado**: Solo ve "Reservas" y "Nueva Reserva"
- **Local asignado**: Solo ve reservas de su local específico
- **Sin filtro de local**: No puede cambiar de local (automático)

## Estructura de Usuarios

### Campos del Usuario
- **ID**: Identificador único
- **Nombre**: Nombre completo del usuario
- **Email**: Correo electrónico (único)
- **Teléfono**: Número de teléfono (formato: 9XXXXXXXX)
- **Rol**: `admin` o `trabajador`
- **Local Asignado**: Solo para trabajadores
- **Estado**: Activo/Inactivo
- **Fecha de Creación**: Cuándo se creó el usuario
- **Último Acceso**: Última vez que inició sesión
- **Notas**: Información adicional

### Validaciones
- **Nombre**: Mínimo 2 caracteres, solo letras y espacios
- **Email**: Formato válido de email
- **Teléfono**: Exactamente 9 dígitos, debe empezar con 9
- **Local**: Obligatorio para trabajadores, no aplica para administradores

## Configuración de Usuario Actual

Para probar diferentes roles, modifica estos valores en `/src/config/userConfig.ts`:

```typescript
// Usuario Administrador
export const CURRENT_USER_ID = '1';
export const CURRENT_USER_ROLE: UserRole = 'admin';
export const CURRENT_USER_LOCAL_ID = undefined; // No aplica

// Usuario Trabajador del Local Norte
export const CURRENT_USER_ID = '2';
export const CURRENT_USER_ROLE: UserRole = 'trabajador';
export const CURRENT_USER_LOCAL_ID = '1'; // Complejo Deportivo Norte

// Usuario Trabajador del Local Sur
export const CURRENT_USER_ID = '3';
export const CURRENT_USER_ROLE: UserRole = 'trabajador';
export const CURRENT_USER_LOCAL_ID = '2'; // Centro Deportivo Sur
```

## Flujo de Trabajo

### 1. Crear Usuario
1. Ir a **Usuarios** (solo administradores)
2. Hacer clic en **"Nuevo Usuario"**
3. Completar formulario con validaciones
4. Seleccionar rol y local (si es trabajador)
5. Guardar

### 2. Asignar Local a Trabajador
- **Administradores**: No tienen local asignado (acceso total)
- **Trabajadores**: Deben tener un local específico asignado
- **Cambio de rol**: Si se cambia de trabajador a admin, se limpia el local

### 3. Filtrado Automático
- **Administradores**: Ven todas las reservas, pueden filtrar por local
- **Trabajadores**: Solo ven reservas de su local asignado automáticamente

## Archivos Creados/Modificados

### Nuevos Archivos
- `/src/types/Usuario.ts` - Tipos e interfaces
- `/src/pages/Usuarios.tsx` - Página principal
- `/src/components/ModalCrearUsuario.tsx` - Modal de creación
- `/src/components/ModalEditarUsuario.tsx` - Modal de edición
- `/src/components/ModalConfirmarEliminarUsuario.tsx` - Modal de eliminación

### Archivos Modificados
- `/src/config/userConfig.ts` - Configuración de usuarios y permisos
- `/src/pages/Reservas.tsx` - Filtrado por local del usuario
- `/src/App.tsx` - Nueva ruta protegida
- `/src/components/layout/Sidebar.tsx` - Nuevo menú (automático)

## Permisos por Rol

| Funcionalidad | Admin | Trabajador |
|---------------|-------|------------|
| Dashboard | ✅ | ❌ |
| Reservas | ✅ | ✅ |
| Nueva Reserva | ✅ | ✅ |
| Canchas | ✅ | ❌ |
| Clientes | ✅ | ❌ |
| **Usuarios** | ✅ | ❌ |
| Reportes | ✅ | ❌ |
| Filtro por Local | ✅ | ❌ (automático) |

## Datos de Ejemplo

El sistema incluye usuarios de ejemplo:
- **Carlos Mendoza** (Admin) - Acceso completo
- **Ana García** (Trabajador) - Local Norte
- **Luis Rodríguez** (Trabajador) - Local Sur  
- **María López** (Trabajador) - Local Olivos (Inactivo)

## Próximos Pasos

Para una implementación completa, considerar:
1. **Autenticación real** con base de datos
2. **Encriptación de contraseñas**
3. **Sesiones de usuario**
4. **Auditoría de cambios**
5. **Notificaciones por email**
6. **Recuperación de contraseña**
