// =====================================
// DATOS MOCKEADOS PARA MODO DEMO
// =====================================

export const mockUsers = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    {
      id: 1,
      name: "Juan",
      surname: "Pérez",
      email: "juan.perez@demo.com",
      activo: true,
      perfiles: [
        { id: 1, nombre: "Administrador" }
      ],
      fechaCreacion: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      name: "María",
      surname: "González",
      email: "maria.gonzalez@demo.com",
      activo: true,
      perfiles: [
        { id: 2, nombre: "Operador" }
      ],
      fechaCreacion: "2024-01-20T14:30:00Z"
    },
    {
      id: 3,
      name: "Carlos",
      surname: "López",
      email: "carlos.lopez@demo.com",
      activo: false,
      perfiles: [
        { id: 3, nombre: "Usuario" }
      ],
      fechaCreacion: "2024-02-01T09:15:00Z"
    },
    {
      id: 4,
      name: "Ana",
      surname: "Martínez",
      email: "ana.martinez@demo.com",
      activo: true,
      perfiles: [
        { id: 4, nombre: "Supervisor" }
      ],
      fechaCreacion: "2024-02-05T11:20:00Z"
    },
    {
      id: 5,
      name: "Luis",
      surname: "García",
      email: "luis.garcia@demo.com",
      activo: true,
      perfiles: [
        { id: 5, nombre: "Técnico" }
      ],
      fechaCreacion: "2024-02-10T16:45:00Z"
    },
    {
      id: 6,
      name: "Carmen",
      surname: "Rodríguez",
      email: "carmen.rodriguez@demo.com",
      activo: true,
      perfiles: [
        { id: 6, nombre: "Recepcionista" }
      ],
      fechaCreacion: "2024-02-15T08:30:00Z"
    }
  ]
};

export const mockPerfiles = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { id: 1, idPerfil: 1, nombre: "Administrador" },
    { id: 2, idPerfil: 2, nombre: "Operador" },
    { id: 3, idPerfil: 3, nombre: "Usuario" },
    { id: 4, idPerfil: 4, nombre: "Supervisor" },
    { id: 5, idPerfil: 5, nombre: "Técnico" },
    { id: 6, idPerfil: 6, nombre: "Recepcionista" }
  ]
};

export const mockTiposVehiculos = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { id: 1, nombre: "Automóvil", descripcion: "Vehículo de pasajeros", activo: true },
    { id: 2, nombre: "Camioneta", descripcion: "Vehículo de carga liviana", activo: true },
    { id: 3, nombre: "Motocicleta", descripcion: "Vehículo de dos ruedas", activo: true },
    { id: 4, nombre: "Camión", descripcion: "Vehículo de carga pesada", activo: true },
    { id: 5, nombre: "Furgón", descripcion: "Vehículo de carga mediana", activo: true },
    { id: 6, nombre: "Microbús", descripcion: "Vehículo de transporte público", activo: false }
  ]
};

export const mockTiposServicios = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { id: 1, nombre: "Mantenimiento", descripcion: "Servicio de mantenimiento preventivo", activo: true },
    { id: 2, nombre: "Reparación", descripcion: "Servicio de reparación", activo: true },
    { id: 3, nombre: "Inspección", descripcion: "Inspección técnica vehicular", activo: true },
    { id: 4, nombre: "Consulta", descripcion: "Consulta general", activo: true },
    { id: 5, nombre: "Diagnóstico", descripcion: "Diagnóstico computarizado", activo: true },
    { id: 6, nombre: "Emergencia", descripcion: "Servicio de emergencia 24hs", activo: false }
  ]
};

export const mockTiposTurnos = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { id: 1, nombre: "Urgente", descripcion: "Turno de urgencia", activo: true },
    { id: 2, nombre: "Regular", descripcion: "Turno programado regular", activo: true },
    { id: 3, nombre: "Seguimiento", descripcion: "Turno de seguimiento", activo: true },
    { id: 4, nombre: "Express", descripcion: "Turno rápido sin cita", activo: true },
    { id: 5, nombre: "Garantía", descripcion: "Turno por garantía", activo: true },
    { id: 6, nombre: "VIP", descripcion: "Turno prioritario premium", activo: false }
  ]
};

