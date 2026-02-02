import React, { useState } from "react";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  TimesCircleIcon,
  SearchIcon,
} from "../components/icons/Icons";
import { Cancha, Local } from "../types/Empresa";

const Canchas: React.FC = () => {
  const tiposCancha = [
    "Fútbol 11",
    "Fútbol 7",
    "Fútbol 5",
    "Fútbol 8",
    "Fútbol 9",
  ];

  const empresaActualId = "empresa_1";

  const todosLosLocales: Local[] = [
    {
      id: "1",
      nombre: "Complejo de Fútbol Norte",
      direccion: "Av. Principal 123, Lima Norte",
      telefono: "+51 987 654 321",
      email: "norte@complejofutbol.com",
      activo: true,
      fechaCreacion: "2024-01-01",
      canchas: [],
      empresaId: "empresa_1", // Este local pertenece a la empresa actual
    },
    {
      id: "2",
      nombre: "Centro de Fútbol Sur",
      direccion: "Jr. Deportes 456, Lima Sur",
      telefono: "+51 987 654 322",
      email: "sur@centrofutbol.com",
      activo: true,
      fechaCreacion: "2024-01-15",
      canchas: [],
      empresaId: "empresa_1", // Este local pertenece a la empresa actual
    },
    {
      id: "3",
      nombre: "Estadio de Fútbol Este",
      direccion: "Av. Deportiva 789, Lima Este",
      telefono: "+51 987 654 323",
      email: "este@estadiofutbol.com",
      activo: true,
      fechaCreacion: "2024-02-01",
      canchas: [],
      empresaId: "empresa_2", // Este local pertenece a OTRO dueño
    },
    {
      id: "4",
      nombre: "Complejo Deportivo Oeste",
      direccion: "Av. Oeste 999, Lima Oeste",
      telefono: "+51 987 654 324",
      email: "oeste@complejodeportivo.com",
      activo: false,
      fechaCreacion: "2024-02-15",
      canchas: [],
      empresaId: "dueño_3", // Este local pertenece a OTRO dueño
    },
  ];

  // Filtrar solo los locales del dueño actual
  const locales = todosLosLocales.filter(
    (local) => local.empresaId === empresaActualId,
  );

  // Datos de todas las canchas (en un sistema real esto vendría de la base de datos)
  const todasLasCanchas: Cancha[] = [
    {
      id: "1",
      nombre: "Cancha Principal",
      tipo: "Fútbol 11",
      precioHora: 60,
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
      localId: "1", // Pertenece al Complejo de Fútbol Norte (dueño_1)
    },
    {
      id: "2",
      nombre: "Cancha Secundaria",
      tipo: "Fútbol 7",
      precioHora: 80,
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      localId: "1", // Pertenece al Complejo de Fútbol Norte (dueño_1)
    },
    {
      id: "3",
      nombre: "Cancha Fútbol 5",
      tipo: "Fútbol 5",
      precioHora: 50,
      disponible: false,
      imagen:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      localId: "2", // Pertenece al Centro de Fútbol Sur (dueño_1)
    },
    {
      id: "4",
      nombre: "Cancha Olímpica",
      tipo: "Fútbol 11",
      precioHora: 100,
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
      localId: "3", // Pertenece al Estadio de Fútbol Este (dueño_2) - NO debe aparecer
    },
    {
      id: "5",
      nombre: "Cancha VIP",
      tipo: "Fútbol 7",
      precioHora: 120,
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      localId: "4", // Pertenece al Complejo Deportivo Oeste (dueño_3) - NO debe aparecer
    },
  ];

  // Filtrar solo las canchas que pertenecen a los locales del dueño actual
  const canchasIniciales = todasLasCanchas.filter((cancha) => {
    const local = todosLosLocales.find((l) => l.id === cancha.localId);
    return local && local.empresaId === empresaActualId;
  });

  const [canchas, setCanchas] = useState<Cancha[]>(canchasIniciales);

  // Estados para filtros
  const [filtros, setFiltros] = useState({
    busqueda: "",
    local: "todos",
    tipo: "",
    estado: "",
  });

  // Función para manejar cambios en filtros
  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      local: "todos",
      tipo: "",
      estado: "",
    });
  };

  // Filtrar canchas con todos los criterios
  const canchasFiltradas = canchas.filter((cancha) => {
    // const local = todosLosLocales.find(l => l.id === cancha.localId); // No usado actualmente

    // Filtro por búsqueda (nombre de cancha)
    const cumpleBusqueda = cancha.nombre
      .toLowerCase()
      .includes(filtros.busqueda.toLowerCase());

    // Filtro por local
    const cumpleLocal =
      filtros.local === "todos" || cancha.localId === filtros.local;

    // Filtro por tipo
    const cumpleTipo = filtros.tipo === "" || cancha.tipo === filtros.tipo;

    // Filtro por estado
    const cumpleEstado =
      filtros.estado === "" ||
      (filtros.estado === "disponible" && cancha.disponible) ||
      (filtros.estado === "mantenimiento" && !cancha.disponible);

    return cumpleBusqueda && cumpleLocal && cumpleTipo && cumpleEstado;
  });

  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const canchasPorPagina = 3;

  // Paginación
  const totalPaginas = Math.ceil(canchasFiltradas.length / canchasPorPagina);
  const inicioIndice = (paginaActual - 1) * canchasPorPagina;
  const finIndice = inicioIndice + canchasPorPagina;
  const canchasPaginadas = canchasFiltradas.slice(inicioIndice, finIndice);

  // Funciones de paginación
  const cambiarPagina = (numeroPagina: number) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  const irAPrimeraPagina = () => setPaginaActual(1);
  const irAUltimaPagina = () => setPaginaActual(totalPaginas);

  // Resetear página cuando cambien los filtros
  React.useEffect(() => {
    setPaginaActual(1);
  }, [filtros]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [canchaEditando, setCanchaEditando] = useState<Cancha | null>(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [canchaEliminar, setCanchaEliminar] = useState<Cancha | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    precioHora: 0,
    disponible: true,
    imagen: "",
    localId: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      tipo: "",
      precioHora: 0,
      disponible: true,
      imagen: "",
      localId: "",
    });
    setCanchaEditando(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (canchaEditando) {
      // Editar cancha existente
      setCanchas((prev) =>
        prev.map((cancha) =>
          cancha.id === canchaEditando.id ? { ...cancha, ...formData } : cancha,
        ),
      );
    } else {
      // Crear nueva cancha
      const nuevaCancha: Cancha = {
        id: Date.now().toString(),
        ...formData,
      };
      setCanchas((prev) => [...prev, nuevaCancha]);
    }

    limpiarFormulario();
    setModalAbierto(false);
  };

  const editarCancha = (cancha: Cancha) => {
    setCanchaEditando(cancha);
    setFormData({
      nombre: cancha.nombre,
      tipo: cancha.tipo,
      precioHora: cancha.precioHora,
      disponible: cancha.disponible,
      imagen: cancha.imagen || "",
      localId: cancha.localId,
    });
    setModalAbierto(true);
  };

  const abrirModalNuevaCancha = () => {
    limpiarFormulario();
    setModalAbierto(true);
  };

  const abrirModalEliminar = (cancha: Cancha) => {
    setCanchaEliminar(cancha);
    setModalEliminarAbierto(true);
  };

  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
    setCanchaEliminar(null);
  };

  const confirmarEliminar = () => {
    if (canchaEliminar) {
      setCanchas((prev) =>
        prev.filter((cancha) => cancha.id !== canchaEliminar.id),
      );
      cerrarModalEliminar();
    }
  };

  const getEstadoColor = (disponible: boolean) => {
    return disponible
      ? "bg-green-100 text-green-800"
      : "bg-orange-100 text-orange-800";
  };

  const getEstadoLabel = (disponible: boolean) => {
    return disponible ? "Operando" : "En Mantenimiento";
  };

  return (
    <>
      <div className="space-y-8 px-8 py-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">
              Gestión de Canchas
            </h1>
            <p className="text-slate-600 mt-1">
              Administra las canchas disponibles en el sistema
            </p>
          </div>
          <div className="flex-shrink-0 md:ml-6">
            <button
              onClick={abrirModalNuevaCancha}
              className="btn-primary whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nueva Cancha
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={filtros.busqueda}
                  onChange={(e) =>
                    handleFiltroChange("busqueda", e.target.value)
                  }
                  className="input-field pl-8 py-2 text-sm"
                  placeholder="Nombre de cancha..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Local
              </label>
              <select
                value={filtros.local}
                onChange={(e) => handleFiltroChange("local", e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="todos">Todos los Locales</option>
                {locales.map((local) => (
                  <option key={local.id} value={local.id}>
                    {local.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo
              </label>
              <select
                value={filtros.tipo}
                onChange={(e) => handleFiltroChange("tipo", e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="">Todos los Tipos</option>
                {tiposCancha.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => handleFiltroChange("estado", e.target.value)}
                className="input-field py-2 text-sm"
              >
                <option value="">Todos los Estados</option>
                <option value="disponible">Disponible</option>
                <option value="mantenimiento">En Mantenimiento</option>
              </select>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
              <div className="text-sm text-slate-600">
                <span className="font-medium">Tip:</span> Filtra por nombre,
                local, tipo y estado de las canchas
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={limpiarFiltros}
                  className="btn-secondary flex items-center justify-center px-3 py-1 text-sm"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Canchas */}
        <div className="card">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 mb-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">
                Lista de Canchas
              </h2>
            </div>
            <div className="flex-shrink-0 lg:ml-6">
              <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                {canchasFiltradas.length} cancha
                {canchasFiltradas.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="overflow-hidden">
            {/* Tabla para desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Imagen</th>
                    <th className="table-header">Nombre</th>
                    <th className="table-header">Tipo</th>
                    <th className="table-header">Local</th>
                    <th className="table-header">Precio/Hora</th>
                    <th className="table-header">Estado</th>
                    <th className="table-header text-center w-32">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y-2 divide-gray-100">
                  {canchasPaginadas.map((cancha) => (
                    <tr key={cancha.id} className="table-row">
                      <td className="table-cell">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100">
                          {cancha.imagen ? (
                            <img
                              src={cancha.imagen}
                              alt={cancha.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <span className="text-2xl">🏟️</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="font-semibold text-slate-900">
                          {cancha.nombre}
                        </div>
                      </td>
                      <td className="table-cell text-slate-600">
                        {cancha.tipo}
                      </td>
                      <td className="table-cell text-slate-600">
                        {locales.find((local) => local.id === cancha.localId)
                          ?.nombre || "Sin local"}
                      </td>
                      <td className="table-cell font-bold text-slate-900">
                        S/ {cancha.precioHora}
                      </td>
                      <td className="table-cell">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(cancha.disponible)}`}
                        >
                          {getEstadoLabel(cancha.disponible)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 w-32">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => editarCancha(cancha)}
                            className="inline-flex items-center justify-center p-2.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 border-2 border-blue-200 hover:border-blue-600"
                            title="Editar cancha"
                          >
                            <EditIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => abrirModalEliminar(cancha)}
                            className="inline-flex items-center justify-center p-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border-2 border-red-200 hover:border-red-600"
                            title="Eliminar cancha"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Vista móvil */}
            <div className="md:hidden space-y-4">
              {canchasFiltradas.map((cancha) => (
                <div key={cancha.id} className="card-hover">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      {cancha.imagen ? (
                        <img
                          src={cancha.imagen}
                          alt={cancha.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="text-2xl">🏟️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {cancha.nombre}
                          </h3>
                          <p className="text-slate-600">{cancha.tipo}</p>
                          <p className="text-slate-500 text-sm">
                            {locales.find(
                              (local) => local.id === cancha.localId,
                            )?.nombre || "Sin local"}
                          </p>
                          <p className="font-bold text-slate-900 text-lg">
                            S/ {cancha.precioHora}/hora
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(cancha.disponible)}`}
                        >
                          {getEstadoLabel(cancha.disponible)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t-2 border-gray-200">
                    <button
                      onClick={() => editarCancha(cancha)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Editar cancha"
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => abrirModalEliminar(cancha)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Eliminar cancha"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles de Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t-2 border-gray-200">
              <div className="flex items-center text-sm text-slate-700">
                <span>
                  Mostrando {inicioIndice + 1} a{" "}
                  {Math.min(finIndice, canchasFiltradas.length)} de{" "}
                  {canchasFiltradas.length} canchas
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={irAPrimeraPagina}
                  disabled={paginaActual === 1}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === 1
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Primera
                </button>

                <button
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === 1
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Anterior
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                    let numeroPagina: number;
                    if (totalPaginas <= 5) {
                      numeroPagina = i + 1;
                    } else if (paginaActual <= 3) {
                      numeroPagina = i + 1;
                    } else if (paginaActual >= totalPaginas - 2) {
                      numeroPagina = totalPaginas - 4 + i;
                    } else {
                      numeroPagina = paginaActual - 2 + i;
                    }

                    return (
                      <button
                        key={numeroPagina}
                        onClick={() => cambiarPagina(numeroPagina)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                          paginaActual === numeroPagina
                            ? "bg-green-600 text-white"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === totalPaginas
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Siguiente
                </button>

                <button
                  onClick={irAUltimaPagina}
                  disabled={paginaActual === totalPaginas}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    paginaActual === totalPaginas
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Última
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para Nueva/Editar Cancha */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900">
                {canchaEditando ? "Editar Cancha" : "Nueva Cancha"}
              </h3>
              <button
                onClick={() => {
                  setModalAbierto(false);
                  limpiarFormulario();
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <TimesCircleIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-4 space-y-4">
              {/* Información Principal */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 border-2 border-gray-200">
                    {canchaEditando &&
                    canchaEditando.imagen &&
                    canchaEditando.imagen.trim() !== "" ? (
                      <img
                        src={canchaEditando.imagen}
                        alt={canchaEditando.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full flex items-center justify-center text-slate-400 ${canchaEditando && canchaEditando.imagen && canchaEditando.imagen.trim() !== "" ? "bg-slate-50" : "bg-green-100"}`}
                      style={{
                        display:
                          canchaEditando &&
                          canchaEditando.imagen &&
                          canchaEditando.imagen.trim() !== ""
                            ? "none"
                            : "flex",
                      }}
                    >
                      <span className="text-lg">🏟️</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">
                    {canchaEditando ? "Editar Cancha" : "Nueva Cancha"}
                  </h2>
                  <p className="text-slate-600 text-sm">
                    {canchaEditando
                      ? "Modifica los datos de la cancha"
                      : "Registra una nueva cancha en el sistema"}
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="bg-slate-50 rounded-lg p-3">
                  <h4 className="text-base font-semibold text-slate-900 mb-3">
                    Información de la Cancha
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Nombre de la Cancha *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                          handleInputChange("nombre", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Ej: Cancha Principal"
                      />
                    </div>

                    {/* Tipo */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Tipo de Cancha *
                      </label>
                      <select
                        required
                        value={formData.tipo}
                        onChange={(e) =>
                          handleInputChange("tipo", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Selecciona el tipo</option>
                        {tiposCancha.map((tipo) => (
                          <option key={tipo} value={tipo}>
                            {tipo}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Local */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Local *
                      </label>
                      <select
                        required
                        value={formData.localId}
                        onChange={(e) =>
                          handleInputChange("localId", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Selecciona el local</option>
                        {locales.map((local) => (
                          <option key={local.id} value={local.id}>
                            {local.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Precio */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Precio por Hora *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                          S/
                        </span>
                        <input
                          type="number"
                          required
                          min="0"
                          step="10"
                          value={formData.precioHora}
                          onChange={(e) =>
                            handleInputChange(
                              "precioHora",
                              parseInt(e.target.value),
                            )
                          }
                          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Estado
                      </label>
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="disponible"
                            checked={formData.disponible}
                            onChange={() =>
                              handleInputChange("disponible", true)
                            }
                            className="mr-2 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-slate-700">Operando</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="disponible"
                            checked={!formData.disponible}
                            onChange={() =>
                              handleInputChange("disponible", false)
                            }
                            className="mr-2 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-slate-700">
                            En Mantenimiento
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Imagen */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Imagen de la Cancha
                      </label>
                      <p className="text-xs text-slate-500 mb-2">
                        Solo se permite una imagen por cancha (máximo 5MB)
                      </p>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={
                            !!(formData.imagen && formData.imagen.trim() !== "")
                          }
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Validar que sea una imagen
                              if (!file.type.startsWith("image/")) {
                                alert(
                                  "Por favor selecciona solo archivos de imagen",
                                );
                                e.target.value = "";
                                return;
                              }

                              // Validar tamaño (máximo 5MB)
                              if (file.size > 5 * 1024 * 1024) {
                                alert("La imagen debe ser menor a 5MB");
                                e.target.value = "";
                                return;
                              }

                              const reader = new FileReader();
                              reader.onload = (event) => {
                                handleInputChange(
                                  "imagen",
                                  event.target?.result as string,
                                );
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className={`block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 ${
                            formData.imagen && formData.imagen.trim() !== ""
                              ? "opacity-50 cursor-not-allowed file:bg-slate-100 file:text-slate-500"
                              : "hover:file:bg-green-100"
                          }`}
                        />
                        {formData.imagen && formData.imagen.trim() !== "" && (
                          <p className="text-xs text-orange-600 mt-1">
                            Para cambiar la imagen, elimina la actual primero
                          </p>
                        )}
                      </div>
                      {formData.imagen && formData.imagen.trim() !== "" && (
                        <div className="mt-2">
                          <p className="text-sm text-slate-600 mb-1">
                            Vista previa:
                          </p>
                          <div className="relative inline-block">
                            <div className="w-28 h-20 rounded-lg overflow-hidden bg-white border-2 border-gray-200">
                              <img
                                src={formData.imagen}
                                alt="Vista previa"
                                className="w-full h-full object-cover"
                                onLoad={(e) => {
                                  // Asegurar que la imagen se muestre correctamente
                                  e.currentTarget.style.display = "block";
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  const fallback = e.currentTarget
                                    .nextElementSibling as HTMLElement;
                                  if (fallback) {
                                    fallback.style.display = "flex";
                                  }
                                }}
                              />
                              <div
                                className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50"
                                style={{ display: "none" }}
                              >
                                <span className="text-sm">🏟️</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleInputChange("imagen", "");
                                // Limpiar el input de archivo
                                const fileInput = document.querySelector(
                                  'input[type="file"]',
                                ) as HTMLInputElement;
                                if (fileInput) {
                                  fileInput.value = "";
                                }
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-colors duration-200"
                              title="Eliminar imagen"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAbierto(false);
                      limpiarFormulario();
                    }}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border-2 border-gray-200 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border-2 border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 flex items-center space-x-2"
                  >
                    {canchaEditando ? (
                      <>
                        <EditIcon className="h-4 w-4" />
                        <span>Actualizar Cancha</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-4 w-4" />
                        <span>Crear Cancha</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {modalEliminarAbierto && canchaEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Confirmar Eliminación
              </h3>
              <button
                onClick={cerrarModalEliminar}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <TimesCircleIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-6">
              {/* Información Principal */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    {canchaEliminar.imagen &&
                    canchaEliminar.imagen.trim() !== "" ? (
                      <img
                        src={canchaEliminar.imagen}
                        alt={canchaEliminar.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full flex items-center justify-center text-slate-400 ${canchaEliminar.imagen && canchaEliminar.imagen.trim() !== "" ? "bg-slate-50" : "bg-red-100"}`}
                      style={{
                        display:
                          canchaEliminar.imagen &&
                          canchaEliminar.imagen.trim() !== ""
                            ? "none"
                            : "flex",
                      }}
                    >
                      <span className="text-xl">🏟️</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {canchaEliminar.nombre}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {canchaEliminar.tipo} -{" "}
                    {canchaEliminar.disponible
                      ? "Operando"
                      : "En Mantenimiento"}
                  </p>
                </div>
              </div>

              {/* Información de Eliminación */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="text-lg font-semibold text-red-900 mb-3">
                  Confirmar Eliminación
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-red-800">
                    Estás a punto de eliminar la cancha{" "}
                    <strong>{canchaEliminar.nombre}</strong>y toda su
                    información asociada.
                  </p>

                  <div className="text-sm text-red-700">
                    <p className="font-medium mb-2">
                      Información que se eliminará:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Datos de la cancha</li>
                      <li>Historial de reservas</li>
                      <li>Configuración y precios</li>
                      <li>Imagen de la cancha</li>
                    </ul>
                  </div>

                  <div className="bg-red-100 border border-red-300 rounded-md p-3">
                    <p className="text-sm font-medium text-red-800">
                      Esta acción no se puede deshacer
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={cerrarModalEliminar}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminar}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 flex items-center space-x-2"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Eliminar Cancha</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Canchas;
