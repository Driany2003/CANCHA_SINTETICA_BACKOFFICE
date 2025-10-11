import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reservas from './pages/Reservas';
import NuevaReserva from './pages/NuevaReserva';
import Canchas from './pages/Canchas';
import Reportes from './pages/Reportes';
import Clientes from './pages/Clientes';
import Usuarios from './pages/Usuarios';
import Empresa from './pages/Empresa';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);

  // Si no está autenticado, mostrar solo el login
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Contenido principal */}
        <div className="lg:pl-72">
          <Header setSidebarOpen={setSidebarOpen} />
          
          {/* Contenido de la página */}
          <main className="p-6">
            <Routes>
              {/* Rutas protegidas por rol */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute requiredPermission="canViewDashboard">
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/nueva-reserva" element={<NuevaReserva />} />
              <Route 
                path="/canchas" 
                element={
                  <ProtectedRoute requiredPermission="canManageCanchas">
                    <Canchas />
                  </ProtectedRoute>
                } 
              />
                     <Route 
                       path="/clientes" 
                       element={
                         <ProtectedRoute requiredPermission="canManageClientes">
                           <Clientes />
                         </ProtectedRoute>
                       } 
                     />
                     <Route 
                       path="/usuarios" 
                       element={
                         <ProtectedRoute requiredPermission="canManageUsuarios">
                           <Usuarios />
                         </ProtectedRoute>
                       } 
                     />
                     <Route 
                       path="/reportes" 
                       element={
                         <ProtectedRoute requiredPermission="canViewReportes">
                           <Reportes />
                         </ProtectedRoute>
                       } 
                     />
                     <Route 
                       path="/empresa" 
                       element={
                         <ProtectedRoute requiredPermission="canManageEmpresa">
                           <Empresa />
                         </ProtectedRoute>
                       } 
                     />
                     {/* Ruta de logout */}
                     <Route 
                       path="/logout" 
                       element={<Navigate to="/login" replace />} 
                     />
                     {/* Redireccionar rutas no encontradas */}
                     <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
