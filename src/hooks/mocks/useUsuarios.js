import { useState, useCallback } from 'react';
import { mockUsers, mockPerfiles } from '../../mocks/mockData';

/**
 * Hook mock para manejar usuarios
 * Proporciona operaciones CRUD para usuarios en modo demo
 */
export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState(mockUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular delay de red
  const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Helper para obtener nombre de perfil por ID
  const obtenerNombrePerfil = (perfilId) => {
    const perfil = mockPerfiles.resultados.find(p => p.idPerfil === perfilId);
    return perfil ? perfil.nombre : `Perfil ${perfilId}`;
  };

  // Obtener todos los usuarios
  const getAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      return { data: usuarios };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [usuarios]);

  // Obtener usuario por ID
  const getById = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      
      const usuario = usuarios.resultados.find(u => u.id === id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      
      return { data: usuario };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [usuarios]);

  // Crear nuevo usuario
  const create = useCallback(async (datosUsuario) => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      
      const nuevoId = Math.max(...usuarios.resultados.map(u => u.id), 0) + 1;
      
      // Transformar perfiles de array de IDs a array de objetos
      const perfilesFormateados = Array.isArray(datosUsuario.perfil) 
        ? datosUsuario.perfil.map(perfilId => ({
            id: perfilId,
            idPerfil: perfilId,
            nombre: obtenerNombrePerfil(perfilId)
          }))
        : [];
      
      const nuevoUsuario = {
        id: nuevoId,
        name: datosUsuario.name,
        surname: datosUsuario.surname,
        email: datosUsuario.email,
        activo: true,
        perfiles: perfilesFormateados,
        fechaCreacion: new Date().toISOString()
      };
      
      const nuevosUsuarios = {
        ...usuarios,
        resultados: [...usuarios.resultados, nuevoUsuario],
        total: usuarios.total + 1
      };
      
      setUsuarios(nuevosUsuarios);
      return { 
        data: { 
          statusCode: 201, 
          message: 'Usuario creado exitosamente',
          usuario: nuevoUsuario
        } 
      };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [usuarios]);

  // Actualizar usuario
  const update = useCallback(async (id, datosActualizados) => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      
      const index = usuarios.resultados.findIndex(u => u.id === id);
      if (index === -1) {
        throw new Error('Usuario no encontrado');
      }
      
      // Transformar perfiles si vienen en los datos actualizados
      const perfilesFormateados = datosActualizados.perfil && Array.isArray(datosActualizados.perfil)
        ? datosActualizados.perfil.map(perfilId => ({
            id: perfilId,
            idPerfil: perfilId,
            nombre: obtenerNombrePerfil(perfilId)
          }))
        : usuarios.resultados[index].perfiles;
      
      const usuarioActualizado = {
        ...usuarios.resultados[index],
        name: datosActualizados.name || usuarios.resultados[index].name,
        surname: datosActualizados.surname || usuarios.resultados[index].surname,
        email: datosActualizados.email || usuarios.resultados[index].email,
        perfiles: perfilesFormateados,
        fechaModificacion: new Date().toISOString()
      };
      
      const nuevosUsuarios = {
        ...usuarios,
        resultados: usuarios.resultados.map(u => 
          u.id === id ? usuarioActualizado : u
        )
      };
      
      setUsuarios(nuevosUsuarios);
      return { 
        data: { 
          message: 'Usuario actualizado exitosamente',
          usuario: usuarioActualizado
        } 
      };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [usuarios]);

  // Eliminar usuario
  const remove = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      
      const usuarioExiste = usuarios.resultados.some(u => u.id === id);
      if (!usuarioExiste) {
        throw new Error('Usuario no encontrado');
      }
      
      const nuevosUsuarios = {
        ...usuarios,
        resultados: usuarios.resultados.filter(u => u.id !== id),
        total: usuarios.total - 1
      };
      
      setUsuarios(nuevosUsuarios);
      return { 
        data: { 
          message: 'Usuario eliminado exitosamente' 
        } 
      };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [usuarios]);

  // Blanquear contraseña
  const blanquearPassword = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await delay();
      
      const usuario = usuarios.resultados.find(u => u.id === id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      
      return { 
        data: { 
          mensaje: 'Contraseña blanqueada exitosamente. El usuario recibirá un email con las instrucciones.',
          estado: 1
        } 
      };
    } catch (err) {
      setError(err.message);
      return { error: err.message, data: { estado: 0 } };
    } finally {
      setIsLoading(false);
    }
  }, [usuarios]);

  return {
    usuarios: usuarios.resultados,
    usuariosData: usuarios,
    isLoading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
    blanquearPassword
  };
};