import React, { useState, useEffect } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CalendarIcon,
  UsersIcon,
  ChartIcon
} from '../components/icons/Icons';
import { ArrowRight, Sun, Moon, Monitor } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.email === 'admin@raki.com' && formData.password === 'admin123') {
        localStorage.setItem('userToken', 'mock-token');
        localStorage.setItem('userRole', 'admin');
        if (rememberMe) localStorage.setItem('rememberMe', 'true');
        window.location.href = '/dashboard';
      } else if (formData.email === 'trabajador@raki.com' && formData.password === 'trabajador123') {
        localStorage.setItem('userToken', 'mock-token');
        localStorage.setItem('userRole', 'trabajador');
        if (rememberMe) localStorage.setItem('rememberMe', 'true');
        window.location.href = '/reservas';
      } else {
        setError('Credenciales incorrectas. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Modo solo para el panel derecho (formulario): claro / oscuro / sistema
  const [rightPanelTheme, setRightPanelTheme] = useState<'light' | 'dark' | 'system'>(() => 'dark');
  const [rightPanelLight, setRightPanelLight] = useState(false);

  useEffect(() => {
    if (rightPanelTheme === 'light') {
      setRightPanelLight(true);
      return;
    }
    if (rightPanelTheme === 'dark') {
      setRightPanelLight(false);
      return;
    }
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    setRightPanelLight(!m.matches);
    const fn = () => setRightPanelLight(!m.matches);
    m.addEventListener('change', fn);
    return () => m.removeEventListener('change', fn);
  }, [rightPanelTheme]);

  const handleRightPanelTheme = (value: 'light' | 'dark' | 'system') => {
    setRightPanelTheme(value);
  };

  const isRightLight = rightPanelLight;

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Panel izquierdo - siempre igual, no afectado por el selector de modo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#172418] items-center justify-center p-10 xl:p-12">
        <div className="w-full max-w-lg text-left">
          {/* Logo + nombre (arriba a la izquierda) */}
          <div className="flex items-center gap-3 mb-0">
            <div className="flex-shrink-0">
              <img src="/logo.png" alt="Raki" className="w-56 h-56 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          </div>

          {/* Headline: primera parte en verde oscuro, segunda en verde vivo */}
          <h2 className="text-3xl xl:text-4xl font-bold text-emerald-900/90 mb-1">
            Tu cancha,
          </h2>
          <h2 className="text-3xl xl:text-4xl font-bold text-emerald-300 mb-6">
            una sola plataforma
          </h2>

          {/* Descripción */}
          <p className="text-emerald-100/90 text-lg mb-10 max-w-md leading-relaxed">
            Centraliza reservas, clientes e ingresos. Accede desde cualquier lugar y mantén tu negocio al día.
          </p>

          {/* Cards (fondo oscuro, icono en cuadrado verde claro, título + subtítulo) */}
          <div className="space-y-5">
            <div className="flex items-center gap-5 p-5 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="w-14 h-14 rounded-lg bg-emerald-400/25 flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-lg">Reservas</div>
                <div className="text-base text-slate-400">Horarios y reservas en un solo lugar</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="w-14 h-14 rounded-lg bg-emerald-400/25 flex items-center justify-center flex-shrink-0">
                <UsersIcon className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-lg">Clientes</div>
                <div className="text-base text-slate-400">Base de datos unificada</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="w-14 h-14 rounded-lg bg-emerald-400/25 flex items-center justify-center flex-shrink-0">
                <ChartIcon className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-lg">Reportes</div>
                <div className="text-base text-slate-400">Métricas e ingresos en tiempo real</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho: selector de modo (solo este lado) + fondo y formulario según modo */}
      <div className={`hidden lg:flex lg:w-1/2 relative items-center justify-center p-6 transition-colors ${isRightLight ? 'bg-gradient-to-br from-emerald-50/95 via-green-50/90 to-emerald-50/95' : 'bg-[#0f172a]'}`}>
        {/* Botones modo claro / oscuro / sistema - esquina superior derecha del panel derecho */}
        <div className={`absolute top-5 right-5 z-10 flex rounded-full p-1 shadow-lg transition-colors ${isRightLight ? 'bg-white/90 border border-emerald-200/80' : 'bg-slate-800/90 border border-slate-600/50'}`}>
          <button
            type="button"
            onClick={() => handleRightPanelTheme('light')}
            title="Modo claro (solo formulario)"
            className={`p-2.5 rounded-full transition-all ${rightPanelTheme === 'light' ? (isRightLight ? 'text-emerald-500 ring-2 ring-emerald-500 ring-offset-2 ring-offset-emerald-50/80 bg-emerald-100/80' : 'text-emerald-400 ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#0f172a] bg-slate-700/50') : isRightLight ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-300'}`}
          >
            <Sun className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleRightPanelTheme('dark')}
            title="Modo oscuro (solo formulario)"
            className={`p-2.5 rounded-full transition-all ${rightPanelTheme === 'dark' ? (isRightLight ? 'text-emerald-500 ring-2 ring-emerald-500 ring-offset-2 ring-offset-emerald-50/80 bg-emerald-100/80' : 'text-emerald-400 ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#0f172a] bg-slate-700/50') : isRightLight ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-300'}`}
          >
            <Moon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => handleRightPanelTheme('system')}
            title="Según sistema (solo formulario)"
            className={`p-2.5 rounded-full transition-all ${rightPanelTheme === 'system' ? (isRightLight ? 'text-emerald-500 ring-2 ring-emerald-500 ring-offset-2 ring-offset-emerald-50/80 bg-emerald-100/80' : 'text-emerald-400 ring-2 ring-emerald-400 ring-offset-2 ring-offset-[#0f172a] bg-slate-700/50') : isRightLight ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-300'}`}
          >
            <Monitor className="h-5 w-5" />
          </button>
        </div>

        {/* Tarjeta del formulario (clara u oscura según modo del panel derecho) */}
        <div className={`w-full max-w-[420px] rounded-3xl shadow-2xl border p-8 lg:p-10 transition-colors ${isRightLight ? 'bg-white/95 border-emerald-200/80 shadow-emerald-900/5' : 'bg-[#1e293b] border-slate-600/50'}`}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isRightLight ? 'bg-emerald-100' : 'bg-emerald-500'}`}>
              <img src="/logo1.png" alt="" className="w-7 h-7 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className={isRightLight ? 'text-slate-800 font-bold text-xl' : 'text-white font-bold text-xl'}>Iniciar Sesión</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isRightLight ? 'text-slate-700' : 'text-white'}`}>
                Correo electrónico
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isRightLight ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' : 'bg-slate-700/80 border-slate-600 text-white placeholder-slate-400'}`}
                  placeholder="Ingresa tu correo"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isRightLight ? 'text-slate-700' : 'text-white'}`}>
                Contraseña
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isRightLight ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' : 'bg-slate-700/80 border-slate-600 text-white placeholder-slate-400'}`}
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isRightLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-400 hover:text-slate-300'}`}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`rounded text-emerald-500 focus:ring-emerald-500 ${isRightLight ? 'border-slate-300 bg-white' : 'border-slate-500 bg-slate-700'}`}
                />
                <span className={`text-sm font-medium ${isRightLight ? 'text-slate-700' : 'text-white'}`}>Recordarme</span>
              </label>
              <a href="#" className="text-sm font-medium text-emerald-500 hover:text-emerald-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && (
              <div className={`rounded-xl p-3 ${isRightLight ? 'bg-red-50 border border-red-200' : 'bg-red-900/30 border border-red-700'}`}>
                <p className={`text-sm text-center ${isRightLight ? 'text-red-700' : 'text-red-300'}`}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ingresando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className={`text-center text-sm mt-6 ${isRightLight ? 'text-slate-500' : 'text-slate-400'}`}>
            © 2024 Raki. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Móvil: mismo fondo oscuro y misma tarjeta centrada */}
      <div className="lg:hidden fixed inset-0 bg-[#0f172a] flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-600/50 p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
              <img src="/logo1.png" alt="" className="w-7 h-7 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className="text-white font-bold text-xl">Iniciar Sesión</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">Correo electrónico</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ingresa tu correo"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">Contraseña</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ingresa tu contraseña"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded border-slate-500 bg-slate-700 text-emerald-500" />
                <span className="text-sm text-white">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-emerald-400 font-medium hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            {error && <div className="bg-red-900/30 border border-red-700 rounded-xl p-3"><p className="text-sm text-red-300 text-center">{error}</p></div>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-[#14532d] hover:bg-[#166534] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Ingresando...</span></> : <><span>Ingresar</span><ArrowRight className="h-5 w-5" /></>}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-5">
            © 2024 Raki. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
