import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '../components/icons/Icons';
import { Reserva, EstadoReserva, MetodoPago } from '../types/Reserva';

const NuevaReserva: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Reserva>>({
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
    notas: ''
  });

  const canchas = ['Cancha 1', 'Cancha 2', 'Cancha 3'];
  const horarios = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const [horariosSeleccionados, setHorariosSeleccionados] = useState<string[]>([]);
  // const [tipoHorario, setTipoHorario] = useState<'dia' | 'noche'>('dia'); // No usado actualmente

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
      notas: ''
    });
    setHorariosSeleccionados([]);
    setCurrentStep(1);
  };

  const calcularPrecioTotal = () => {
    if (horariosSeleccionados.length === 0) return 0;
    
    let precioTotal = 0;
    horariosSeleccionados.forEach(horario => {
      const hora = parseInt(horario.split(':')[0]);
      if (hora >= 18) {
        precioTotal += 60; // Precio noche
      } else {
        precioTotal += 45; // Precio día
      }
    });
    
    return precioTotal;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reserva creada:', formData);
    alert('Reserva creada exitosamente');
    navigate('/reservas');
  };

  const seleccionarHorario = (horario: string) => {
    if (horariosSeleccionados.includes(horario)) {
      // Solo permite deseleccionar si no rompe la secuencia consecutiva
      const horariosSinSeleccionado = horariosSeleccionados.filter(h => h !== horario);
      
      if (horariosSinSeleccionado.length <= 1) {
        // Si solo queda 1 o 0 horarios, siempre se puede deseleccionar
        setHorariosSeleccionados(horariosSinSeleccionado);
      } else {
        // Verificar que al quitar el horario, los restantes sigan siendo consecutivos
        let sonConsecutivos = true;
        for (let i = 0; i < horariosSinSeleccionado.length - 1; i++) {
          const horaActual = parseInt(horariosSinSeleccionado[i].split(':')[0]);
          const horaSiguiente = parseInt(horariosSinSeleccionado[i + 1].split(':')[0]);
          if (horaSiguiente - horaActual !== 1) {
            sonConsecutivos = false;
            break;
          }
        }
        
        if (sonConsecutivos) {
          setHorariosSeleccionados(horariosSinSeleccionado);
        }
      }
    } else {
      const nuevosHorarios = [...horariosSeleccionados, horario].sort();
      
      // valida que los horarios sean consecutivos
      let sonConsecutivos = true;
      for (let i = 0; i < nuevosHorarios.length - 1; i++) {
        const horaActual = parseInt(nuevosHorarios[i].split(':')[0]);
        const horaSiguiente = parseInt(nuevosHorarios[i + 1].split(':')[0]);
        if (horaSiguiente - horaActual !== 1) {
          sonConsecutivos = false;
          break;
        }
      }
      
      if (sonConsecutivos) {
        setHorariosSeleccionados(nuevosHorarios);
      }
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
  return (
    <div className="space-y-8">
            {/* Información del Campo y Configuración de Reserva en Fila */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información del Campo */}
              <div className="bg-[#166534] rounded-xl p-4 border border-[#22c55e]/40 shadow-lg">
                <div className="mb-3">
                  <div className="mb-3">
                    <h3 className="text-[18px] font-bold text-[#f1f5f9] whitespace-nowrap">Campo Deportivo Central</h3>
                    <p className="text-[#bbf7d0] flex items-center mt-1">
                      <span className="w-2 h-2 bg-[#48BB78] rounded-full mr-2"></span>
                      San Miguel, Lima
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-6">
                    <div className="text-center">
                      <div className="text-xs text-[#bbf7d0] font-medium mb-2">por hora</div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-2xl font-bold text-[#86efac]">S/ 45</div>
                          <div className="text-xs text-[#bbf7d0]">Día</div>
                        </div>
                        <div className="text-[#86efac]/80">|</div>
                        <div>
                          <div className="text-2xl font-bold text-[#86efac]">S/ 60</div>
                          <div className="text-xs text-[#bbf7d0]">Noche</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuración de Reserva */}
              <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155] lg:col-span-2">
                <h4 className="text-sm font-semibold text-[#f1f5f9] mb-2">Configuración de Reserva</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#94a3b8] mb-1">Cancha</label>
                    <select
                      required
                      value={formData.cancha}
                      onChange={(e) => handleInputChange('cancha', e.target.value)}
                      className="w-full px-3 py-2 bg-[#334155] border border-[#475569] rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] text-[#f1f5f9] text-sm placeholder-[#64748b]"
                    >
                      <option value="">Seleccionar cancha</option>
                      {canchas.map(cancha => (
                        <option key={cancha} value={cancha}>{cancha}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#94a3b8] mb-1">Fecha</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.fecha}
                      onChange={(e) => handleInputChange('fecha', e.target.value)}
                      className="w-full px-3 py-2 bg-[#334155] border border-[#475569] rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] text-[#f1f5f9] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios Disponibles */}
            <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155]">
              <h4 className="text-lg font-semibold text-[#f1f5f9] mb-3">Horarios disponibles</h4>
              <div className="grid grid-cols-5 gap-2">
                {horarios.map(horario => (
                  <button
                    key={horario}
                    type="button"
                    onClick={() => seleccionarHorario(horario)}
                    className={`p-2 rounded-lg font-medium text-sm transition-colors ${
                      horariosSeleccionados.includes(horario)
                        ? 'bg-[#48BB78] text-white'
                        : 'bg-[#334155] text-[#e2e8f0] hover:bg-[#475569] border border-[#475569]'
                    }`}
                  >
                    {horario}
                  </button>
                ))}
              </div>
              <div className="mt-3 p-3 bg-[#166534]/60 rounded-lg border border-[#22c55e]/40">
                <p className="text-xs text-[#dcfce7]">
                  <span className="font-semibold">Selecciona horarios:</span> Haz clic en los horarios disponibles para seleccionar tu turno. Recuerda que deben ser consecutivos.
                </p>
                <p className="text-xs text-[#bbf7d0] mt-1">
                  <span className="font-semibold">Precios:</span> Día (antes de 18:00): S/ 45 | Noche (18:00 en adelante): S/ 60
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155]">
                <h4 className="text-lg font-semibold text-[#f1f5f9] mb-3">Resumen de tu reserva</h4>
                <div className="grid grid-cols-2 gap-4 mx-auto">
                  <div className="text-center">
                    <p className="text-xs text-[#94a3b8] mb-1">Campo</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">Campo Deportivo Central</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#94a3b8] mb-1">Cancha</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">{formData.cancha || 'No seleccionada'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#94a3b8] mb-1">Horarios</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">{horariosSeleccionados.join(', ') || 'No seleccionados'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#94a3b8] mb-1">Duración</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">{horariosSeleccionados.length} hora(s)</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#166534]/50 rounded-lg border border-[#22c55e]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#e2e8f0]">Total a pagar:</span>
                    <span className="text-xl font-bold text-[#48BB78]">S/ {calcularPrecioTotal()}</span>
                  </div>
                  <div className="mt-2 text-xs text-[#bbf7d0]">
                    {horariosSeleccionados.map(horario => {
                      const hora = parseInt(horario.split(':')[0]);
                      const precio = hora >= 18 ? 60 : 45;
                      return `${horario}: S/ ${precio}`;
                    }).join(' | ')}
                  </div>
                </div>
              </div>

              <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155]">
                <h4 className="text-lg font-semibold text-[#f1f5f9] mb-3">Método de pago</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('metodoPago', 'efectivo')}
                    className={`p-2 rounded-md font-medium text-xs transition-all duration-200 ${
                      formData.metodoPago === 'efectivo'
                        ? 'bg-[#48BB78] text-white shadow-md'
                        : 'bg-[#334155] text-[#e2e8f0] hover:bg-[#475569] border border-[#475569]'
                    }`}
                  >
                    <div className="text-center font-semibold">Efectivo</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('metodoPago', 'transferencia')}
                    className={`p-2 rounded-md font-medium text-xs transition-all duration-200 ${
                      formData.metodoPago === 'transferencia'
                        ? 'bg-[#48BB78] text-white shadow-md'
                        : 'bg-[#334155] text-[#e2e8f0] hover:bg-[#475569] border border-[#475569]'
                    }`}
                  >
                    <div className="text-center font-semibold">Transferencia</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('metodoPago', 'yape')}
                    className={`p-2 rounded-md font-medium text-xs transition-all duration-200 ${
                      formData.metodoPago === 'yape'
                        ? 'bg-[#48BB78] text-white shadow-md'
                        : 'bg-[#334155] text-[#e2e8f0] hover:bg-[#475569] border border-[#475569]'
                    }`}
                  >
                    <div className="text-center font-semibold">Yape</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('metodoPago', 'plin')}
                    className={`p-2 rounded-md font-medium text-xs transition-all duration-200 ${
                      formData.metodoPago === 'plin'
                        ? 'bg-[#48BB78] text-white shadow-md'
                        : 'bg-[#334155] text-[#e2e8f0] hover:bg-[#475569] border border-[#475569]'
                    }`}
                  >
                    <div className="text-center font-semibold">Plin</div>
                  </button>
                </div>

                {formData.metodoPago === 'efectivo' && (
                  <div className="p-4 bg-[#166534]/50 rounded-lg border border-[#22c55e]/40">
                    <div className="text-center mb-3">
                      <h5 className="text-sm font-bold text-[#86efac]">Pago en Efectivo - Inmediato</h5>
                      <p className="text-xs text-[#bbf7d0]">El cliente paga ahora para reservar fecha futura</p>
                    </div>
                    <div className="text-center text-xs text-[#e2e8f0]">
                      <p>
                        💰 <span className="font-semibold">Proceso:</span> El cliente paga en efectivo ahora mismo en el local para separar su reserva. La reserva se marca automáticamente como &quot;Pagado - Confirmado&quot;.
                      </p>
                    </div>
                  </div>
                )}

                {formData.metodoPago === 'transferencia' && (
                  <div className="p-4 bg-[#166534]/50 rounded-lg border border-[#22c55e]/40">
                    <div className="text-center mb-3">
                      <h5 className="text-sm font-bold text-[#86efac]">Transferencia Bancaria</h5>
                      <p className="text-xs text-[#bbf7d0]">Pago por transferencia bancaria</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div className="text-center min-w-0">
                        <p className="text-[#94a3b8] mb-1">Banco</p>
                        <p className="font-semibold text-[#f1f5f9] truncate">BCP</p>
                      </div>
                      <div className="text-center min-w-0">
                        <p className="text-[#94a3b8] mb-1">Cuenta</p>
                        <p className="font-semibold text-[#f1f5f9] break-words">19312345678012</p>
                      </div>
                      <div className="text-center min-w-0">
                        <p className="text-[#94a3b8] mb-1">Titular</p>
                        <p className="font-semibold text-[#f1f5f9] truncate">María Elena López</p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.metodoPago === 'yape' && (
                  <div className="p-4 bg-[#166534]/50 rounded-lg border border-[#22c55e]/40">
                    <div className="text-center mb-3">
                      <h5 className="text-sm font-bold text-[#86efac]">Yape</h5>
                      <p className="text-xs text-[#bbf7d0]">Pago instantáneo con Yape</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-xs">
                      <div className="text-center">
                        <p className="text-[#94a3b8] mb-1">Nombre</p>
                        <p className="font-semibold text-[#f1f5f9]">María Elena López</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#94a3b8] mb-1">Teléfono</p>
                        <p className="font-semibold text-[#f1f5f9]">+51 999 888 777</p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.metodoPago === 'plin' && (
                  <div className="p-4 bg-[#166534]/50 rounded-lg border border-[#22c55e]/40">
                    <div className="text-center mb-3">
                      <h5 className="text-sm font-bold text-[#86efac]">Plin</h5>
                      <p className="text-xs text-[#bbf7d0]">Pago instantáneo con Plin</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-xs">
                      <div className="text-center">
                        <p className="text-[#94a3b8] mb-1">Nombre</p>
                        <p className="font-semibold text-[#f1f5f9]">María Elena López</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#94a3b8] mb-1">Teléfono</p>
                        <p className="font-semibold text-[#f1f5f9]">+51 999 888 777</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155]">
              <h4 className="text-lg font-semibold text-[#f1f5f9] mb-3">Información del Cliente</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94a3b8] mb-1">Nombre del Cliente *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombreCliente}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[0-9]/g, '');
                      handleInputChange('nombreCliente', value);
                    }}
                    className="w-full px-3 py-2 bg-[#334155] border border-[#475569] rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] text-[#f1f5f9] text-sm placeholder-[#64748b]"
                    placeholder="Ingresa el nombre completo"
                  />
                  <p className="text-xs text-[#94a3b8] mt-1">Solo se permiten letras</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94a3b8] mb-1">Teléfono *</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
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
                      className={`w-full pl-8 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] text-sm bg-[#334155] text-[#f1f5f9] placeholder-[#64748b] ${
                        formData.telefono && !formData.telefono.startsWith('9')
                          ? 'border border-[#ef4444]'
                          : 'border border-[#475569]'
                      }`}
                      placeholder="9XXXXXXXXX"
                      maxLength={9}
                    />
                  </div>
                  {formData.telefono && !formData.telefono.startsWith('9') && (
                    <p className="text-xs text-[#f87171] mt-1">El teléfono debe empezar con 9</p>
                  )}
                  <p className="text-xs text-[#94a3b8] mt-1">Solo números, debe empezar con 9</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94a3b8] mb-1">Email</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#64748b]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-8 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] text-sm bg-[#334155] text-[#f1f5f9] placeholder-[#64748b] ${
                        formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                          ? 'border border-[#ef4444]'
                          : 'border border-[#475569]'
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <p className="text-xs text-[#f87171] mt-1">Ingresa un email válido</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94a3b8] mb-1">Notas Adicionales</label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => handleInputChange('notas', e.target.value)}
                    className="w-full px-3 py-2 bg-[#334155] border border-[#475569] rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] min-h-[80px] resize-none text-sm text-[#f1f5f9] placeholder-[#64748b]"
                    placeholder="Información adicional, comentarios especiales..."
                  />
                  <p className="text-xs text-[#94a3b8] mt-1">Campo opcional</p>
                </div>
              </div>
            </div>
          </div>
        );

            case 3:
        return (
            <div className="space-y-6">
              <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155]">
                <h4 className="text-lg font-semibold text-[#f1f5f9] mb-3">Resumen de tu reserva</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1">Campo</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">Campo Deportivo Central</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1">Cancha</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">#{formData.cancha ? '1' : '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1">Horarios</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">{horariosSeleccionados.join(', ') || 'No seleccionados'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1">Duración</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">{horariosSeleccionados.length} hora(s)</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1">Tipo de pago</p>
                    <p className="text-sm font-semibold text-[#f1f5f9]">{formData.metodoPago}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-1">Total</p>
                    <p className="text-lg font-bold text-[#48BB78]">S/ {calcularPrecioTotal()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#252d3a] rounded-xl p-4 border border-[#334155]">
                <h4 className="text-lg font-semibold text-[#f1f5f9] mb-3">Estado de la Reserva</h4>
                <div className="max-w-md">
                  <select
                    required
                    value={formData.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    className="w-full px-3 py-2 bg-[#334155] border border-[#475569] rounded-lg focus:ring-2 focus:ring-[#48BB78] focus:border-[#48BB78] text-[#f1f5f9]"
                  >
                    <option value="pendiente_de_pago">Pendiente de Pago</option>
                    <option value="pagado_confirmado">Pagado - Confirmado</option>
                  </select>
                </div>
                <p className="mt-2 text-xs text-[#bbf7d0] bg-[#166534]/50 p-2 rounded-lg border border-[#22c55e]/40">
                  <span className="font-semibold">Nota:</span>{' '}
                  {formData.metodoPago === 'efectivo'
                    ? 'Pago en efectivo: El cliente ya pagó en el local, la reserva está confirmada automáticamente.'
                    : 'El campo no se separa hasta que se actualice el estado a "Pagado - Confirmado"'}
                </p>
              </div>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#101f28]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#1e293b] rounded-xl border border-[#334155] p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#f1f5f9]">Nueva Reserva</h1>
          <p className="text-[#94a3b8] mt-2">Crea una nueva reserva para generar ingresos</p>
        </div>

        {/* Barra de Progreso */}
        <div className="bg-[#252d3a] rounded-xl p-6 border border-[#334155] mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${currentStep >= 1 ? 'text-[#48BB78]' : 'text-[#64748b]'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-[#48BB78] text-white' : 'bg-[#334155] text-[#64748b]'
              }`}>
                <ClockIcon className="h-5 w-5" />
              </div>
              <span className="font-medium">Horarios</span>
            </div>

            <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-[#48BB78]' : 'bg-[#334155]'}`}></div>

            <div className={`flex items-center space-x-3 ${currentStep >= 2 ? 'text-[#48BB78]' : 'text-[#64748b]'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-[#48BB78] text-white' : 'bg-[#334155] text-[#64748b]'
              }`}>
                <CreditCardIcon className="h-5 w-5" />
              </div>
              <span className="font-medium">Pago</span>
            </div>

            <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-[#48BB78]' : 'bg-[#334155]'}`}></div>

            <div className={`flex items-center space-x-3 ${currentStep >= 3 ? 'text-[#48BB78]' : 'text-[#64748b]'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-[#48BB78] text-white' : 'bg-[#334155] text-[#64748b]'
              }`}>
                <CheckCircleIcon className="h-5 w-5" />
              </div>
              <span className="font-medium">Confirmar</span>
            </div>
          </div>
        </div>

        {/* Contenido del Paso */}
        {renderStepContent()}

        {/* Botones de Navegación */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg font-medium transition-colors bg-[#334155] text-[#e2e8f0] hover:bg-[#475569] border border-[#475569]"
            >
              Anterior
            </button>
          )}

          {currentStep === 1 && <div></div>}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={limpiarFormulario}
              className="px-6 py-3 bg-[#48BB78] text-white rounded-lg font-medium hover:bg-[#22c55e] transition-colors"
            >
              Limpiar
            </button>

            {currentStep === 3 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#48BB78] text-white rounded-lg font-medium hover:bg-[#22c55e] transition-colors"
              >
                Crear Reserva
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.cancha || !formData.fecha || horariosSeleccionados.length === 0)) ||
                  (currentStep === 2 && (!formData.nombreCliente || !formData.telefono))
                }
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center border ${
                  (currentStep === 1 && (!formData.cancha || !formData.fecha || horariosSeleccionados.length === 0)) ||
                  (currentStep === 2 && (!formData.nombreCliente || !formData.telefono))
                    ? 'bg-[#334155] text-[#64748b] cursor-not-allowed border-[#475569]'
                    : 'bg-white text-[#1e293b] hover:bg-[#f1f5f9] border-[#475569]'
                }`}
              >
                Continuar
                <span className="ml-2">→</span>
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaReserva;
