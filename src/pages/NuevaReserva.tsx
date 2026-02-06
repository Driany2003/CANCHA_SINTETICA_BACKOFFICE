import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Info, Eye, Trash2, Save } from 'lucide-react';
import { PhoneIcon, EnvelopeIcon } from '../components/icons/Icons';
import { Reserva, EstadoReserva, MetodoPago } from '../types/Reserva';

const NuevaReserva: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Reserva>>({
    dni: '',
    nombreCliente: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    duracion: 1,
    cancha: '',
    estado: 'pendiente_de_pago' as EstadoReserva,
    precio: 0,
    metodoPago: 'efectivo' as MetodoPago,
    notas: '',
    localId: ''
  });

  const locales = [
    { id: '1', nombre: 'Complejo de Fútbol Norte' },
    { id: '2', nombre: 'Centro de Fútbol Sur' },
    { id: '3', nombre: 'Estadio de Fútbol Este' }
  ];
  const canchas = ['Cancha 1', 'Cancha 2', 'Cancha 3'];
  type TipoTarifa = 'hora' | 'dia' | 'noche';
  const [tipoTarifa, setTipoTarifa] = useState<TipoTarifa>('hora');

  const [horaInicio, setHoraInicio] = useState<Date | null>(null);
  const [horaFin, setHoraFin] = useState<Date | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [imagenNombre, setImagenNombre] = useState<string | null>(null);
  const [modalVerImagenAbierto, setModalVerImagenAbierto] = useState(false);
  const [modalInfoPagoAbierto, setModalInfoPagoAbierto] = useState(false);
  const [modalVistaPreviaAbierto, setModalVistaPreviaAbierto] = useState(false);

  const formatTime = (d: Date | null) => d ? `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}` : '';
  const handleHoraFinChange = (e: { value: Date | null | undefined }) => {
    const v = e.value ?? null;
    if (!v) {
      setHoraFin(null);
      handleInputChange('duracion', 0);
      return;
    }
    if (!horaInicio) return;
    const fin = new Date(v);
    fin.setMinutes(horaInicio.getMinutes());
    fin.setSeconds(horaInicio.getSeconds(), horaInicio.getMilliseconds());
    if (fin <= horaInicio) return;
    setHoraFin(fin);
    handleInputChange('hora', formatTime(horaInicio));
    handleInputChange('duracion', getDurationHours(horaInicio, fin));
  };
  const getDurationHours = (inicio: Date | null, fin: Date | null): number => {
    if (!inicio || !fin || fin <= inicio) return 0;
    return (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
  };
  const calcularPrecioPorRango = (): number => {
    if (!horaInicio || !horaFin || horaFin <= horaInicio) return 0;
    const toMins = (d: Date) => d.getHours() * 60 + d.getMinutes();
    const startM = toMins(horaInicio);
    const endM = toMins(horaFin);
    const limitDay = 18 * 60;
    const precioDia = 45;
    const precioNoche = 60;
    let dayHours = 0, nightHours = 0;
    if (endM <= limitDay) dayHours = (endM - startM) / 60;
    else if (startM >= limitDay) nightHours = (endM - startM) / 60;
    else {
      dayHours = (limitDay - startM) / 60;
      nightHours = (endM - limitDay) / 60;
    }
    return Math.round((dayHours * precioDia + nightHours * precioNoche) * 100) / 100;
  };

  const handleInputChange = (field: keyof Reserva, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Si el método de pago es efectivo, automáticamente marcar como pagado_confirmado
      if (field === 'metodoPago' && value === 'efectivo') {
        newData.estado = 'pagado_confirmado' as EstadoReserva;
      }
      // Si cambia a otro método de pago, volver a pendiente_de_pago
      else if (field === 'metodoPago' && value !== 'efectivo') {
        newData.estado = 'pendiente_de_pago' as EstadoReserva;
      }
      
      return newData;
    });
  };

  // Función para calcular precio (comentada porque no se usa actualmente)
  // const calcularPrecio = () => {
  //   const precioBase = 60;
  //   const precioTotal = precioBase * (formData.duracion || 1);
  //   setFormData(prev => ({ ...prev, precio: precioTotal }));
  // };

  const limpiarFormulario = () => {
    setFormData({
      dni: '',
      nombreCliente: '',
      telefono: '',
      email: '',
      fecha: '',
      hora: '',
      duracion: 1,
      cancha: '',
      estado: 'pendiente_de_pago' as EstadoReserva,
      precio: 0,
      metodoPago: 'efectivo' as MetodoPago,
      notas: '',
      localId: ''
    });
    setHoraInicio(null);
    setHoraFin(null);
    setImagenPreview(null);
    setImagenNombre(null);
    setTipoTarifa('hora');
  };

  const handleHoraInicioChange = (e: { value: Date | null | undefined }) => {
    const v = e.value ?? null;
    setHoraInicio(v);
    if (!v) {
      setHoraFin(null);
      handleInputChange('hora', '');
      handleInputChange('duracion', 0);
      return;
    }
    handleInputChange('hora', formatTime(v));
    // Mantener hora de fin solo si sigue siendo válida (misma hora lógica, fin > inicio) y ajustar minutos
    if (horaFin && horaFin.getHours() > v.getHours()) {
      const finAjustado = new Date(0, 0, 0, horaFin.getHours(), v.getMinutes(), v.getSeconds(), v.getMilliseconds());
      setHoraFin(finAjustado);
      handleInputChange('duracion', getDurationHours(v, finAjustado));
    } else {
      setHoraFin(null);
      handleInputChange('duracion', 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reserva creada:', formData);
    alert('Reserva creada exitosamente');
    navigate('/reservas');
  };

  const renderStepContent = () => (
    <div className="space-y-8">
            {/* Local y Cancha en fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-slate-700 mb-2">Local</label>
                <select
                  value={formData.localId ?? ''}
                  onChange={(e) => handleInputChange('localId', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                >
                  <option value="">Seleccionar local</option>
                  {locales.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold text-slate-700 mb-2">Cancha</label>
                <select
                  required
                  value={formData.cancha}
                  onChange={(e) => handleInputChange('cancha', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                >
                  <option value="">Seleccionar cancha</option>
                  {canchas.map(cancha => (
                    <option key={cancha} value={cancha}>{cancha}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fecha y Tarifa en la misma fila (como Local y Cancha) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold text-slate-700 mb-2">Fecha</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.fecha}
                  onChange={(e) => handleInputChange('fecha', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-slate-700 mb-2">Tarifa por hora</label>
                <select
                  value={tipoTarifa}
                  onChange={(e) => setTipoTarifa(e.target.value as TipoTarifa)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                >
                  <option value="hora">Por hora</option>
                  <option value="dia">Día - S/ 45</option>
                  <option value="noche">Noche - S/ 60</option>
                </select>
              </div>
            </div>

            {/* Línea separadora (hasta los bordes del card) */}
            <div className="border-t border-gray-200 my-6 -mx-6 sm:-mx-8 px-6 sm:px-8" />

            {/* Hora de inicio, hora de fin y precio */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Hora de inicio</label>
                  <Calendar
                    value={horaInicio}
                    onChange={handleHoraInicioChange}
                    timeOnly
                    hourFormat="12"
                    placeholder="Seleccionar hora"
                    className="w-full"
                    inputClassName="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Hora de fin</label>
                  <Calendar
                    value={horaFin}
                    onChange={handleHoraFinChange}
                    timeOnly
                    hourFormat="12"
                    placeholder={!horaInicio ? 'Primero elige hora de inicio' : 'Seleccionar hora'}
                    disabled={!horaInicio}
                    className="w-full"
                    inputClassName="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base"
                  />
                  {horaInicio && (
                    <p className="mt-1 text-xs text-slate-500">Se usa la misma hora de minutos que el inicio (ej. {formatTime(horaInicio)} → {(horaInicio.getHours() + 1).toString().padStart(2, '0')}:{horaInicio.getMinutes().toString().padStart(2, '0')})</p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Precio</label>
                  <div className="flex items-center h-[42px] px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 text-base font-semibold text-green-700">
                    S/ {horaInicio && horaFin && horaFin > horaInicio ? calcularPrecioPorRango().toFixed(2) : '0.00'}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Info className="h-5 w-5 shrink-0 text-slate-500" />
                <p className="text-sm text-slate-600">
                  Elige cualquier intervalo (ej. 06:30 - 07:40). El precio se calcula por día S/ 45 y noche S/ 60.
                </p>
              </div>
              {/* Método de pago e imagen */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mt-6 pt-4 border-t border-slate-200 items-end">
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Método de pago</label>
                  <select
                    value={formData.metodoPago ?? 'efectivo'}
                    onChange={(e) => {
                      const value = e.target.value as MetodoPago;
                      handleInputChange('metodoPago', value);
                      setModalInfoPagoAbierto(true);
                    }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="yape">Yape</option>
                    <option value="plin">Plin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Imagen</label>
                  {imagenPreview && imagenNombre ? (
                    <div className="px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 min-h-[42px] flex items-center">
                      <span className="text-sm font-medium text-slate-700 truncate min-w-0" title={imagenNombre}>{imagenNombre}</span>
                    </div>
                  ) : (
                    <div className="border border-slate-300 rounded-lg overflow-hidden bg-slate-50 min-h-[42px] flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setImagenPreview(url);
                            setImagenNombre(file.name);
                          } else {
                            setImagenPreview(null);
                            setImagenNombre(null);
                          }
                        }}
                        className="hidden"
                        id="reserva-imagen"
                      />
                      <label htmlFor="reserva-imagen" className="cursor-pointer py-2.5 px-4 w-full text-center">
                        <span className="text-sm text-slate-500">Haz clic o arrastra una imagen</span>
                      </label>
                    </div>
                  )}
                </div>
                {imagenPreview && imagenNombre && (
                  <div className="flex gap-2 pb-0.5">
                    <button
                      type="button"
                      onClick={() => setModalVerImagenAbierto(true)}
                      title="Ver"
                      className="p-2.5 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 h-[42px] w-[42px] flex items-center justify-center"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(imagenPreview);
                        setImagenPreview(null);
                        setImagenNombre(null);
                      }}
                      title="Eliminar"
                      className="p-2.5 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 h-[42px] w-[42px] flex items-center justify-center"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Campos cliente - mismo estilo que el resto */}
            <div className="mt-6 pt-6 border-t border-slate-200 -mx-6 sm:-mx-8 px-6 sm:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">DNI</label>
                  <input
                    type="text"
                    value={formData.dni ?? ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                      handleInputChange('dni', value);
                    }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                    placeholder="8 dígitos"
                    maxLength={8}
                  />
                  <p className="text-xs text-slate-500 mt-1">Solo números, 8 dígitos</p>
                </div>
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Nombre del Cliente *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombreCliente}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, '');
                      handleInputChange('nombreCliente', value);
                    }}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                    placeholder="Ingresa el nombre completo"
                  />
                  <p className="text-xs text-slate-500 mt-1">Solo se permiten letras</p>
                </div>
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Teléfono *</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value === '' || value.startsWith('9')) {
                          handleInputChange('telefono', value);
                        }
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${
                        formData.telefono && !formData.telefono.startsWith('9')
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-slate-300'
                      }`}
                      placeholder="9XXXXXXXXX"
                      maxLength={9}
                    />
                  </div>
                  {formData.telefono && !formData.telefono.startsWith('9') && (
                    <p className="text-xs text-red-500 mt-1">El teléfono debe empezar con 9</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">Solo números, debe empezar con 9</p>
                </div>
                <div>
                  <label className="block text-base font-semibold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${
                        formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-slate-300'
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <p className="text-xs text-red-500 mt-1">Ingresa un email válido</p>
                  )}
                </div>
              </div>
            </div>
          </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título fuera del card */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Nueva Reserva</h1>
        </div>

        {/* Card mayor: envuelve el resto del contenido */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 sm:px-8 pt-4 sm:pt-5 pb-6 sm:pb-8">

        {/* Contenido del Paso */}
        {renderStepContent()}

        {/* Botones de Navegación */}
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setModalVistaPreviaAbierto(true)}
              disabled={
                !formData.cancha || !formData.fecha || !horaInicio || !horaFin || horaFin <= horaInicio ||
                !formData.nombreCliente || !formData.telefono
              }
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors border ${
                !formData.cancha || !formData.fecha || !horaInicio || !horaFin || horaFin <= horaInicio ||
                !formData.nombreCliente || !formData.telefono
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Eye className="h-5 w-5" />
              Vista previa
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                !formData.cancha || !formData.fecha || !horaInicio || !horaFin || horaFin <= horaInicio ||
                !formData.nombreCliente || !formData.telefono
              }
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                !formData.cancha || !formData.fecha || !horaInicio || !horaFin || horaFin <= horaInicio ||
                !formData.nombreCliente || !formData.telefono
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Save className="h-5 w-5" />
              Crear Reserva
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Modal ver imagen */}
      {modalVerImagenAbierto && imagenPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setModalVerImagenAbierto(false)}>
          <div className="max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="p-3 border-b border-slate-200 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 truncate">{imagenNombre}</span>
                <button type="button" onClick={() => setModalVerImagenAbierto(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4 flex justify-center bg-slate-100">
                <img src={imagenPreview} alt="Vista previa" className="max-h-[70vh] w-auto object-contain rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal información método de pago */}
      {modalInfoPagoAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setModalInfoPagoAbierto(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {formData.metodoPago === 'efectivo' && 'Efectivo'}
                {formData.metodoPago === 'transferencia' && 'Transferencia'}
                {formData.metodoPago === 'yape' && 'Yape'}
                {formData.metodoPago === 'plin' && 'Plin'}
              </h3>
              <button type="button" onClick={() => setModalInfoPagoAbierto(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <span className="sr-only">Cerrar</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {formData.metodoPago === 'efectivo' && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="text-sm font-bold text-green-800 mb-2">Pago en Efectivo - Inmediato</h5>
                <p className="text-xs text-slate-600">El cliente paga en efectivo en el local para separar su reserva. La reserva se marca como &quot;Pagado - Confirmado&quot;.</p>
              </div>
            )}
            {formData.metodoPago === 'transferencia' && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="text-sm font-bold text-green-800 mb-3">Datos para transferencia</h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">Banco</p>
                    <p className="font-semibold text-slate-900">BCP</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Cuenta</p>
                    <p className="font-semibold text-slate-900 break-all">19312345678012</p>
                  </div>
                  <div>
                    <p className="text-slate-500">CCI</p>
                    <p className="font-semibold text-slate-900 break-all text-xs">00219300123456780129</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Titular</p>
                    <p className="font-semibold text-slate-900">María Elena López</p>
                  </div>
                </div>
              </div>
            )}
            {formData.metodoPago === 'yape' && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="text-sm font-bold text-green-800 mb-3">Datos para Yape</h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">Nombre</p>
                    <p className="font-semibold text-slate-900">María Elena López</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Teléfono</p>
                    <p className="font-semibold text-slate-900">+51 999 888 777</p>
                  </div>
                </div>
              </div>
            )}
            {formData.metodoPago === 'plin' && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="text-sm font-bold text-green-800 mb-3">Datos para Plin</h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">Nombre</p>
                    <p className="font-semibold text-slate-900">María Elena López</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Teléfono</p>
                    <p className="font-semibold text-slate-900">+51 999 888 777</p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button type="button" onClick={() => setModalInfoPagoAbierto(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal vista previa */}
      {modalVistaPreviaAbierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setModalVistaPreviaAbierto(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">Vista previa de la reserva</h3>
                <button type="button" onClick={() => setModalVistaPreviaAbierto(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Local</span>
                  <span className="font-medium text-slate-900">{locales.find(l => l.id === formData.localId)?.nombre ?? formData.localId ?? '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Cancha</span>
                  <span className="font-medium text-slate-900">{formData.cancha || '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Fecha</span>
                  <span className="font-medium text-slate-900">{formData.fecha || '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Horario</span>
                  <span className="font-medium text-slate-900">{horaInicio && horaFin ? `${formatTime(horaInicio)} - ${formatTime(horaFin)}` : '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Duración</span>
                  <span className="font-medium text-slate-900">{getDurationHours(horaInicio, horaFin) > 0 ? `${getDurationHours(horaInicio, horaFin).toFixed(2)} h` : '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Precio</span>
                  <span className="font-semibold text-green-600">S/ {horaInicio && horaFin && horaFin > horaInicio ? calcularPrecioPorRango().toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Cliente</span>
                  <span className="font-medium text-slate-900">{formData.nombreCliente || '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Teléfono</span>
                  <span className="font-medium text-slate-900">{formData.telefono || '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-900">{formData.email || '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Método de pago</span>
                  <span className="font-medium text-slate-900 capitalize">{formData.metodoPago || '-'}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={() => setModalVistaPreviaAbierto(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NuevaReserva;
