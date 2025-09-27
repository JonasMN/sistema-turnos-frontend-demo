import React from 'react';
import ReactSelect, { components } from 'react-select';
import styles from './Select.module.scss';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  multiple = false,
  required = false,
  error = '',
  placeholder = 'Seleccionar',
  disabled = false,
  className = '',
  useCustomMultiValue = false,
  ...selectProps
}) => {
  const getValue = () => {
    if (multiple) {
      if (Array.isArray(value)) {
        return options.filter(opt => value.includes(opt.value));
      }
      return [];
    } else {
      return options.find(opt => opt.value === value) || null;
    }
  };

  const handleChange = (selected) => {
    if (multiple) {
      const values = selected ? selected.map(opt => opt.value) : [];
      onChange({
        target: {
          name,
          value: values,
        },
      });
    } else {
      onChange({
        target: {
          name,
          value: selected ? selected.value : '',
        },
      });
    }
  };

  const MultiValue = ({ index, getValue, ...props }) => {
    const maxToShow = 2;
    const overflow = getValue().length - maxToShow;
  
    if (index < maxToShow) {
      return <components.MultiValue {...props} />;
    }
    if (index === maxToShow) {
      return (
        <div style={{ marginLeft: 4, fontSize: 12, color: "#666" }}>
          +{overflow} más
        </div>
      );
    }
    return null;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error ? 'var(--red)' : provided.borderColor,
      boxShadow: state.isFocused
        ? error
          ? '0 0 0 2px rgba(221, 75, 57, 0.1)'
          : '0 0 0 2px rgba(243, 156, 18, 0.1)'
        : 'none',
      '&:hover': {
        borderColor: error ? 'var(--red)' : '#bbb',
      },
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: '6px',
      minHeight: '38px',
      backgroundColor: state.isDisabled ? "#e9ecef" : "white",
      pointerEvents: state.isDisabled ? "none" : "auto",  // Desactivar eventos si está deshabilitado
      opacity: state.isDisabled ? 0.6 : 1, // Reducir opacidad si está deshabilitado
      "&:hover": {
        borderColor: state.isDisabled ? "#ced4da" : "#80bdff", // No cambiar el borde si está deshabilitado
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#e9ecef" : state.isFocused ? "#f8f9fa" : "white",
      color: state.isFocused ? "#000" : "#495057",
      color: state.isDisabled ? '#999' : "#495057",
      cursor: state.isDisabled ? 'not-allowed' : 'default',
      fontStyle: state.isDisabled ? 'italic' : 'normal',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "6px",
    }),
  };

  const customComponents = useCustomMultiValue
  ? { MultiValue }
  : {};

  const allOptions = [{  label: "Seleccionar" }, ...options];

  return (
    <div className={`${styles.selectField} ${className}`}>
      {label && (
        <label className={`form-label ${styles.label}`} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <ReactSelect
        inputId={name}
        components={customComponents}
        closeMenuOnSelect={!multiple}
        name={name}
        options={allOptions}
        value={getValue()}
        onChange={handleChange}
        isMulti={multiple}
        isDisabled={disabled}
        placeholder={placeholder}
        styles={customStyles}
        classNamePrefix="react-select"
        hideSelectedOptions={false}
        menuPosition="fixed"
        placeholder="Seleccionar"
        noOptionsMessage={() => "No hay resultados"}
        {...selectProps}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Select;
