import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import NuevaReserva from "./pages/NuevaReserva";
import Canchas from "./pages/Canchas";
import Reportes from "./pages/Reportes";
import Clientes from "./pages/Clientes";
import Usuarios from "./pages/Usuarios";
import Empresa from "./pages/Empresa";

const THEME_KEY = "cancha-backoffice-theme";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const visuallyExpanded = expanded || sidebarHovered;
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem(THEME_KEY) === "dark"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("userToken")
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
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
      <div className="min-h-screen bg-gray-50 dark:bg-[#101f28] transition-colors">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          expanded={expanded}
          setExpanded={setExpanded}
          sidebarHovered={sidebarHovered}
          setSidebarHovered={setSidebarHovered}
        />

        {/* Contenido principal */}
        <div
          className={`transition-all duration-300 ${
            visuallyExpanded ? "lg:pl-[290px]" : "lg:pl-19-2"
          }`}
        >
          <Header setSidebarOpen={setSidebarOpen} expanded={expanded} setExpanded={setExpanded} darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Contenido de la página: ancho amplio para que la tabla no requiera scroll horizontal */}
          <main className="w-full max-w-[1582px] mx-auto px-4 sm:px-5 lg:px-6">
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
