# Sistema de Turnos - Versión DEMO

Esta es una versión **DEMO** del sistema de turnos que funciona completamente **OFFLINE** sin necesidad de APIs externas ni autenticación real.

## 🚀 Características de la versión DEMO

- ✅ **Sin APIs**: Todos los datos son simulados localmente
- ✅ **Sin autenticación**: Login automático con usuario demo
- ✅ **Sin Firebase**: Removidas todas las dependencias de Firebase
- ✅ **Sin Google Maps**: No requiere API keys externas
- ✅ **Datos de prueba**: Incluye datos de ejemplo para todas las funcionalidades
- ✅ **Flujo completo**: Permite probar todas las funciones del sistema

## 🏃‍♂️ Inicio rápido

1. **Instalar dependencias:**
```bash
npm install --legacy-peer-deps
```

2. **Iniciar el servidor de desarrollo:**
```bash
npm start
```

3. **Acceder a la aplicación:**
   - URL: http://localhost:3000
   - **Login automático**: No necesitas credenciales, cualquier email/password funcionará
   - Usuario demo: `demo@sistema.com` / cualquier contraseña

## 📊 Datos incluidos en la DEMO

La aplicación incluye datos de ejemplo para:

- **Usuarios** (3 usuarios de prueba)
- **Tipos de Vehículos** (4 tipos diferentes)
- **Tipos de Servicios** (4 servicios disponibles)
- **Tipos de Turnos** (3 tipos de turnos)
- **Motivos de Turnos** (4 motivos diferentes)
- **Ubicaciones** (3 ubicaciones con coordenadas)
- **Turnos** (4 turnos de ejemplo con diferentes estados)
- **Agendas** (3 configuraciones de agenda)
- **Estados de Turnos** (5 estados diferentes)

## 🔧 Funcionalidades disponibles

### ✅ Completamente funcionales:
- Login/Logout (simulado)
- Gestión de usuarios
- Configuración de tipos de vehículos
- Configuración de tipos de servicios
- Configuración de tipos de turnos
- Gestión de ubicaciones
- Visualización de turnos
- Cambio de estados de turnos
- Configuración de agendas

### ⚠️ Limitadas (sin APIs externas):
- Mapas (sin Google Maps)
- Notificaciones push (sin Firebase)
- Recuperación de contraseñas (simulada)

## 🏗️ Arquitectura DEMO

### Servicios Mockeados (`src/mocks/`)
- `mockData.js`: Todos los datos de ejemplo
- `mockServices.js`: Servicios CRUD simulados

### Autenticación Simplificada
- Usuario siempre autenticado
- Token mockeado
- Sin validaciones de backend

### APIs Comentadas
- Todas las llamadas de API originales están comentadas
- Fácil restauración al código original
- Servicios mockeados mantienen la misma interfaz

## 🔄 Restaurar funcionalidad original

Para volver a la funcionalidad completa con APIs:

1. Descomentar las importaciones de servicios reales
2. Comentar las importaciones de mocks
3. Configurar variables de entorno necesarias
4. Restaurar dependencias de Firebase y Google Maps

## 📝 Notas importantes

- Esta versión es **solo para demostración**
- Los datos se pierden al recargar la página
- No hay persistencia real de datos
- Simula delays de red para realismo
- Incluye mensajes de éxito/error simulados

## 🆚 Diferencias con la versión original

| Característica | Original | Demo |
|----------------|----------|------|
| Autenticación | API Backend | Simulada |
| Datos | Base de datos | En memoria |
| Firebase | Requerido | Removido |
| Google Maps | API Key requerida | Deshabilitado |
| Variables de entorno | Obligatorias | Opcionales |
| Persistencia | Real | Simulada |

---

**¿Necesitas la versión completa?** Consulta el README.md original para instrucciones de configuración con APIs reales.