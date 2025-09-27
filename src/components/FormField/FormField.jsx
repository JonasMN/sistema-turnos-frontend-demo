import React from 'react';
import styles from './FormField.module.scss';
import { BadgeInfo   } from "lucide-react";

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  error = '',
  placeholder = '',
  disabled = false,
  className = '',
  tooltip = '', 
  ...inputProps
}) => {

  
  const getFieldClasses = () => {
    let classes = `form-control ${styles.input}`;
    
    if (error) {
      classes += ` ${styles.inputError}`;
    }
    
    if (disabled) {
      classes += ` ${styles.inputDisabled}`;
    }
    
    return classes;
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (!value) return onChange(e);
  
    const [h, m] = value.split(":");
    if (isNaN(h) || isNaN(m)) return onChange(e);
  
    if (m[0] !== "0") {
      const minutes = parseInt(m, 10);
      const totalMinutes = parseInt(h, 10) * 60 + minutes;
  
      const rounded = Math.floor(totalMinutes / 30) * 30;
      const hh = String(Math.floor(rounded / 60)).padStart(2, "0");
      const mm = String(rounded % 60).padStart(2, "0");
  
      e.target.value = `${hh}:${mm}`;
    }
  
    onChange(e);
  };
  

  return (
    <div className={`${styles.formField} ${className}`}>
      {label && (
        <label className={`form-label ${styles.label}`}>
          {label}
          {required && <span className={styles.required}>*</span>}
          {tooltip && (
            <span className={styles.infoWrapper}>
              <BadgeInfo size={14} className={styles.infoIcon}/>
              <span className={styles.tooltipText}>{tooltip}</span>
            </span>
          )}
        </label>
      )}

      <input
        name={name}
        type={type}
        value={value || ""}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={getFieldClasses()}
        onChange={type === "time" ? handleTimeChange : onChange}
        step={type === "time" ? 1800 : inputProps.step}
        min={type === "time" ? "00:00" : inputProps.min}
        max={type === "time" ? "23:30" : inputProps.max}
        {...inputProps}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default FormField;
