// =====================================
// SERVICIOS MOCKEADOS PARA MODO DEMO
// =====================================

import {
  mockUsers,
  mockTiposVehiculos,
  mockTiposServicios,
  mockTiposTurnos,
  mockMotivosTurnos,
  mockTipoUbicaciones,
  mockUnidades,
  mockUbicaciones,
  mockTurnos,
  mockAgendas,
  mockEstadosTurnos,
  mockAuthUser
} from './mockData.js';

// Simular delay de red
const simulateNetworkDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Estructura de respuesta estándar
const createResponse = (data, success = true, message = "") => ({
  data: {
    success,
    message,
    data
  }
});

// =====================================
// SERVICIOS DE AUTENTICACIÓN
// =====================================

export const mockLoginService = async ({ email, password }) => {
  await simulateNetworkDelay(1000);
  
  // En modo demo, cualquier email/password es válido
  return createResponse({
    userId: mockAuthUser.id,
    userFullName: `${mockAuthUser.nombre} ${mockAuthUser.apellido}`,
    token: mockAuthUser.token
  });
};

export const mockLogoutService = async (clientId) => {
  await simulateNetworkDelay(500);
  return createResponse({}, true, "Logout exitoso");
};

export const mockValidateTokenService = async ({ token }) => {
  await simulateNetworkDelay(300);
  
  if (token === mockAuthUser.token) {
    return createResponse({
      authenticated_user: {
        id: mockAuthUser.id,
        fullname: `${mockAuthUser.nombre} ${mockAuthUser.apellido}`
      }
    });
  } else {
    return createResponse(null, false, "Token inválido");
  }
};

// =====================================
// SERVICIOS GENÉRICOS CRUD
// =====================================

const createCRUDService = (dataArray, entityName) => {
  return {
    // GET - Obtener todos
    getAll: async () => {
      await simulateNetworkDelay();
      return createResponse(dataArray, true, `${entityName} obtenidos exitosamente`);
    },
    
    // GET - Obtener por ID
    getById: async (id) => {
      await simulateNetworkDelay();
      const item = dataArray.find(item => item.id === parseInt(id));
      if (item) {
        return createResponse(item, true, `${entityName} encontrado`);
      } else {
        return createResponse(null, false, `${entityName} no encontrado`);
      }
    },
    
    // POST - Crear nuevo
    create: async (newItem) => {
      await simulateNetworkDelay();
      const id = Math.max(...dataArray.map(item => item.id || 0)) + 1;
      const itemWithId = { ...newItem, id };
      dataArray.push(itemWithId);
      return createResponse(itemWithId, true, `${entityName} creado exitosamente`);
    },
    
    // PUT - Actualizar
    update: async (id, updatedItem) => {
      await simulateNetworkDelay();
      const index = dataArray.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        dataArray[index] = { ...dataArray[index], ...updatedItem, id: parseInt(id) };
        return createResponse(dataArray[index], true, `${entityName} actualizado exitosamente`);
      } else {
        return createResponse(null, false, `${entityName} no encontrado`);
      }
    },
    
    // DELETE - Eliminar
    delete: async (id) => {
      await simulateNetworkDelay();
      const index = dataArray.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        const deletedItem = dataArray.splice(index, 1)[0];
        return createResponse(deletedItem, true, `${entityName} eliminado exitosamente`);
      } else {
        return createResponse(null, false, `${entityName} no encontrado`);
      }
    }
  };
};

// =====================================
// SERVICIOS ESPECÍFICOS
// =====================================

export const mockUsuariosService = createCRUDService(mockUsers, "Usuario");
export const mockTiposVehiculosService = createCRUDService(mockTiposVehiculos, "Tipo de Vehículo");
export const mockTiposServiciosService = createCRUDService(mockTiposServicios, "Tipo de Servicio");
export const mockTiposTurnosService = createCRUDService(mockTiposTurnos, "Tipo de Turno");
export const mockMotivosTurnosService = createCRUDService(mockMotivosTurnos, "Motivo de Turno");
export const mockTipoUbicacionesService = createCRUDService(mockTipoUbicaciones, "Tipo de Ubicación");
export const mockUnidadesService = createCRUDService(mockUnidades, "Unidad");
export const mockUbicacionesService = createCRUDService(mockUbicaciones, "Ubicación");
export const mockTurnosService = createCRUDService(mockTurnos, "Turno");
export const mockAgendasService = createCRUDService(mockAgendas, "Agenda");

// =====================================
// SERVICIOS ESPECÍFICOS ADICIONALES
// =====================================

export const mockEstadosTurnosService = {
  getAll: async () => {
    await simulateNetworkDelay();
    return createResponse(mockEstadosTurnos, true, "Estados de turnos obtenidos");
  }
};

export const mockTurnosEstadoService = {
  updateEstado: async (turnoId, nuevoEstado) => {
    await simulateNetworkDelay();
    const turno = mockTurnos.find(t => t.id === parseInt(turnoId));
    if (turno) {
      turno.estado = nuevoEstado;
      return createResponse(turno, true, "Estado actualizado exitosamente");
    }
    return createResponse(null, false, "Turno no encontrado");
  },
  
  cancelarTurno: async (turnoId, motivo) => {
    await simulateNetworkDelay();
    const turno = mockTurnos.find(t => t.id === parseInt(turnoId));
    if (turno) {
      turno.estado = "Cancelado";
      turno.motivoCancelacion = motivo;
      return createResponse(turno, true, "Turno cancelado exitosamente");
    }
    return createResponse(null, false, "Turno no encontrado");
  }
};

// Servicios específicos para ubicaciones y unidades
export const mockUbicacionesPorEmpresaService = {
  getAll: async () => {
    await simulateNetworkDelay();
    return createResponse(mockUbicaciones, true, "Ubicaciones por empresa obtenidas");
  }
};

export const mockUbicacionesPorUnidadService = {
  getAll: async (unidadId) => {
    await simulateNetworkDelay();
    const ubicaciones = mockUbicaciones.filter(u => u.unidadId === parseInt(unidadId));
    return createResponse(ubicaciones, true, "Ubicaciones por unidad obtenidas");
  }
};

export const mockUnidadesPorEmpresaService = {
  getAll: async () => {
    await simulateNetworkDelay();
    return createResponse(mockUnidades, true, "Unidades por empresa obtenidas");
  }
};

// Servicio para resetear contraseña
export const mockResetPasswordService = {
  olvidePassword: async (email) => {
    await simulateNetworkDelay();
    return createResponse({}, true, "Email de recuperación enviado");
  },
  
  blanqueoPassword: async (userId, newPassword) => {
    await simulateNetworkDelay();
    return createResponse({}, true, "Contraseña restablecida exitosamente");
  }
};