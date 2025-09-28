import React from 'react';
import { Navigate } from 'react-router-dom';
import { CURRENT_USER } from '../config/userConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: keyof typeof CURRENT_USER.permissions;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission, 
  fallbackPath = '/reservas' 
}) => {
  // Verificar si el usuario tiene el permiso requerido
  if (!CURRENT_USER.permissions[requiredPermission]) {
    // Redirigir a la página de fallback (por defecto a reservas)
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
