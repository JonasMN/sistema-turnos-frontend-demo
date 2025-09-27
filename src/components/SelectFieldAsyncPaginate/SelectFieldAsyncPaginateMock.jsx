import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import styles from './SelectFieldAsync.module.scss';
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
} from '../../mocks/mockData.js';

const SelectFieldAsyncPaginateMock = ({
  multiple = false,
  label,
  value,
  onChange,
  name,
  style = {},
  isDisabled = false,
  required = false,
  endpoint,
  error = '',
  className = '',
  isClearable = false,
  additionalParams = {},
  optionValue = "id",
  optionLabel = "nombre",
  placeholder = "Seleccionar",
}) => {

  // Mapeo de endpoints a datos mock
  const getDataForEndpoint = (endpoint) => {
    // Normalizar endpoint eliminando parámetros para facilitar matching
    const baseEndpoint = endpoint.split('?')[0];
    
    switch (baseEndpoint) {
      case '/unidades':
        return mockUnidades.resultados;
      case '/ubicaciones':
        // Filtrar por unidad si se especifica
        const unidadParam = endpoint.includes('unidad=') ? 
          endpoint.split('unidad=')[1]?.split('&')[0] : null;
        if (unidadParam && unidadParam !== 'undefined') {
          return mockUbicaciones.resultados.filter(ub => ub.id_unidad == unidadParam);
        }
        return mockUbicaciones.resultados;
      case '/tipo_ubicacion':
        return mockTipoUbicaciones.resultados;
      case '/tipo_servicio':
        return mockTiposServicios.resultados;
      case '/tipo_vehiculo':
        return mockTiposVehiculos.resultados;
      case '/usuarios':
        return mockUsers.resultados;
      case '/tipo_turnos':
        return mockTiposTurnos.resultados;
      case '/motivos_turnos':
        return mockMotivosTurnos.resultados;
      case '/turnos':
        return mockTurnos.resultados;
      case '/agendas':
        return mockAgendas.resultados;
      case '/estados_turnos':
        return mockEstadosTurnos.resultados;
      default:
        console.warn(`Endpoint no mapeado: ${endpoint}`);
        return [];
    }
  };

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    try {
      const currentPage = page || 1;
      const limit = 5;
      const offset = (currentPage - 1) * limit;
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 300));

      // Obtener datos mock según el endpoint
      let allData = getDataForEndpoint(endpoint);
      
      // Filtrar por búsqueda si hay query
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        allData = allData.filter(item => 
          (item[optionLabel] && item[optionLabel].toLowerCase().includes(query)) ||
          (item.nombre && item.nombre.toLowerCase().includes(query)) ||
          (item.descripcion && item.descripcion.toLowerCase().includes(query))
        );
      }

      // Paginación
      const totalItems = allData.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = offset;
      const endIndex = Math.min(startIndex + limit, totalItems);
      const pageData = allData.slice(startIndex, endIndex);

      // Filtrar opciones ya cargadas para evitar duplicados
      const existingIds = new Set(loadedOptions.map(opt => opt[optionValue]));
      const opcionesFiltradas = pageData.filter(
        opt => !existingIds.has(opt[optionValue])
      );

      return {
        options: opcionesFiltradas.map(opt => ({
          value: opt.id,
          label: opt[optionLabel] || opt.nombre,
          ...opt,
        })),        
        hasMore: currentPage < totalPages && pageData.length >= limit,
        additional: { page: currentPage + 1 },
      };
      
    } catch (err) {
      console.error('Error in loadOptions:', err);
      return { options: [], hasMore: false, additional: { page } };
    }
  };
  
  const changeHandler = (option) => {
    if (typeof onChange === "function") {
      const event = {
        target: {
          name,
          value: multiple
            ? (option || []).map((opt) => opt) 
            : option || null,
        },
      };
      onChange(event);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "1px solid #ced4da", // Color del borde
      height: "auto", // Ajusta la altura
      borderColor: error ? 'var(--red)' : base.borderColor,
      boxShadow: state.isFocused
        ? error
          ? '0 0 0 2px rgba(221, 75, 57, 0.1)'
          : '0 0 0 2px rgba(243, 156, 18, 0.1)'
        : 'none',
      '&:hover': {
        borderColor: error ? 'var(--red)' : '#bbb',
      },
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      borderRadius: '6px',
      minHeight: '38px',
      backgroundColor: state.isDisabled ? "#e9ecef" : "white",
      pointerEvents: state.isDisabled ? "none" : "auto",  // Desactivar eventos si está deshabilitado
      opacity: state.isDisabled ? 0.6 : 1, // Reducir opacidad si está deshabilitado
      "&:hover": {
        borderColor: state.isDisabled ? "#ced4da" : "#80bdff", // No cambiar el borde si está deshabilitado
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999, // Asegura que el menú esté visible sobre otros elementos
    }),
    menuList: base => ({
      ...base,
      maxHeight: 150,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#e9ecef" : state.isFocused ? "#f8f9fa" : "white",
      color: state.isFocused ? "#000" : "#495057",
      color: state.isDisabled ? '#999' : "#495057",
      cursor: state.isDisabled ? 'not-allowed' : 'default',
      fontStyle: state.isDisabled ? 'italic' : 'normal',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "2px 8px", // Reduce el espacio interno
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "6px", // Ajusta el tamaño del indicador
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "6px", // Ajusta el tamaño del botón para limpiar
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--blue-light)", // Fondo de las etiquetas seleccionadas
      color: "var(--black-dark)", // Color del texto de las etiquetas seleccionadas
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--black-dark)", // Color del texto dentro de las etiquetas seleccionadas
      backgroundColor: "var(--blue-light)",
    }),
  };

  return (
    <>
      <div className={`${styles.selectField} ${className}`}>
        {label && (
          <label className={`form-label ${styles.label}`} htmlFor={name}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <AsyncPaginate
          isDisabled={isDisabled}
          className="w-4/5"
          value={value || ""}
          loadOptions={loadOptions}
          getOptionValue={(option) => option[optionValue]}
          getOptionLabel={(option) => option[optionLabel]}
          onChange={changeHandler}
          isMulti={multiple}
          debounceTimeout={500}
          isSearchable={true}
          placeholder={placeholder}
          noOptionsMessage={() => "No hay opciones"}
          loadingMessage={() => "Cargando..."}
          additional={{
            page: 1,
          }}
          styles={customStyles}
          isClearable={isClearable}
          hideSelectedOptions={false}
          closeMenuOnSelect={!multiple}
        />
      </div>
    </>
  );
};

export default SelectFieldAsyncPaginateMock;