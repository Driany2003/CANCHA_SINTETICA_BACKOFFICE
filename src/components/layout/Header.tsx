import React from 'react';
import { BarsIcon, UserIcon } from '../icons/Icons';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <>
      {/* Header móvil */}
      <div className="nav-header sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-slate-700"
          onClick={() => setSidebarOpen(true)}
        >
          <BarsIcon className="h-6 w-6" />
        </button>
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div>
            <img src="/logo.png" alt="Logo Cancha Sintética" className="h-16 w-auto mb-1" />
            <p className="text-xs text-slate-500 font-medium">Campo Deportivo Central</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200">
            <UserIcon className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Header desktop */}
      <div className="nav-header sticky top-0 z-40 hidden lg:flex h-20 shrink-0 items-center justify-between border-b px-6">
        <div className="flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200 flex items-end justify-center">
            <UserIcon className="h-6 w-6 text-slate-600" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