export const mockMotivosTurnos = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { id: 1, nombre: "Mantenimiento programado", descripcion: "Mantenimiento según cronograma", activo: true },
    { id: 2, nombre: "Falla mecánica", descripcion: "Problema mecánico reportado", activo: true },
    { id: 3, nombre: "Inspección anual", descripcion: "Inspección requerida por ley", activo: true },
    { id: 4, nombre: "Cambio de aceite", descripcion: "Cambio de aceite y filtros", activo: true },
    { id: 5, nombre: "Problema eléctrico", descripcion: "Falla en sistema eléctrico", activo: true },
    { id: 6, nombre: "Revisión de frenos", descripcion: "Control y ajuste de frenos", activo: false }
  ]
};

export const mockTipoUbicaciones = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { id: 1, nombre: "Taller principal", descripcion: "Taller central de mantenimiento", activo: true },
    { id: 2, nombre: "Sucursal", descripcion: "Sucursal regional", activo: true },
    { id: 3, nombre: "Estación de servicio", descripcion: "Estación de combustible", activo: true },
    { id: 4, nombre: "Centro de diagnóstico", descripcion: "Centro especializado en diagnóstico", activo: true },
    { id: 5, nombre: "Taller express", descripcion: "Servicio rápido y básico", activo: true },
    { id: 6, nombre: "Depósito", descripcion: "Almacén de repuestos", activo: false }
  ]
};

export const mockUnidades = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { 
      id: 1, 
      nombre: "Unidad Norte", 
      telefono: "011-1111-2222", 
      activo: true,
      direccion: {
        direccion_formateada: "Av. del Libertador 1000, Zona Norte"
      }
    },
    { 
      id: 2, 
      nombre: "Unidad Sur", 
      telefono: "011-3333-4444", 
      activo: true,
      direccion: {
        direccion_formateada: "Av. Rivadavia 2500, Zona Sur"
      }
    },
    { 
      id: 3, 
      nombre: "Unidad Centro", 
      telefono: "011-5555-6666", 
      activo: true,
      direccion: {
        direccion_formateada: "Av. Corrientes 800, Centro"
      }
    },
    { 
      id: 4, 
      nombre: "Unidad Este", 
      telefono: "011-7777-8888", 
      activo: true,
      direccion: {
        direccion_formateada: "Av. Cabildo 1500, Zona Este"
      }
    },
    { 
      id: 5, 
      nombre: "Unidad Oeste", 
      telefono: "011-9999-0000", 
      activo: true,
      direccion: {
        direccion_formateada: "Av. Santa Fe 3200, Zona Oeste"
      }
    },
    { 
      id: 6, 
      nombre: "Unidad Aeropuerto", 
      telefono: "011-1234-5678", 
      activo: false,
      direccion: {
        direccion_formateada: "Autopista Riccheri Km 33, Ezeiza"
      }
    }
  ]
};

