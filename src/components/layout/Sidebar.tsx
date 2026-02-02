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

interface MenuSection {
  title: string;
  items: Array<{
    path: string;
    label: string;
    icon: React.ReactNode;
  }>;
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
  const userRole = CURRENT_USER_ROLE;
  const menuItems = MENU_ITEMS_BY_ROLE[userRole];

  const getIconForPath = (path: string) => {
    switch (path) {
      case "/":
        return <DashboardIcon className="h-5 w-5" />;
      case "/reservas":
        return <ReservasIcon className="h-5 w-5" />;
      case "/nueva-reserva":
        return <PlusIcon className="h-5 w-5" />;
      case "/canchas":
        return <FutbolIcon className="h-5 w-5" />;
      case "/clientes":
        return <ClientesIcon className="h-5 w-5" />;
      case "/usuarios":
        return <UsuariosIcon className="h-5 w-5" />;
      case "/empresa":
        return <EmpresaIcon className="h-5 w-5" />;
      case "/reportes":
        return <ReportesIcon className="h-5 w-5" />;
      default:
        return <DashboardIcon className="h-5 w-5" />;
    }
  };

  // Organizar elementos del menú en secciones
  const getMenuSections = (): MenuSection[] => {
    const sections: MenuSection[] = [];

    // Sección Principal
    const principalItems = menuItems.filter((item) =>
      ["/", "/reservas", "/nueva-reserva"].includes(item.path),
    );

    if (principalItems.length > 0) {
      sections.push({
        title: "Principal",
        items: principalItems.map((item) => ({
          ...item,
          icon: getIconForPath(item.path),
        })),
      });
    }

    // Sección Gestión
    const gestionItems = menuItems.filter((item) =>
      ["/canchas", "/clientes", "/usuarios"].includes(item.path),
    );

    if (gestionItems.length > 0) {
      sections.push({
        title: "Gestión",
        items: gestionItems.map((item) => ({
          ...item,
          icon: getIconForPath(item.path),
        })),
      });
    }

    // Sección Configuración
    const configItems = menuItems.filter((item) =>
      ["/empresa", "/reportes"].includes(item.path),
    );

    if (configItems.length > 0) {
      sections.push({
        title: "Configuración",
        items: configItems.map((item) => ({
          ...item,
          icon: getIconForPath(item.path),
        })),
      });
    }

    return sections;
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
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    setModalLogoutAbierto(false);
    window.location.href = "/login";
  };

  const SidebarContent = ({
    children,
    expanded,
    setExpanded,
  }: SidebarContentProps) => {
    return (
      <aside className="h-screen">
        <nav className="h-full flex flex-col border-r border-gray-200">
          {/* Header con logo */}
          <div className="p-4 pt-5 pb-5">
            <div
              className={`flex items-center ${expanded ? "justify-between" : "justify-center"}`}
            >
              <div
                className={`flex items-center transition-all duration-200 ${expanded ? "opacity-100" : "opacity-0 w-0"}`}
              >
                <img
                  src="/logo.png"
                  className="h-6 w-auto"
                  alt="Logo Cancha Sintetica"
                />
              </div>
              <button
                onClick={() => setExpanded((curr: boolean) => !curr)}
                className="border-2 border-gray-200 p-2 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
                title={expanded ? "Contraer sidebar" : "Expandir sidebar"}
              >
                <ChevronFirst
                  className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                    expanded ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            </div>
          </div>
          {/* Línea separadora con padding */}
          <div className="mx-4 border-b border-gray-200"></div>

          {/* Contenido del menú */}
          <div className="flex-1 overflow-y-auto py-3">{children}</div>

          {/* Línea separadora del logout con padding */}
          <div className="mx-4 border-t border-gray-200"></div>

          {/* Botón de logout */}
          <div className="p-4">
            <button
              onClick={abrirModalLogout}
              className={`flex items-center text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ${
                expanded
                  ? "w-full px-4 py-3 justify-start"
                  : "w-12 h-12 justify-center mx-auto"
              }`}
              title={expanded ? "" : "Cerrar Sesión"}
            >
              <LogoutIcon className="h-5 w-5" />
              {expanded && <span className="ml-3">Cerrar Sesión</span>}
            </button>
          </div>
        </nav>
      </aside>
    );
  };

  const menuSections = getMenuSections();

  return (
    <>
      {/* Sidebar móvil */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col shadow-xl">
          {/* Header móvil */}
          <div className="flex h-16 items-center justify-between px-4 border-b-2 border-gray-200">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo Cancha Sintética"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-lg font-semibold text-gray-800">
                Cancha Sintética
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <CloseIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Menú móvil */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-6">
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-1 px-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        isActive(item.path)
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Línea separadora móvil */}
          <div className="mx-4 border-t-2 border-gray-200"></div>

          {/* Logout móvil */}
          <div className="p-4">
            <button
              onClick={abrirModalLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogoutIcon className="h-5 w-5" />
              <span className="ml-3">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${
          expanded ? "lg:w-64" : "lg:w-19-2"
        }`}
      >
        <SidebarContent expanded={expanded} setExpanded={setExpanded}>
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {/* Línea separadora solo cuando está contraído y no es la primera sección */}
              {!expanded && sectionIndex > 0 && (
                <div className="mx-4 border-t border-gray-200 mb-3"></div>
              )}

              <div className={`mb-3 ${expanded ? "px-3" : "px-4"}`}>
                {expanded && (
                  <div className="mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
                      {section.title}
                    </h3>
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center text-sm font-medium rounded-lg transition-all duration-150 ${
                        expanded
                          ? "px-3 py-2 justify-start"
                          : "px-3 py-3 justify-center mx-0"
                      } ${
                        isActive(item.path)
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      title={expanded ? "" : item.label}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      {expanded && (
                        <span className="ml-3 truncate">{item.label}</span>
                      )}

                      {/* Tooltip para modo contraído */}
                      {!expanded && (
                        <div className="fixed left-19-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </SidebarContent>
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
