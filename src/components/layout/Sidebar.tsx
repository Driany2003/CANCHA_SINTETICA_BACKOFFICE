import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Plus,
  LayoutGrid,
  Users,
  UserCircle,
  Building2,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";
import { CURRENT_USER_ROLE, MENU_ITEMS_BY_ROLE } from "../../config/userConfig";
import ModalConfirmarLogout from "../ModalConfirmarLogout";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarHovered?: boolean;
  setSidebarHovered?: React.Dispatch<React.SetStateAction<boolean>>;
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
  sidebarHovered = false,
  setSidebarHovered,
}) => {
  const location = useLocation();
  const visuallyExpanded = expanded || sidebarHovered;
  const [modalLogoutAbierto, setModalLogoutAbierto] = useState(false);

  // ===== SISTEMA DE ROLES =====
  const userRole = CURRENT_USER_ROLE;
  const menuItems = MENU_ITEMS_BY_ROLE[userRole];

  const iconClass = "h-[1.375rem] w-[1.375rem] shrink-0 text-current";
  const getIconForPath = (path: string) => {
    switch (path) {
      case "/":
        return <LayoutDashboard className={iconClass} strokeWidth={1.5} />;
      case "/reservas":
        return <CalendarCheck className={iconClass} strokeWidth={1.5} />;
      case "/nueva-reserva":
        return <Plus className={iconClass} strokeWidth={1.5} />;
      case "/canchas":
        return <LayoutGrid className={iconClass} strokeWidth={1.5} />;
      case "/clientes":
        return <Users className={iconClass} strokeWidth={1.5} />;
      case "/usuarios":
        return <UserCircle className={iconClass} strokeWidth={1.5} />;
      case "/empresa":
        return <Building2 className={iconClass} strokeWidth={1.5} />;
      case "/reportes":
        return <BarChart3 className={iconClass} strokeWidth={1.5} />;
      default:
        return <LayoutDashboard className={iconClass} strokeWidth={1.5} />;
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
      <aside className="h-screen bg-white dark:bg-[#101f28]">
        <nav className="h-full flex flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101f28]">
          {/* Solo logo en sidebar (sin texto ni botón; el toggle está en el header) */}
          <div className={`pt-5 ${expanded ? "px-4 -mb-2" : "px-3 pb-6"}`}>
            <div className="flex justify-center">
              <img
                src={expanded ? "/logo.png" : "/logo1.png"}
                className={`shrink-0 rounded object-contain ${expanded ? "h-40 w-40" : "h-11 w-11"}`}
                alt="Logo"
              />
            </div>
          </div>

          {!expanded && (
            <div className="flex justify-center gap-1 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
          )}

          {/* Contenido del menú */}
          <div className="flex-1 overflow-y-auto py-4">{children}</div>

          {expanded ? (
            <div className="mx-4 border-t border-slate-200 dark:border-slate-700" />
          ) : (
            <div className="flex justify-center gap-1 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>
          )}

          {/* Botón de logout */}
          <div className="p-4">
            <button
              onClick={abrirModalLogout}
              className={`flex items-center text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 rounded-lg transition-all duration-200 ${
                expanded
                  ? "w-full px-4 py-3 justify-start gap-3"
                  : "w-12 h-12 justify-center mx-auto"
              }`}
              title={expanded ? "" : "Cerrar Sesión"}
            >
              <LogOut className="h-[1.375rem] w-[1.375rem] shrink-0 text-[#778899] dark:text-slate-400" strokeWidth={1.5} />
              {expanded && <span className="ml-0">Cerrar Sesión</span>}
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
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col shadow-xl bg-white dark:bg-[#101f28]">
          <div className="flex h-16 items-center justify-between px-4 border-b-2 border-gray-200 dark:border-slate-700">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo Cancha Sintética"
                className="h-14 w-auto"
              />
              <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-slate-100">
                Cancha Sintética
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-slate-500 dark:text-slate-400" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-6">
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
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
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
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

          <div className="mx-4 border-t-2 border-gray-200 dark:border-slate-700"></div>

          <div className="p-4">
            <button
              onClick={abrirModalLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-[1.375rem] w-[1.375rem] shrink-0 text-[#778899]" strokeWidth={1.5} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${
          visuallyExpanded ? "lg:w-[290px]" : "lg:w-19-2"
        }`}
        onMouseEnter={() => !expanded && setSidebarHovered?.(true)}
        onMouseLeave={() => setSidebarHovered?.(false)}
      >
        <SidebarContent expanded={visuallyExpanded} setExpanded={setExpanded}>
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {!visuallyExpanded && sectionIndex > 0 && (
                <div className="flex justify-center gap-1 py-2 my-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                </div>
              )}

              <div className={`${visuallyExpanded ? "pl-5 pr-4 mb-5" : "px-3 mb-3"}`}>
                {visuallyExpanded && (
                  <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                )}
                <div className={visuallyExpanded ? "space-y-1 pl-8 -ml-9" : "space-y-1"}>
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center rounded-lg ${
                        visuallyExpanded
                          ? "px-4 py-2 gap-3 justify-start"
                          : `px-3 py-3 justify-center ${isActive(item.path) ? "max-w-[3rem] mx-auto" : ""}`
                      } ${
                        isActive(item.path)
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                      title=""
                    >
                      <span className={!isActive(item.path) ? "text-[#778899] dark:text-slate-400" : "text-green-700 dark:text-green-400"}>
                        {item.icon}
                      </span>
                      {visuallyExpanded && (
                        <span className="text-sm font-semibold truncate">{item.label}</span>
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