export const mockUbicaciones = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    { 
      fecha_creacion: "2025-08-27 10:34:24",
      fecha_modificacion: "2025-09-17 14:05:49",
      fecha_baja: "",
      id: 1,
      id_empresa: 1,
      id_unidad: 1,
      nombre: "Taller Central",
      telefono: "011-1111-2222",
      activo: true,
      id_direccion: 1,
      usuario_creacion: 1,
      usuario_modificacion: null,
      usuario_baja: null,
      direccion: {
        fecha_creacion: "2025-09-17 14:05:49",
        fecha_modificacion: "2025-09-17 14:05:49",
        fecha_baja: "",
        id: 1,
        calle: "Av. Principal",
        numero: "123",
        piso: null,
        departamento: null,
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        codigo_postal: "1000",
        direccion_formateada: "Av. Principal 123, CABA, Buenos Aires, Argentina",
        place_id: "ChIJrTLr-GyuEmsRBfy61i59xy1",
        latitud: -34.6037,
        longitud: -58.3816,
        usuario_creacion: "sistema",
        usuario_modificacion: null,
        usuario_baja: null
      }
    },
    { 
      fecha_creacion: "2025-08-27 10:34:24",
      fecha_modificacion: "2025-09-17 14:05:49",
      fecha_baja: "",
      id: 2,
      id_empresa: 1,
      id_unidad: 2,
      nombre: "Sucursal Norte",
      telefono: "011-3333-4444",
      activo: true,
      id_direccion: 2,
      usuario_creacion: 1,
      usuario_modificacion: null,
      usuario_baja: null,
      direccion: {
        fecha_creacion: "2025-09-17 14:05:49",
        fecha_modificacion: "2025-09-17 14:05:49",
        fecha_baja: "",
        id: 2,
        calle: "Calle Norte",
        numero: "456",
        piso: null,
        departamento: null,
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        codigo_postal: "1020",
        direccion_formateada: "Calle Norte 456, CABA, Buenos Aires, Argentina",
        place_id: "ChIJrTLr-GyuEmsRBfy61i59xy2",
        latitud: -34.5500,
        longitud: -58.4000,
        usuario_creacion: "sistema",
        usuario_modificacion: null,
        usuario_baja: null
      }
    },
    { 
      fecha_creacion: "2025-08-27 10:34:24",
      fecha_modificacion: "2025-09-17 14:05:49",
      fecha_baja: "",
      id: 3,
      id_empresa: 1,
      id_unidad: 3,
      nombre: "Estación Sur",
      telefono: "011-5555-6666",
      activo: true,
      id_direccion: 3,
      usuario_creacion: 1,
      usuario_modificacion: null,
      usuario_baja: null,
      direccion: {
        fecha_creacion: "2025-09-17 14:05:49",
        fecha_modificacion: "2025-09-17 14:05:49",
        fecha_baja: "",
        id: 3,
        calle: "Av. Sur",
        numero: "789",
        piso: null,
        departamento: null,
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        codigo_postal: "1030",
        direccion_formateada: "Av. Sur 789, CABA, Buenos Aires, Argentina",
        place_id: "ChIJrTLr-GyuEmsRBfy61i59xy3",
        latitud: -34.6500,
        longitud: -58.3500,
        usuario_creacion: "sistema",
        usuario_modificacion: null,
        usuario_baja: null
      }
    },
    {
      fecha_creacion: "2025-08-27 10:34:24",
      fecha_modificacion: "2025-09-17 14:05:49",
      fecha_baja: "",
      id: 4,
      id_empresa: 1,
      id_unidad: 4,
      nombre: "Centro Diagnóstico Este",
      telefono: "011-7777-8888",
      activo: true,
      id_direccion: 4,
      usuario_creacion: 1,
      usuario_modificacion: null,
      usuario_baja: null,
      direccion: {
        fecha_creacion: "2025-09-17 14:05:49",
        fecha_modificacion: "2025-09-17 14:05:49",
        fecha_baja: "",
        id: 4,
        calle: "Ruta Este",
        numero: "Km 15",
        piso: null,
        departamento: null,
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        codigo_postal: "1040",
        direccion_formateada: "Ruta Este Km 15, CABA, Buenos Aires, Argentina",
        place_id: "ChIJrTLr-GyuEmsRBfy61i59xy4",
        latitud: -34.6200,
        longitud: -58.3200,
        usuario_creacion: "sistema",
        usuario_modificacion: null,
        usuario_baja: null
      }
    },
    {
      fecha_creacion: "2025-08-27 10:34:24",
      fecha_modificacion: "2025-09-17 14:05:49",
      fecha_baja: "",
      id: 5,
      id_empresa: 1,
      id_unidad: 5,
      nombre: "Taller Express Oeste",
      telefono: "011-9999-0000",
      activo: true,
      id_direccion: 5,
      usuario_creacion: 1,
      usuario_modificacion: null,
      usuario_baja: null,
      direccion: {
        fecha_creacion: "2025-09-17 14:05:49",
        fecha_modificacion: "2025-09-17 14:05:49",
        fecha_baja: "",
        id: 5,
        calle: "Av. Libertador",
        numero: "2500",
        piso: null,
        departamento: null,
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        codigo_postal: "1050",
        direccion_formateada: "Av. Libertador 2500, CABA, Buenos Aires, Argentina",
        place_id: "ChIJrTLr-GyuEmsRBfy61i59xy5",
        latitud: -34.5800,
        longitud: -58.4200,
        usuario_creacion: "sistema",
        usuario_modificacion: null,
        usuario_baja: null
      }
    },
    {
      fecha_creacion: "2025-08-27 10:34:24",
      fecha_modificacion: "2025-09-17 14:05:49",
      fecha_baja: "",
      id: 6,
      id_empresa: 1,
      id_unidad: 1,
      nombre: "Depósito Central",
      telefono: "011-1234-5678",
      activo: false,
      id_direccion: 6,
      usuario_creacion: 1,
      usuario_modificacion: null,
      usuario_baja: null,
      direccion: {
        fecha_creacion: "2025-09-17 14:05:49",
        fecha_modificacion: "2025-09-17 14:05:49",
        fecha_baja: "",
        id: 6,
        calle: "Parque Industrial",
        numero: "100",
        piso: null,
        departamento: null,
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        codigo_postal: "1060",
        direccion_formateada: "Parque Industrial 100, CABA, Buenos Aires, Argentina",
        place_id: "ChIJrTLr-GyuEmsRBfy61i59xy6",
        latitud: -34.6400,
        longitud: -58.3700,
        usuario_creacion: "sistema",
        usuario_modificacion: null,
        usuario_baja: null
      }
    }
  ]
};

