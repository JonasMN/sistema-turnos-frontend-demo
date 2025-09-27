// =====================================
// HELPER PARA CREAR SERVICIOS MOCK RÁPIDAMENTE
// =====================================

import * as mockServices from './mockServices.js';

// Mapeo de nombres de servicios a servicios mockeados
const serviceMap = {
  // Usuarios
  'getUsuarios': mockServices.mockUsuariosService.getAll,
  'postUsuarios': mockServices.mockUsuariosService.create,
  'putUsuarios': mockServices.mockUsuariosService.update,
  'deleteUsuarios': mockServices.mockUsuariosService.delete,
  
  // Tipos de Vehículos
  'getTipoVehiculos': mockServices.mockTiposVehiculosService.getAll,
  'postTipoVehiculos': mockServices.mockTiposVehiculosService.create,
  'putTipoVehiculos': mockServices.mockTiposVehiculosService.update,
  'deleteTipoVehiculos': mockServices.mockTiposVehiculosService.delete,
  
  // Tipos de Servicios
  'getTipoServicios': mockServices.mockTiposServiciosService.getAll,
  'postTipoServicios': mockServices.mockTiposServiciosService.create,
  'putTipoServicios': mockServices.mockTiposServiciosService.update,
  'deleteTipoServicios': mockServices.mockTiposServiciosService.delete,
  
  // Tipos de Turnos
  'getTipoTurnos': mockServices.mockTiposTurnosService.getAll,
  'postTipoTurnos': mockServices.mockTiposTurnosService.create,
  'putTipoTurnos': mockServices.mockTiposTurnosService.update,
  'deleteTipoTurnos': mockServices.mockTiposTurnosService.delete,
  
  // Motivos de Turnos
  'getMotivoTurnos': mockServices.mockMotivosTurnosService.getAll,
  'postMotivoTurnos': mockServices.mockMotivosTurnosService.create,
  'putMotivoTurnos': mockServices.mockMotivosTurnosService.update,
  'deleteMotivoTurnos': mockServices.mockMotivosTurnosService.delete,
  
  // Tipos de Ubicaciones
  'getTipoUbicaciones': mockServices.mockTipoUbicacionesService.getAll,
  'postTipoUbicaciones': mockServices.mockTipoUbicacionesService.create,
  'putTipoUbicaciones': mockServices.mockTipoUbicacionesService.update,
  'deleteTipoUbicaciones': mockServices.mockTipoUbicacionesService.delete,
  
  // Unidades
  'getUnidades': mockServices.mockUnidadesService.getAll,
  'getUnidadesPorEmpresa': mockServices.mockUnidadesPorEmpresaService.getAll,
  'postUnidades': mockServices.mockUnidadesService.create,
  'putUnidades': mockServices.mockUnidadesService.update,
  'deleteUnidades': mockServices.mockUnidadesService.delete,
  
  // Ubicaciones
  'getUbicaciones': mockServices.mockUbicacionesService.getAll,
  'getUbicacionesPorEmpresa': mockServices.mockUbicacionesPorEmpresaService.getAll,
  'getUbicacionesPorUnidad': mockServices.mockUbicacionesPorUnidadService.getAll,
  'postUbicaciones': mockServices.mockUbicacionesService.create,
  'putUbicaciones': mockServices.mockUbicacionesService.update,
  'deleteUbicaciones': mockServices.mockUbicacionesService.delete,
  
  // Turnos
  'getTurnos': mockServices.mockTurnosService.getAll,
  'getEstadosTurnos': mockServices.mockEstadosTurnosService.getAll,
  'postTurnos': mockServices.mockTurnosService.create,
  'putTurnos': mockServices.mockTurnosService.update,
  'putEstadoTurno': mockServices.mockTurnosEstadoService.updateEstado,
  'postCancelarTurno': mockServices.mockTurnosEstadoService.cancelarTurno,
  
  // Agendas
  'getAgendas': mockServices.mockAgendasService.getAll,
  'getConfiguracionAgenda': mockServices.mockAgendasService.getAll,
  'postAgenda': mockServices.mockAgendasService.create,
  'postAgendaDetalle': mockServices.mockAgendasService.create,
  'putAgenda': mockServices.mockAgendasService.update,
  'deleteAgenda': mockServices.mockAgendasService.delete,
  'deleteAgendaDetalle': mockServices.mockAgendasService.delete,
  
  // Autenticación
  'login': mockServices.mockLoginService,
  'logout': mockServices.mockLogoutService,
  'validateToken': mockServices.mockValidateTokenService,
  'olvidePassword': mockServices.mockResetPasswordService.olvidePassword,
  'blanqueoPassword': mockServices.mockResetPasswordService.blanqueoPassword
};

// Función helper para crear un servicio mock genérico
export const createMockService = (serviceName) => {
  return async (...args) => {
    const mockFunction = serviceMap[serviceName];
    if (mockFunction) {
      return await mockFunction(...args);
    } else {
      console.warn(`Mock service not found for: ${serviceName}`);
      return {
        data: {
          success: false,
          message: `Mock service not implemented: ${serviceName}`,
          data: null
        }
      };
    }
  };
};

// Función para obtener un servicio mock específico
export const getMockService = (serviceName) => {
  return serviceMap[serviceName] || (() => {
    console.warn(`Mock service not found: ${serviceName}`);
    return Promise.resolve({
      data: {
        success: false,
        message: `Service not found: ${serviceName}`,
        data: []
      }
    });
  });
};

export default { createMockService, getMockService };