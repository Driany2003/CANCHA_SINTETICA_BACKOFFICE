import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PlusIcon,
  FutbolIcon,
  CloseIcon,
  LogoutIcon,
  ClientesIcon,
  UsuariosIcon,
  DashboardIcon,
  ReservasIcon,
  ReportesIcon,
  EmpresaIcon,
} from "../icons/Icons";
import { CURRENT_USER_ROLE, MENU_ITEMS_BY_ROLE } from "../../config/userConfig";
import ModalConfirmarLogout from "../ModalConfirmarLogout";
import { ChevronFirst } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarContentProps {
  children?: React.ReactNode;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  expanded,
  setExpanded,
}) => {
  const location = useLocation();
  const [modalLogoutAbierto, setModalLogoutAbierto] = useState(false);

  // ===== SISTEMA DE ROLES =====
  // El rol se obtiene de la configuración centralizada
  const userRole = CURRENT_USER_ROLE;
  const menuItems = MENU_ITEMS_BY_ROLE[userRole];

  const getIconForPath = (path: string) => {
    switch (path) {
      case "/":
        return <DashboardIcon className="h-6 w-6" />;
      case "/reservas":
        return <ReservasIcon className="h-6 w-6" />;
      case "/nueva-reserva":
        return <PlusIcon className="h-6 w-6" />;
      case "/canchas":
        return <FutbolIcon className="h-6 w-6" />;
      case "/clientes":
        return <ClientesIcon className="h-6 w-6" />;
      case "/usuarios":
        return <UsuariosIcon className="h-6 w-6" />;
      case "/empresa":
        return <EmpresaIcon className="h-6 w-6" />;
      case "/reportes":
        return <ReportesIcon className="h-6 w-6" />;
      default:
        return <DashboardIcon className="h-6 w-6" />;
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Funciones para el modal de logout
  const abrirModalLogout = () => {
    setModalLogoutAbierto(true);
  };

  const cerrarModalLogout = () => {
    setModalLogoutAbierto(false);
  };

  const confirmarLogout = () => {
    // Limpiar datos de autenticación
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    setModalLogoutAbierto(false);
    // Redireccionar al login
    window.location.href = "/login";
  };

  const SidebarContent = ({
    children,
    expanded,
    setExpanded,
  }: SidebarContentProps) => {
    return (
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="/logo.png"
              className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
              alt="Logo Cancha Sintetica"
            />
            <button
              onClick={() => setExpanded((curr: boolean) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              title={expanded ? "Contraer sidebar" : "Expandir sidebar"}
            >
              <ChevronFirst
                className={`h-5 w-5 transition-transform duration-200 ${
                  expanded ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          </div>

          <ul className="flex-1 px-3 pt-10">{children}</ul>

          {/* Botón de logout */}
          <div className="px-4 pb-6">
            <button
              onClick={abrirModalLogout}
              className={`flex items-center text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 ${
                expanded
                  ? "w-full px-4 py-3 justify-start"
                  : "w-12 h-12 justify-center mx-auto"
              }`}
              title={expanded ? "" : "Cerrar Sesión"}
            >
              <LogoutIcon className="h-6 w-6" />
              {expanded && (
                <span className="ml-3 font-medium">Cerrar Sesión</span>
              )}
            </button>
          </div>
        </nav>
      </aside>
    );
  };

  return (
    <>
      {/* Sidebar móvil */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="mobile-menu fixed inset-y-0 left-0 flex w-72 flex-col">
          <div className="flex h-32 items-center justify-center px-6 pt-12 relative">
            <div className="text-center">
              <img
                src="/logo.png"
                alt="Logo Cancha Sintética"
                className="h-40 w-40 mx-auto mb-2"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            >
              <CloseIcon className="h-6 w-6 text-slate-400" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-item ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                {getIconForPath(item.path)}
                {!expanded && <div className="tooltip">{item.label}</div>}
              </Link>
            ))}
          </nav>

          {/* Botón de cerrar sesión móvil al final */}
          <div className="px-4 pb-6">
            <button
              onClick={abrirModalLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
            >
              <LogoutIcon className="mr-3 h-5 w-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${
          expanded ? "lg:w-72" : "lg:w-20"
        }`}
      >
        <div className="flex flex-col flex-grow pt-4">
          <SidebarContent expanded={expanded} setExpanded={setExpanded}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`group relative flex items-center text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                    expanded
                      ? "px-4 py-3 justify-start"
                      : "px-2 py-4 justify-center mx-1"
                  } ${
                    isActive(item.path)
                      ? expanded
                        ? "bg-green-100 text-green-700 border-r-4 border-green-500 shadow-md"
                        : "bg-green-100 text-green-700 rounded-xl shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                  }`}
                  title={expanded ? "" : item.label}
                >
                  <div
                    className={`${expanded ? "" : "flex items-center justify-center"}`}
                  >
                    {getIconForPath(item.path)}
                  </div>
                  {expanded && (
                    <span className="ml-3 font-medium transition-all duration-200">
                      {item.label}
                    </span>
                  )}
                  {!expanded && (
                    <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-900 text-white text-xs invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </SidebarContent>
        </div>
      </div>

      {/* Modal de confirmación de logout */}
      <ModalConfirmarLogout
        abierto={modalLogoutAbierto}
        onCerrar={cerrarModalLogout}
        onConfirmar={confirmarLogout}
      />
    </>
  );
};

export default Sidebar;