export const mockTurnos = {
  pagina: 1,
  paginas: 2,
  total: 24,
  resultados: [
    // SEPTIEMBRE 2024
    {
      id: 1,
      fecha: "2024-09-02",
      hora: "08:30",
      cliente: "Pedro Martínez",
      vehiculo: "Toyota Corolla - ABC123",
      tipoServicio: "Mantenimiento",
      ubicacion: "Taller Central",
      id_ubicacion: 1,
      id_unidad: 1,
      estado: "Completado",
      observaciones: "Service 10.000 km - Cambio de aceite y filtros"
    },
    {
      id: 2,
      fecha: "2024-09-03",
      hora: "10:00",
      cliente: "Ana Silva",
      vehiculo: "Honda Civic - DEF456",
      tipoServicio: "Reparación",
      ubicacion: "Sucursal Norte",
      id_ubicacion: 2,
      id_unidad: 2,
      estado: "Completado",
      observaciones: "Cambio de pastillas de freno delanteras"
    },
    {
      id: 3,
      fecha: "2024-09-04",
      hora: "14:00",
      cliente: "Luis García",
      vehiculo: "Ford Focus - GHI789",
      tipoServicio: "Inspección",
      ubicacion: "Centro Diagnóstico Este",
      id_ubicacion: 4,
      id_unidad: 4,
      estado: "Completado",
      observaciones: "Inspección técnica anual - Aprobada"
    },
    {
      id: 4,
      fecha: "2024-09-05",
      hora: "09:15",
      cliente: "Carmen Rodriguez",
      vehiculo: "Chevrolet Cruze - JKL012",
      tipoServicio: "Consulta",
      ubicacion: "Estación Sur",
      id_ubicacion: 3,
      id_unidad: 3,
      estado: "Completado",
      observaciones: "Consulta sobre ruidos en el motor - Diagnosticado"
    },
    {
      id: 5,
      fecha: "2024-09-10",
      hora: "11:30",
      cliente: "Roberto González",
      vehiculo: "Volkswagen Gol - MNO345",
      tipoServicio: "Diagnóstico",
      ubicacion: "Centro Diagnóstico Este",
      id_ubicacion: 4,
      id_unidad: 4,
      estado: "Completado",
      observaciones: "Diagnóstico computarizado - Problema en sensor de oxígeno"
    },
    {
      id: 6,
      fecha: "2024-09-12",
      hora: "15:45",
      cliente: "Sofía Mendez",
      vehiculo: "Peugeot 208 - PQR678",
      tipoServicio: "Mantenimiento",
      ubicacion: "Taller Express Oeste",
      id_ubicacion: 5,
      id_unidad: 5,
      estado: "Completado",
      observaciones: "Cambio de neumáticos 4 unidades - Bridgestone"
    },
    {
      id: 7,
      fecha: "2024-09-15",
      hora: "08:00",
      cliente: "Mario Vargas",
      vehiculo: "Renault Sandero - STU901",
      tipoServicio: "Mantenimiento",
      ubicacion: "Taller Central",
      id_ubicacion: 1,
      id_unidad: 1,
      estado: "Completado",
      observaciones: "Service 20.000 km - Cambio de aceite, filtros y bujías"
    },
    {
      id: 8,
      fecha: "2024-09-18",
      hora: "13:20",
      cliente: "Patricia Morales",
      vehiculo: "Fiat Argo - VWX234",
      tipoServicio: "Reparación",
      ubicacion: "Sucursal Norte",
      id_ubicacion: 2,
      id_unidad: 2,
      estado: "Completado",
      observaciones: "Cambio de embrague completo"
    },
    {
      id: 9,
      fecha: "2024-09-22",
      hora: "10:45",
      cliente: "Diego Ramírez",
      vehiculo: "Chevrolet Onix - YZA567",
      tipoServicio: "Diagnóstico",
      ubicacion: "Centro Diagnóstico Este",
      id_ubicacion: 4,
      id_unidad: 4,
      estado: "Completado",
      observaciones: "Revisión de sistema eléctrico - Alternador defectuoso"
    },
    {
      id: 10,
      fecha: "2024-09-25",
      hora: "16:00",
      cliente: "Gabriela Torres",
      vehiculo: "Nissan March - BCD890",
      tipoServicio: "Inspección",
      ubicacion: "Estación Sur",
      id_ubicacion: 3,
      id_unidad: 3,
      estado: "Completado",
      observaciones: "Pre-inspección técnica - Ajustes menores en luces"
    },
    {
      id: 11,
      fecha: "2024-09-28",
      hora: "09:30",
      cliente: "Fernando Castro",
      vehiculo: "Ford Ka - EFG123",
      tipoServicio: "Mantenimiento",
      ubicacion: "Taller Express Oeste",
      id_ubicacion: 5,
      id_unidad: 5,
      estado: "Completado",
      observaciones: "Alineación y balanceado de ruedas"
    },
    
    // OCTUBRE 2024
    {
      id: 12,
      fecha: "2024-10-01",
      hora: "08:15",
      cliente: "Marcela Herrera",
      vehiculo: "Hyundai i10 - HIJ456",
      tipoServicio: "Mantenimiento",
      ubicacion: "Taller Central",
      id_ubicacion: 1,
      id_unidad: 1,
      estado: "Programado",
      observaciones: "Service 5.000 km programado"
    },
    {
      id: 13,
      fecha: "2024-10-03",
      hora: "11:00",
      cliente: "Andrés Peña",
      vehiculo: "Mitsubishi Lancer - KLM789",
      tipoServicio: "Reparación",
      ubicacion: "Sucursal Norte",
      id_ubicacion: 2,
      id_unidad: 2,
      estado: "En proceso",
      observaciones: "Reparación de sistema de refrigeración"
    },
    {
      id: 14,
      fecha: "2024-10-07",
      hora: "14:30",
      cliente: "Valeria Ruiz",
      vehiculo: "Kia Rio - NOP012",
      tipoServicio: "Diagnóstico",
      ubicacion: "Centro Diagnóstico Este",
      id_ubicacion: 4,
      id_unidad: 4,
      estado: "Programado",
      observaciones: "Diagnóstico de vibraciones en dirección"
    },
    {
      id: 15,
      fecha: "2024-10-10",
      hora: "10:20",
      cliente: "Raúl Mendoza",
      vehiculo: "Volkswagen Polo - QRS345",
      tipoServicio: "Inspección",
      ubicacion: "Estación Sur",
      id_ubicacion: 3,
      id_unidad: 3,
      estado: "Programado",
      observaciones: "Inspección técnica obligatoria"
    },
    {
      id: 16,
      fecha: "2024-10-12",
      hora: "15:15",
      cliente: "Claudia Jiménez",
      vehiculo: "Suzuki Swift - TUV678",
      tipoServicio: "Mantenimiento",
      ubicacion: "Taller Express Oeste",
      id_ubicacion: 5,
      id_unidad: 5,
      estado: "Programado",
      observaciones: "Cambio de aceite y revisión general"
    },
    {
      id: 17,
      fecha: "2024-10-15",
      hora: "09:45",
      cliente: "Héctor Silva",
      vehiculo: "Citroen C3 - WXY901",
      tipoServicio: "Reparación",
      ubicacion: "Taller Central",
      id_ubicacion: 1,
      id_unidad: 1,
      estado: "Programado",
      observaciones: "Cambio de bomba de agua"
    },
    {
      id: 18,
      fecha: "2024-10-18",
      hora: "12:30",
      cliente: "Liliana Romero",
      vehiculo: "Mazda 2 - ZAB234",
      tipoServicio: "Consulta",
      ubicacion: "Sucursal Norte",
      id_ubicacion: 2,
      id_unidad: 2,
      estado: "Programado",
      observaciones: "Consulta sobre consumo elevado de combustible"
    },
    {
      id: 19,
      fecha: "2024-10-22",
      hora: "08:50",
      cliente: "Esteban Guerrero",
      vehiculo: "Seat Ibiza - CDE567",
      tipoServicio: "Diagnóstico",
      ubicacion: "Centro Diagnóstico Este",
      id_ubicacion: 4,
      id_unidad: 4,
      estado: "Programado",
      observaciones: "Scanner completo por luz de check engine"
    },
    {
      id: 20,
      fecha: "2024-10-25",
      hora: "16:40",
      cliente: "Natalia Vega",
      vehiculo: "Dacia Logan - FGH890",
      tipoServicio: "Mantenimiento",
      ubicacion: "Estación Sur",
      id_ubicacion: 3,
      id_unidad: 3,
      estado: "Programado",
      observaciones: "Service 15.000 km con cambio de correa de distribución"
    },
    {
      id: 21,
      fecha: "2024-10-28",
      hora: "11:10",
      cliente: "Rodrigo Cabrera",
      vehiculo: "Jeep Renegade - IJK123",
      tipoServicio: "Reparación",
      ubicacion: "Taller Express Oeste",
      id_ubicacion: 5,
      id_unidad: 5,
      estado: "Programado",
      observaciones: "Cambio de amortiguadores traseros"
    },
    {
      id: 22,
      fecha: "2024-10-30",
      hora: "14:00",
      cliente: "Mónica Paredes",
      vehiculo: "Opel Corsa - LMN456",
      tipoServicio: "Inspección",
      ubicacion: "Taller Central",
      id_ubicacion: 1,
      id_unidad: 1,
      estado: "Programado",
      observaciones: "Inspección pre-venta del vehículo"
    },
    {
      id: 23,
      fecha: "2024-10-31",
      hora: "10:30",
      cliente: "Sebastián Moreno",
      vehiculo: "Audi A3 - OPQ789",
      tipoServicio: "Mantenimiento",
      ubicacion: "Sucursal Norte",
      id_ubicacion: 2,
      id_unidad: 2,
      estado: "Cancelado",
      observaciones: "Cliente canceló - Reprogramar para noviembre"
    },
    {
      id: 24,
      fecha: "2024-10-31",
      hora: "15:20",
      cliente: "Carolina López",
      vehiculo: "BMW Serie 1 - RST012",
      tipoServicio: "Diagnóstico",
      ubicacion: "Centro Diagnóstico Este",
      id_ubicacion: 4,
      id_unidad: 4,
      estado: "Programado",
      observaciones: "Diagnóstico de sistema de navegación"
    }
  ]
};

