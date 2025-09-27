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

// ⏰ TIPOS DE TURNOS
export const MOCK_TIPOS_TURNOS = [
  {
    id: 1,
    nombre: "Turno Mañana",
  },
  {
    id: 2,
    nombre: "Turno Tarde",
  },
  {
    id: 3,
    nombre: "Turno Noche",
  }
];

export const MOCK_MOTIVOS_TURNOS = [
  {
    id: 1,
    id_empresa: 1,
    nombre: "Capacitación",
    descripcion: "Turno reservado para instancias de formación o capacitación.",
  },
  {
    id: 2,
    id_empresa: 1,
    nombre: "Reunión interna",
    descripcion: "Motivo para turnos destinados a reuniones internas del equipo.",
  },
  {
    id: 3,
    id_empresa: 2,
    nombre: "Mantenimiento técnico",
    descripcion: "Turno asignado para realizar tareas de mantenimiento técnico o de infraestructura.",
  }
];

export const MOCK_TIPOS_SERVICIOS = [
  {
    id: 1,
    id_empresa: 1,
    nombre: "Consulta Médica General",
    descripcion: "Servicio destinado a consultas clínicas generales.",
    duracion_minutos: 30,
  },
  {
    id: 2,
    id_empresa: 1,
    nombre: "Atención Odontológica",
    descripcion: "Consulta con odontólogo para diagnóstico y tratamiento básico.",
    duracion_minutos: 45,
  },
  {
    id: 3,
    id_empresa: 2,
    nombre: "Chequeo General Preventivo",
    descripcion: "Servicio preventivo de salud con estudios básicos.",
    duracion_minutos: 60,
  }
];


// 🏢 EMPRESAS
export const MOCK_EMPRESAS = [
  { id: 1, nombre: 'JPH Lions', razon_social: 'JPH Lions SRL', activo: true },
  { id: 2, nombre: 'Empresa Demo', razon_social: 'Empresa Demo SA', activo: true },
];

export const EMPRESAS_OPTIONS = MOCK_EMPRESAS.map(empresa => ({
  value: empresa.id,
  label: empresa.nombre
}));


export {
  estadoTipoOptions,
  estadoIcons,
}