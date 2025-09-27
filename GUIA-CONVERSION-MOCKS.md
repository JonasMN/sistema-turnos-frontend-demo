# 🔧 Guía: Cómo convertir vistas al sistema de mocks

## ✅ **¡Ya está hecho!** - Vista de ejemplo
- ✅ `TiposVehiculos.jsx` - Ya convertida y funcionando

## 🚀 **Pasos para convertir cualquier vista**

### 1. Cambiar las importaciones
**Antes:**
```javascript
import getTipoServicios from "../../../../services/tipoServicios/getTipoServicios.js";
import postTipoServicios from "../../../../services/tipoServicios/postTipoServicios.js";
import putTipoServicios from "../../../../services/tipoServicios/putTipoServicios.js";
import deleteTipoServicios from "../../../../services/tipoServicios/deleteTipoServicios.js";
```

**Después:**
```javascript
// COMENTADO PARA MODO DEMO
// import getTipoServicios from "../../../../services/tipoServicios/getTipoServicios.js";
// import postTipoServicios from "../../../../services/tipoServicios/postTipoServiios.js";
// import putTipoServicios from "../../../../services/tipoServicios/putTipoServicios.js";
// import deleteTipoServicios from "../../../../services/tipoServicios/deleteTipoServicios.js";
import { useTiposServicios } from "../../../../hooks/useMockData.js";
```

### 2. Reemplazar estado y funciones
**Antes:**
```javascript
const [tiposServicios, setTiposServicios] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const getAndSet = async () => {
  try {
    setIsLoading(true);
    const { data } = await getTipoServicios();
    setTiposServicios(data);
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};
```

**Después:**
```javascript
const { 
  data: tiposServicios, 
  loading: isLoading, 
  error,
  getAll,
  create,
  update,
  remove 
} = useTiposServicios();

useEffect(() => {
  getAll();
}, [getAll]);
```

### 3. Simplificar operaciones CRUD
**Crear - Antes:**
```javascript
const response = await postTipoServicios([{ ...datos }]);
if (response.error) {
  toast.error(response.error);
  return;
}
toast.success("Creado exitosamente");
getAndSet();
```

**Crear - Después:**
```javascript
try {
  await create(datos);
  toast.success("Creado exitosamente");
} catch (err) {
  toast.error("Error: " + err.message);
}
```

**Actualizar - Antes:**
```javascript
const response = await putTipoServicios(datos, id);
if (response.error) {
  toast.error(response.error);
  return;
}
toast.success("Actualizado exitosamente");
getAndSet();
```

**Actualizar - Después:**
```javascript
try {
  await update(id, datos);
  toast.success("Actualizado exitosamente");
} catch (err) {
  toast.error("Error: " + err.message);
}
```

**Eliminar - Antes:**
```javascript
const response = await deleteTipoServicios(id);
if (response.error) {
  toast.error(response.error);
  return;
}
toast.success("Eliminado exitosamente");
getAndSet();
```

**Eliminar - Después:**
```javascript
try {
  await remove(id);
  toast.success("Eliminado exitosamente");
} catch (err) {
  toast.error("Error: " + err.message);
}
```

## 📋 **Hooks disponibles para cada vista**

```javascript
// Usuarios
import { useUsuarios } from "../../../../hooks/useMockData.js";

// Tipos de Vehículos (✅ YA HECHO)
import { useTiposVehiculos } from "../../../../hooks/useMockData.js";

// Tipos de Servicios
import { useTiposServicios } from "../../../../hooks/useMockData.js";

// Tipos de Turnos
import { useTiposTurnos } from "../../../../hooks/useMockData.js";

// Motivos de Turnos
import { useMotivosTurnos } from "../../../../hooks/useMockData.js";

// Tipos de Ubicaciones
import { useTipoUbicaciones } from "../../../../hooks/useMockData.js";

// Unidades
import { useUnidades } from "../../../../hooks/useMockData.js";

// Ubicaciones
import { useUbicaciones } from "../../../../hooks/useMockData.js";

// Turnos
import { useTurnos } from "../../../../hooks/useMockData.js";

// Agendas
import { useAgendas } from "../../../../hooks/useMockData.js";
```

## 🎯 **Vistas que debes convertir**

### 📁 Configuraciones
- [ ] `TiposServicios.jsx`
- [ ] `TiposTurnos.jsx`
- [ ] `MotivosTurnos.jsx`

### 📁 Locaciones  
- [ ] `TipoUbicaciones.jsx`
- [ ] `Unidades.jsx`
- [ ] `Ubicaciones.jsx`

### 📁 Usuarios
- [ ] `ListadoUsuarios.jsx`

### 📁 Turnos
- [ ] `ListadoTurnos.jsx`

### 📁 Agenda
- [ ] `AgendasProgramadas.jsx`

## ⚡ **Ventajas del nuevo sistema**

1. **Sin errores de conexión**: No más `ERR_CONNECTION_REFUSED`
2. **Código más simple**: Menos líneas, menos complejidad
3. **Funcionalidad completa**: Crear, editar, eliminar funcionan perfectamente
4. **Datos realistas**: 6 elementos de prueba por cada entidad
5. **Estado persistente**: Los cambios se mantienen durante la sesión
6. **Fácil de debuggear**: Todo en memoria, visible en DevTools

## 🔄 **Para resetear datos**
```javascript
// Recargar la página resetea todos los datos
window.location.reload();

// O usar la función programática
import { resetAllMockData } from "../../../../hooks/useMockData.js";
resetAllMockData();
```

---

**¡Sigue este patrón y tendrás todas las vistas funcionando perfectamente en modo demo!** 🎉