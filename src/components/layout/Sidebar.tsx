import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  PlusIcon, 
  FutbolIcon, 
  ChartIcon, 
  UserIcon, 
  CloseIcon 
} from '../icons/Icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const getIconForPath = (path: string) => {
    switch (path) {
      case '/': 
        return <HomeIcon className="mr-3 h-5 w-5" />;
      case '/reservas': 
        return <CalendarIcon className="mr-3 h-5 w-5" />;
      case '/nueva-reserva': 
        return <PlusIcon className="mr-3 h-5 w-5" />;
      case '/canchas': 
        return <FutbolIcon className="mr-3 h-5 w-5" />;
      case '/clientes': 
        return <UserIcon className="mr-3 h-5 w-5" />;
      case '/reportes': 
        return <ChartIcon className="mr-3 h-5 w-5" />;
      default: 
        return <HomeIcon className="mr-3 h-5 w-5" />;
    }
  };

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/reservas', label: 'Reservas' },
    { path: '/nueva-reserva', label: 'Nueva Reserva' },
    { path: '/canchas', label: 'Canchas' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/reportes', label: 'Reportes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <>
      <div className="flex items-center h-70 px-6 pt-12">
        <div className="text-center w-full">
          <img src="/logo.png" alt="Logo Cancha Sintética" className="h-40 w-40 mx-auto mb-4" />
        </div>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-10">
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
    </>
  );

  return (
    <>
      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="mobile-menu fixed inset-y-0 left-0 flex w-72 flex-col">
          <div className="flex h-32 items-center justify-center px-6 pt-16 relative">
            <div className="text-center">
              <img src="/logo.png" alt="Logo Cancha Sintética" className="h-40 w-40 mx-auto mb-4" />
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            >
              <CloseIcon className="h-6 w-6 text-slate-400" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-32">
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
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="mobile-menu flex flex-col flex-grow">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
