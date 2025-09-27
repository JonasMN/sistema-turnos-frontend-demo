// ========================
// ESTADOS (legacy - mantener por si se usa en otra parte)
// ========================
const estadoTipoOptions = [
  { label: "TODOS", value: "T" },
  { label: "PARADA!", value: "1" },
  { label: "OPERATIVIDAD REDUCIDA", value: "2" },
  { label: "INACTIVA", value: "3" },
  { label: "OPERATIVA", value: "4" },
]

const estadoIcons = {
  "PARADA!": "exclamation-triangle",
  "OPERATIVIDAD REDUCIDA": "exclamation-circle",
  "INACTIVA": "info-lg",
  "OPERATIVA": "check-lg",
}

// ========================
// MOCK DATA CENTRALIZADO
// ========================

// 🏢 EMPRESAS
export const MOCK_EMPRESAS = [
  { id: 1, nombre: 'JPH Lions', razon_social: 'JPH Lions SRL', activo: true },
  { id: 2, nombre: 'Empresa Demo', razon_social: 'Empresa Demo SA', activo: true },
];

export const EMPRESAS_OPTIONS = MOCK_EMPRESAS.map(empresa => ({
  value: empresa.id,
  label: empresa.nombre
}));

// 🏢 UNIDADES
export const MOCK_UNIDADES = [
  { 
    id: 1, 
    nombre: 'Unidad 1', 
    direccion: 'Av. Corrientes 1234', 
    telefono: '+54 11 1234-5678', 
    id_empresa: 1, 
    activo: true 
  },
  { 
    id: 2, 
    nombre: 'Unidad 2', 
    direccion: 'Av. Santa Fe 5678', 
    telefono: '+54 11 8765-4321', 
    id_empresa: 1, 
    activo: false 
  },
];

export const UNIDADES_OPTIONS = MOCK_UNIDADES.map(unidad => ({
  value: unidad.id,
  label: unidad.nombre
}));

// 🏷️ TIPOS DE UBICACION
export const MOCK_TIPOS_UBICACION = [
  { id: 1, nombre: 'Oficina' },
  { id: 2, nombre: 'Sala de Reuniones' },
  { id: 3, nombre: 'Laboratorio' },
];

export const TIPOS_UBICACION_OPTIONS = MOCK_TIPOS_UBICACION.map(tipo => ({
  value: tipo.id,
  label: tipo.nombre
}));

// 🏪 UBICACIONES
export const MOCK_UBICACIONES = [
  { 
    id: 1, 
    nombre: 'Recepción Principal', 
    descripcion: 'Área de recepción y atención al cliente', 
    id_unidad: 1, 
    id_tipo_ubicacion: 1, 
    activo: true 
  },
  { 
    id: 2, 
    nombre: 'Sala de Reuniones A', 
    descripcion: 'Sala equipada para reuniones ejecutivas', 
    id_unidad: 1, 
    id_tipo_ubicacion: 2, 
    activo: true 
  },
  { 
    id: 3, 
    nombre: 'Laboratorio 1', 
    descripcion: 'Laboratorio principal con equipamiento completo', 
    id_unidad: 1, 
    id_tipo_ubicacion: 3, 
    activo: true 
  },
  { 
    id: 4, 
    nombre: 'Oficina Administrativa', 
    descripcion: 'Oficina para gestiones administrativas', 
    id_unidad: 2, 
    id_tipo_ubicacion: 1, 
    activo: true 
  },
  { 
    id: 5, 
    nombre: 'Sala de Reuniones B', 
    descripcion: 'Sala secundaria para reuniones', 
    id_unidad: 2, 
    id_tipo_ubicacion: 2, 
    activo: true 
  },
  { 
    id: 6, 
    nombre: 'Consultorio Médico', 
    descripcion: 'Consultorio para atención médica general', 
    id_unidad: 1, 
    id_tipo_ubicacion: 1, 
    activo: true 
  },
];