export const mockAgendas = {
  pagina: 1,
  paginas: 1,
  total: 6,
  resultados: [
    {
      id: 1,
      vigencia_desde: "2024-10-01",
      vigencia_hasta: "2024-12-31",
      ubicacion: {
        id: 1,
        nombre: "Taller Central"
      },
      detalles: [
        {
          id: 1,
          dia_semana: 0, // lunes
          hora_inicio: "08:00",
          hora_fin: "12:00",
          cupo_por_franja: 10,
          intervalo_minutos: 30
        },
        {
          id: 2,
          dia_semana: 0, // lunes
          hora_inicio: "13:00",
          hora_fin: "18:00",
          cupo_por_franja: 10,
          intervalo_minutos: 30
        },
        {
          id: 3,
          dia_semana: 1, // martes
          hora_inicio: "08:00",
          hora_fin: "16:00",
          cupo_por_franja: 8,
          intervalo_minutos: 30
        },
        {
          id: 4,
          dia_semana: 2, // miércoles
          hora_inicio: "09:00",
          hora_fin: "17:00",
          cupo_por_franja: 12,
          intervalo_minutos: 45
        }
      ]
    },
    {
      id: 2,
      vigencia_desde: "2024-10-15",
      vigencia_hasta: "2024-11-30",
      ubicacion: {
        id: 2,
        nombre: "Sucursal Norte"
      },
      detalles: [
        {
          id: 5,
          dia_semana: 0, // lunes
          hora_inicio: "09:00",
          hora_fin: "13:00",
          cupo_por_franja: 8,
          intervalo_minutos: 60
        },
        {
          id: 6,
          dia_semana: 0, // lunes
          hora_inicio: "14:00",
          hora_fin: "17:00",
          cupo_por_franja: 7,
          intervalo_minutos: 60
        },
        {
          id: 7,
          dia_semana: 3, // jueves
          hora_inicio: "09:00",
          hora_fin: "17:00",
          cupo_por_franja: 15,
          intervalo_minutos: 45
        }
      ]
    },
    {
      id: 3,
      vigencia_desde: "2024-11-01",
      vigencia_hasta: "2025-01-31",
      ubicacion: {
        id: 4,
        nombre: "Centro Diagnóstico Este"
      },
      detalles: [
        {
          id: 8,
          dia_semana: 1, // martes
          hora_inicio: "07:00",
          hora_fin: "12:00",
          cupo_por_franja: 6,
          intervalo_minutos: 45
        },
        {
          id: 9,
          dia_semana: 1, // martes
          hora_inicio: "13:00",
          hora_fin: "19:00",
          cupo_por_franja: 6,
          intervalo_minutos: 45
        },
        {
          id: 10,
          dia_semana: 4, // viernes
          hora_inicio: "07:00",
          hora_fin: "15:00",
          cupo_por_franja: 8,
          intervalo_minutos: 60
        }
      ]
    },
    {
      id: 4,
      vigencia_desde: "2024-09-01",
      vigencia_hasta: "2024-10-30",
      ubicacion: {
        id: 3,
        nombre: "Estación Sur"
      },
      detalles: [
        {
          id: 11,
          dia_semana: 2, // miércoles
          hora_inicio: "08:30",
          hora_fin: "13:00",
          cupo_por_franja: 5,
          intervalo_minutos: 40
        },
        {
          id: 12,
          dia_semana: 2, // miércoles
          hora_inicio: "14:00",
          hora_fin: "17:30",
          cupo_por_franja: 5,
          intervalo_minutos: 40
        },
        {
          id: 13,
          dia_semana: 4, // viernes
          hora_inicio: "08:00",
          hora_fin: "16:00",
          cupo_por_franja: 12,
          intervalo_minutos: 30
        }
      ]
    },
    {
      id: 5,
      vigencia_desde: "2024-12-01",
      vigencia_hasta: null,
      ubicacion: {
        id: 5,
        nombre: "Taller Express Oeste"
      },
      detalles: [
        {
          id: 14,
          dia_semana: 2, // miércoles
          hora_inicio: "10:00",
          hora_fin: "14:00",
          cupo_por_franja: 12,
          intervalo_minutos: 20
        },
        {
          id: 15,
          dia_semana: 2, // miércoles
          hora_inicio: "15:00",
          hora_fin: "20:00",
          cupo_por_franja: 13,
          intervalo_minutos: 20
        },
        {
          id: 16,
          dia_semana: 5, // sábado
          hora_inicio: "09:00",
          hora_fin: "13:00",
          cupo_por_franja: 8,
          intervalo_minutos: 30
        }
      ]
    },
    {
      id: 6,
      vigencia_desde: "2024-08-01",
      vigencia_hasta: "2024-09-30", 
      ubicacion: {
        id: 1,
        nombre: "Taller Central"
      },
      detalles: [
        {
          id: 17,
          dia_semana: 6, // domingo
          hora_inicio: "10:00",
          hora_fin: "14:00",
          cupo_por_franja: 4,
          intervalo_minutos: 60
        }
      ]
    }
  ]
};

export const mockEstadosTurnos = {
  pagina: 1,
  paginas: 1,
  total: 5,
  resultados: [
    { id: 1, nombre: "Programado", color: "#007bff" },
    { id: 2, nombre: "En proceso", color: "#ffc107" },
    { id: 3, nombre: "Completado", color: "#28a745" },
    { id: 4, nombre: "Cancelado", color: "#dc3545" },
    { id: 5, nombre: "No presentado", color: "#6c757d" }
  ]
};

// Usuario mockeado para autenticación
export const mockAuthUser = {
  id: 1,
  nombre: "Usuario Demo",
  apellido: "Sistema",
  email: "demo@sistema.com",
  rol: "Administrador",
  token: "mock-jwt-token-demo-123456789",
  permisos: ["read", "write", "delete", "admin"]
};

// Configuración mockeada
export const mockConfig = {
  empresa: {
    nombre: "Sistema de Turnos Demo",
    direccion: "Av. Demo 123, Ciudad Demo",
    telefono: "+54 11 1234-5678",
    email: "info@demo.com"
  },
  horarios: {
    inicioSemana: "08:00",
    finSemana: "18:00",
    inicioSabado: "09:00",
    finSabado: "13:00",
    trabajaDomingo: false
  }
};