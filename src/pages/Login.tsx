import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon
} from '../components/icons/Icons';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulación de autenticación
    try {
      // Aquí iría la lógica real de autenticación
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay

      // Credenciales de prueba
      if (formData.email === 'admin@raki.com' && formData.password === 'admin123') {
        localStorage.setItem('userToken', 'mock-token');
        localStorage.setItem('userRole', 'admin');
        window.location.href = '/dashboard';
      } else if (formData.email === 'trabajador@raki.com' && formData.password === 'trabajador123') {
        localStorage.setItem('userToken', 'mock-token');
        localStorage.setItem('userRole', 'trabajador');
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

  return (
    <div className="min-h-screen flex">
      {/* Mitad Izquierda - Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 items-center justify-center p-12">
        <div className="text-center">
          <div className="mx-auto w-64 h-64 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl p-8">
            <img 
              src="/logo.png" 
              alt="Raki Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback si no se puede cargar el logo
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl items-center justify-center hidden">
              <span className="text-6xl font-bold text-white">R</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Raki</h1>
          <p className="text-green-100 text-xl font-semibold mb-2">"Tu cancha, tu pasión, nuestra tecnología"</p>
          <p className="text-green-200 text-sm">Sistema de Gestión de Canchas Sintéticas</p>
        </div>
      </div>

      {/* Mitad Derecha - Formulario de Login */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header móvil (solo visible en pantallas pequeñas) */}
          <div className="text-center mb-8 lg:hidden">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Bienvenido a Raki</h1>
            <p className="text-green-600 font-medium mb-1">"Tu cancha, tu pasión, nuestra tecnología"</p>
            <p className="text-slate-600 text-sm">Inicia sesión para continuar</p>
          </div>

          {/* Header desktop */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Iniciar Sesión</h2>
            <p className="text-green-600 font-medium text-lg mb-2">"Tu cancha, tu pasión, nuestra tecnología"</p>
            <p className="text-slate-600">Ingresa tus credenciales para acceder al sistema</p>
          </div>

          {/* Formulario de Login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-900"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-slate-900"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Botón de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              © 2024 Raki. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