// 📅 AGENDAS POR UBICACIÓN (datos de prueba)
// REGLA: Una ubicación = Una sola agenda
// REGLA: Un día por ubicación = Un solo bloque de horario
export const MOCK_AGENDAS = [
  // UNIDAD 1 - UBICACIÓN 1: Recepción Principal
  {
    id: 1,
    id_unidad: 1,
    id_ubicacion: 1,
    nombre: 'Agenda Recepción Principal',
    descripcion: 'Horarios de atención al público',
    // Cada día tiene UN SOLO horario
    horarios_por_dia: {
      'lunes': { h_inicio: '08:00', h_fin: '17:00', cupos_max: 3, intervalo: 20 },
      'martes': { h_inicio: '08:00', h_fin: '17:00', cupos_max: 3, intervalo: 20 },
      'miércoles': { h_inicio: '08:00', h_fin: '17:00', cupos_max: 3, intervalo: 20 },
      'jueves': { h_inicio: '08:00', h_fin: '17:00', cupos_max: 3, intervalo: 20 },
      'viernes': { h_inicio: '08:00', h_fin: '16:00', cupos_max: 2, intervalo: 20 }, // Viernes horario reducido
      'sábado': { h_inicio: '09:00', h_fin: '13:00', cupos_max: 2, intervalo: 30 }
    },
    activo: true,
    fecha_creacion: '2024-01-15'
  },

  // UNIDAD 1 - UBICACIÓN 2: Sala de Reuniones A
  {
    id: 2,
    id_unidad: 1,
    id_ubicacion: 2,
    nombre: 'Agenda Sala Reuniones A',
    descripcion: 'Reservas para reuniones ejecutivas y departamentales',
    horarios_por_dia: {
      'lunes': { h_inicio: '09:00', h_fin: '18:00', cupos_max: 1, intervalo: 120 }, // Reuniones ejecutivas
      'martes': { h_inicio: '10:00', h_fin: '16:00', cupos_max: 1, intervalo: 90 }, // Reuniones departamentales
      'miércoles': { h_inicio: '09:00', h_fin: '18:00', cupos_max: 1, intervalo: 120 },
      'jueves': { h_inicio: '10:00', h_fin: '16:00', cupos_max: 1, intervalo: 90 },
      'viernes': { h_inicio: '09:00', h_fin: '15:00', cupos_max: 1, intervalo: 120 } // Viernes más corto
    },
    activo: true,
    fecha_creacion: '2024-01-20'
  },

  // UNIDAD 1 - UBICACIÓN 3: Laboratorio 1
  {
    id: 3,
    id_unidad: 1,
    id_ubicacion: 3,
    nombre: 'Agenda Laboratorio 1',
    descripcion: 'Turnos para análisis y estudios',
    horarios_por_dia: {
      'lunes': { h_inicio: '07:00', h_fin: '19:00', cupos_max: 2, intervalo: 45 }, // Jornada completa
      'martes': { h_inicio: '07:00', h_fin: '19:00', cupos_max: 2, intervalo: 45 },
      'miércoles': { h_inicio: '07:00', h_fin: '19:00', cupos_max: 2, intervalo: 45 },
      'jueves': { h_inicio: '07:00', h_fin: '15:00', cupos_max: 2, intervalo: 45 }, // Solo mañana
      'viernes': { h_inicio: '08:00', h_fin: '12:00', cupos_max: 1, intervalo: 60 } // Solo mañana, menor capacidad
    },
    activo: true,
    fecha_creacion: '2024-02-01'
  },

  // UNIDAD 2 - UBICACIÓN 4: Oficina Administrativa
  {
    id: 4,
    id_unidad: 2,
    id_ubicacion: 4,
    nombre: 'Agenda Oficina Administrativa',
    descripcion: 'Turnos para trámites y gestiones administrativas',
    horarios_por_dia: {
      'lunes': { h_inicio: '09:30', h_fin: '15:30', cupos_max: 1, intervalo: 30 },
      'miércoles': { h_inicio: '09:30', h_fin: '15:30', cupos_max: 1, intervalo: 30 },
      'viernes': { h_inicio: '10:00', h_fin: '14:00', cupos_max: 1, intervalo: 45 } // Horario reducido
    },
    activo: true,
    fecha_creacion: '2024-01-25'
  },

  // UNIDAD 2 - UBICACIÓN 5: Sala de Reuniones B
  {
    id: 5,
    id_unidad: 2,
    id_ubicacion: 5,
    nombre: 'Agenda Sala Reuniones B',
    descripcion: 'Reuniones de coordinación entre equipos',
    horarios_por_dia: {
      'martes': { h_inicio: '11:00', h_fin: '17:00', cupos_max: 1, intervalo: 60 },
      'jueves': { h_inicio: '10:00', h_fin: '16:00', cupos_max: 1, intervalo: 90 }
    },
    activo: true,
    fecha_creacion: '2024-02-05'
  }
];

// Helper para obtener agendas por ubicación
export const getAgendasByUbicacion = (idUbicacion) => {
  return MOCK_AGENDAS.filter(agenda => agenda.id_ubicacion === parseInt(idUbicacion) && agenda.activo);
};

// Helper para obtener agendas por unidad
export const getAgendasByUnidad = (idUnidad) => {
  return MOCK_AGENDAS.filter(agenda => agenda.id_unidad === parseInt(idUnidad) && agenda.activo);
};

// Helper para obtener ubicación con sus agendas
export const getUbicacionWithAgendas = (idUbicacion) => {
  const ubicacion = MOCK_UBICACIONES.find(ub => ub.id === parseInt(idUbicacion));
  if (!ubicacion) return null;
  
  return {
    ...ubicacion,
    agendas: getAgendasByUbicacion(idUbicacion)
  };
};

// ========================
// EXPORTS (mantener legacy + nuevos)
// ========================
export {
  // Legacy exports
  estadoTipoOptions,
  estadoIcons,
}
