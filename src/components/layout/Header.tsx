import React from "react";
import { BarsIcon, UserIcon } from "../icons/Icons";
import { CURRENT_USER_ROLE } from "../../config/userConfig";
import { Menu, Moon, Sun } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  expanded?: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode?: boolean;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, expanded = true, setExpanded, darkMode = false, setDarkMode }) => {
  // Información del usuario actual (simulada)
  const usuarioActual = {
    nombre:
      CURRENT_USER_ROLE === "admin" ? "Roberto Silva" : "Patricia Morales",
    rol: CURRENT_USER_ROLE === "admin" ? "Administrador" : "Trabajador",
  };

  return (
    <>
      {/* Header móvil */}
      <div className="nav-header sticky top-0 z-40 flex h-[77px] shrink-0 items-center gap-x-4 border-b border-slate-200 px-4 lg:hidden dark:border-slate-700">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-200"
          onClick={() => setSidebarOpen(true)}
        >
          <BarsIcon className="h-6 w-6" />
        </button>

        <div className="flex-1 flex items-center justify-end gap-3">
          {setDarkMode && (
            <button
              type="button"
              onClick={() => setDarkMode((v) => !v)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-[#101f28] dark:border-[#344054] dark:text-green-400 dark:hover:bg-[#152832]"
              title={darkMode ? "Modo claro" : "Modo oscuro"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
              <UserIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {usuarioActual.nombre}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{usuarioActual.rol}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header desktop */}
      <div className="nav-header sticky top-0 z-40 hidden lg:flex h-[77px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:bg-[#101f28] dark:border-slate-700">
        <div className="flex items-center gap-2">
          {setExpanded && (
            <button
              type="button"
              onClick={() => setExpanded((curr: boolean) => !curr)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-slate-200/80 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:bg-[#101f28] dark:border-[#344054] dark:text-slate-300 dark:hover:bg-[#152832] transition-colors shadow-sm hover:shadow"
              title={expanded ? "Contraer menú" : "Expandir menú"}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {setDarkMode && (
            <button
              type="button"
              onClick={() => setDarkMode((v) => !v)}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200/80 text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:bg-[#101f28] dark:border-[#344054] dark:text-green-400 dark:hover:bg-[#152832] transition-colors"
              title={darkMode ? "Modo claro" : "Modo oscuro"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
            <UserIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-left">
              {usuarioActual.nombre}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-left">
              {usuarioActual.rol}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
