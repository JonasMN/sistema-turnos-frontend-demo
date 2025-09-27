import { useState, useCallback } from 'react';
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
  mockEstadosTurnos
} from '../mocks/mockData.js';

// Estado global simulado (en aplicación real usarías Context o Redux)
const globalMockState = {
  usuarios: { ...mockUsers, resultados: [...mockUsers.resultados] },
  tiposVehiculos: { ...mockTiposVehiculos, resultados: [...mockTiposVehiculos.resultados] },
  tiposServicios: { ...mockTiposServicios, resultados: [...mockTiposServicios.resultados] },
  tiposTurnos: { ...mockTiposTurnos, resultados: [...mockTiposTurnos.resultados] },
  motivosTurnos: { ...mockMotivosTurnos, resultados: [...mockMotivosTurnos.resultados] },
  tipoUbicaciones: { ...mockTipoUbicaciones, resultados: [...mockTipoUbicaciones.resultados] },
  unidades: { ...mockUnidades, resultados: [...mockUnidades.resultados] },
  ubicaciones: { ...mockUbicaciones, resultados: [...mockUbicaciones.resultados] },
  turnos: { ...mockTurnos, resultados: [...mockTurnos.resultados] },
  agendas: { ...mockAgendas, resultados: [...mockAgendas.resultados] },
  estadosTurnos: { ...mockEstadosTurnos, resultados: [...mockEstadosTurnos.resultados] }
};

// Simular delay de red (reducido para demo)
const simulateDelay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

// Hook principal para manejar datos mock
export const useMockData = (entityName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los datos
  const getAll = useCallback(async () => {
    console.log(`[useMockData] getAll called for ${entityName}`);
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      const entityData = globalMockState[entityName] || { pagina: 1, paginas: 1, total: 0, resultados: [] };
      console.log(`[useMockData] Data for ${entityName}:`, entityData);
      setData(entityData);
      return entityData;
    } catch (err) {
      console.error(`[useMockData] Error in getAll for ${entityName}:`, err);
      setError(err.message);
      return { pagina: 1, paginas: 1, total: 0, resultados: [] };
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  // Crear nuevo elemento
  const create = useCallback(async (newItem) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      
      if (!globalMockState[entityName]) {
        throw new Error(`Entity ${entityName} not found`);
      }

      // Generar ID único
      const maxId = Math.max(...globalMockState[entityName].resultados.map(item => item.id || 0), 0);
      const itemWithId = { ...newItem, id: maxId + 1 };
      
      // Agregar al estado global
      globalMockState[entityName].resultados.push(itemWithId);
      globalMockState[entityName].total = globalMockState[entityName].resultados.length;
      
      // Actualizar estado local
      setData({ ...globalMockState[entityName] });
      
      return itemWithId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  // Actualizar elemento existente
  const update = useCallback(async (id, updatedItem) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      
      if (!globalMockState[entityName]) {
        throw new Error(`Entity ${entityName} not found`);
      }

      const index = globalMockState[entityName].resultados.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`Item with id ${id} not found`);
      }

      // Actualizar en estado global
      globalMockState[entityName].resultados[index] = { 
        ...globalMockState[entityName].resultados[index], 
        ...updatedItem, 
        id 
      };
      
      // Actualizar estado local
      setData({ ...globalMockState[entityName] });
      
      return globalMockState[entityName].resultados[index];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  // Eliminar elemento
  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      
      if (!globalMockState[entityName]) {
        throw new Error(`Entity ${entityName} not found`);
      }

      const index = globalMockState[entityName].resultados.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`Item with id ${id} not found`);
      }

      // Remover del estado global
      const deletedItem = globalMockState[entityName].resultados.splice(index, 1)[0];
      globalMockState[entityName].total = globalMockState[entityName].resultados.length;
      
      // Actualizar estado local
      setData({ ...globalMockState[entityName] });
      
      return deletedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  // Obtener elemento por ID
  const getById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      
      if (!globalMockState[entityName]) {
        throw new Error(`Entity ${entityName} not found`);
      }

      const item = globalMockState[entityName].resultados.find(item => item.id === id);
      if (!item) {
        throw new Error(`Item with id ${id} not found`);
      }

      return item;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  // Cambiar estado activo/inactivo
  const toggleActive = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await simulateDelay();
      
      if (!globalMockState[entityName]) {
        throw new Error(`Entity ${entityName} not found`);
      }

      const index = globalMockState[entityName].resultados.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`Item with id ${id} not found`);
      }

      // Toggle activo
      globalMockState[entityName].resultados[index].activo = !globalMockState[entityName].resultados[index].activo;
      
      // Actualizar estado local
      setData({ ...globalMockState[entityName] });
      
      return globalMockState[entityName].resultados[index];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [entityName]);

  return {
    data,
    loading,
    error,
    getAll,
    create,
    update,
    remove,
    getById,
    toggleActive,
    // Alias comunes
    delete: remove,
    put: update,
    post: create,
    get: getAll
  };
};

// Hooks específicos para cada entidad (para facilitar el uso)
export const useUsuarios = () => useMockData('usuarios');
export const useTiposVehiculos = () => useMockData('tiposVehiculos');
export const useTiposServicios = () => useMockData('tiposServicios');
export const useTiposTurnos = () => useMockData('tiposTurnos');
export const useMotivosTurnos = () => useMockData('motivosTurnos');
export const useTipoUbicaciones = () => useMockData('tipoUbicaciones');
export const useUnidades = () => useMockData('unidades');
export const useUbicaciones = () => useMockData('ubicaciones');
export const useTurnos = () => useMockData('turnos');
export const useAgendas = () => useMockData('agendas');
export const useEstadosTurnos = () => useMockData('estadosTurnos');

// Función para resetear todos los datos a su estado inicial
export const resetAllMockData = () => {
  globalMockState.usuarios = { ...mockUsers, resultados: [...mockUsers.resultados] };
  globalMockState.tiposVehiculos = { ...mockTiposVehiculos, resultados: [...mockTiposVehiculos.resultados] };
  globalMockState.tiposServicios = { ...mockTiposServicios, resultados: [...mockTiposServicios.resultados] };
  globalMockState.tiposTurnos = { ...mockTiposTurnos, resultados: [...mockTiposTurnos.resultados] };
  globalMockState.motivosTurnos = { ...mockMotivosTurnos, resultados: [...mockMotivosTurnos.resultados] };
  globalMockState.tipoUbicaciones = { ...mockTipoUbicaciones, resultados: [...mockTipoUbicaciones.resultados] };
  globalMockState.unidades = { ...mockUnidades, resultados: [...mockUnidades.resultados] };
  globalMockState.ubicaciones = { ...mockUbicaciones, resultados: [...mockUbicaciones.resultados] };
  globalMockState.turnos = { ...mockTurnos, resultados: [...mockTurnos.resultados] };
  globalMockState.agendas = { ...mockAgendas, resultados: [...mockAgendas.resultados] };
  globalMockState.estadosTurnos = { ...mockEstadosTurnos, resultados: [...mockEstadosTurnos.resultados] };
};

export default useMockData;