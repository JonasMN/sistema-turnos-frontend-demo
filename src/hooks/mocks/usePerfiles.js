import { useState, useCallback } from 'react';
import { mockPerfiles } from '../../mocks/mockData';

/**
 * Hook mock para manejar perfiles de usuario
 * Proporciona operaciones para obtener perfiles disponibles
 */
export const usePerfiles = () => {
  const [perfiles, setPerfiles] = useState(mockPerfiles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular delay de red
  const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

  // Obtener todos los perfiles
  const getAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      return { data: perfiles };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [perfiles]);

  // Obtener perfil por ID
  const getById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      
      const perfil = perfiles.resultados.find(p => p.id === id || p.idPerfil === id);
      if (!perfil) {
        throw new Error('Perfil no encontrado');
      }
      
      return { data: perfil };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [perfiles]);

  return {
    perfiles: perfiles.resultados,
    perfilesData: perfiles,
    isLoading,
    error,
    getAll,
    getById
  };
};