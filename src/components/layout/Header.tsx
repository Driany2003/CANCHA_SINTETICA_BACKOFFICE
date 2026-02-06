import React from "react";
import { BarsIcon, UserIcon } from "../icons/Icons";
import { CURRENT_USER_ROLE } from "../../config/userConfig";
import { Menu } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  expanded?: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, expanded = true, setExpanded }) => {
  // Información del usuario actual (simulada)
  const usuarioActual = {
    nombre:
      CURRENT_USER_ROLE === "admin" ? "Roberto Silva" : "Patricia Morales",
    rol: CURRENT_USER_ROLE === "admin" ? "Administrador" : "Trabajador",
  };

  return (
    <>
      {/* Header móvil */}
      <div className="nav-header sticky top-0 z-40 flex h-[77px] shrink-0 items-center gap-x-4 border-b px-4 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-slate-700"
          onClick={() => setSidebarOpen(true)}
        >
          <BarsIcon className="h-6 w-6" />
        </button>

        {/* Información del usuario */}
        <div className="flex-1 flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {usuarioActual.nombre}
              </p>
              <p className="text-xs text-slate-500">{usuarioActual.rol}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Header desktop */}
      <div className="nav-header sticky top-0 z-40 hidden lg:flex h-[77px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        {/* Botón expandir/contraer sidebar */}
        <div className="flex items-center">
          {setExpanded && (
            <button
              type="button"
              onClick={() => setExpanded((curr: boolean) => !curr)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200/80 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm hover:shadow"
              title={expanded ? "Contraer menú" : "Expandir menú"}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </div>
        {/* Información del usuario */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-lg font-semibold text-slate-900 text-right">
              {usuarioActual.nombre}
            </p>
            <p className="text-sm text-slate-500 text-right">
              {usuarioActual.rol}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
