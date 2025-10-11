import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  EmpresaIcon
} from '../icons/Icons';
import { CURRENT_USER_ROLE, MENU_ITEMS_BY_ROLE } from '../../config/userConfig';
import ModalConfirmarLogout from '../ModalConfirmarLogout';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [modalLogoutAbierto, setModalLogoutAbierto] = useState(false);

  // ===== SISTEMA DE ROLES =====
  // El rol se obtiene de la configuración centralizada
  const userRole = CURRENT_USER_ROLE;
  const menuItems = MENU_ITEMS_BY_ROLE[userRole];

  const getIconForPath = (path: string) => {
    switch (path) {
      case '/': 
        return <DashboardIcon className="mr-3 h-5 w-5" />;
      case '/reservas': 
        return <ReservasIcon className="mr-3 h-5 w-5" />;
      case '/nueva-reserva': 
        return <PlusIcon className="mr-3 h-5 w-5" />;
      case '/canchas': 
        return <FutbolIcon className="mr-3 h-5 w-5" />;
      case '/clientes': 
        return <ClientesIcon className="mr-3 h-5 w-5" />;
      case '/usuarios': 
        return <UsuariosIcon className="mr-3 h-5 w-5" />;
      case '/empresa': 
        return <EmpresaIcon className="mr-3 h-5 w-5" />;
      case '/reportes': 
        return <ReportesIcon className="mr-3 h-5 w-5" />;
      default: 
        return <DashboardIcon className="mr-3 h-5 w-5" />;
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
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    setModalLogoutAbierto(false);
    // Redireccionar al login
    window.location.href = '/login';
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center h-70 px-6 pt-8">
        <div className="text-center w-full">
          <img src="/logo.png" alt="Logo Cancha Sintética" className="h-40 w-40 mx-auto mb-2" />
        </div>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`sidebar-item ${
              isActive(item.path) ? 'active' : ''
            }`}
          >
            {getIconForPath(item.path)}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* Botón de cerrar sesión al final */}
      <div className="px-4 pb-6">
        <button
          onClick={abrirModalLogout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
        >
          <LogoutIcon className="mr-3 h-5 w-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="mobile-menu fixed inset-y-0 left-0 flex w-72 flex-col">
          <div className="flex h-32 items-center justify-center px-6 pt-12 relative">
            <div className="text-center">
              <img src="/logo.png" alt="Logo Cancha Sintética" className="h-40 w-40 mx-auto mb-2" />
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
                  isActive(item.path) ? 'active' : ''
                }`}
              >
                {getIconForPath(item.path)}
                <span className="font-medium">{item.label}</span>
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="mobile-menu flex flex-col flex-grow">
          <SidebarContent />
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
