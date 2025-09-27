import React, { useState, useEffect } from 'react';
import ModalCustom from '../ModalCustom/ModalCustom.jsx';
import FormField from '../FormField/FormField.jsx';
import MultiSelect from '../MultiSelect/MultiSelect.jsx';
import Button from '../Button/Button.jsx';
import { Save, X } from 'lucide-react';
import styles from './ModalEditarHorario.module.scss';

const ModalEditarHorario = ({ 
  isOpen, 
  onHide, 
  horario, 
  onGuardar,
  diasOptions = []
}) => {
  const [formData, setFormData] = useState({
    dias_semana: [],
    h_inicio: '',
    h_fin: '',
    cupos_max: '',
    intervalo: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (horario) {
      setFormData({
        dias_semana: horario.resource?.dias_semana || [horario.resource?.dia_semana] || [],
        h_inicio: horario.resource?.h_inicio || '',
        h_fin: horario.resource?.h_fin || '',
        cupos_max: horario.resource?.cupos_max || '',
        intervalo: horario.resource?.intervalo || ''
      });
    }
  }, [horario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo modificado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.dias_semana?.length) {
      newErrors.dias_semana = 'Selecciona al menos un día';
    }

    if (!formData.h_inicio) {
      newErrors.h_inicio = 'Hora de inicio es requerida';
    }

    if (!formData.h_fin) {
      newErrors.h_fin = 'Hora de fin es requerida';
    }

    if (formData.h_inicio && formData.h_fin && formData.h_inicio >= formData.h_fin) {
      newErrors.h_fin = 'La hora de fin debe ser mayor a la hora de inicio';
    }

    if (!formData.cupos_max || parseInt(formData.cupos_max) < 1) {
      newErrors.cupos_max = 'Los cupos deben ser mayor a 0';
    }

    if (!formData.intervalo || parseInt(formData.intervalo) < 5) {
      newErrors.intervalo = 'El intervalo debe ser al menos 5 minutos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const datosLimpios = {
      dias_semana: formData.dias_semana,
      h_inicio: formData.h_inicio,
      h_fin: formData.h_fin,
      cupos_max: parseInt(formData.cupos_max),
      intervalo: parseInt(formData.intervalo)
    };

    onGuardar(datosLimpios);
  };

  const handleClose = () => {
    setFormData({
      dias_semana: [],
      h_inicio: '',
      h_fin: '',
      cupos_max: '',
      intervalo: ''
    });
    setErrors({});
    onHide();
  };

  return (
    <ModalCustom
      isOpen={isOpen}
      onHide={handleClose}
      title="Editar Horario"
      modalFooter={false}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <MultiSelect
              label="Días"
              name="dias_semana"
              value={formData.dias_semana}
              onChange={handleChange}
              options={diasOptions}
              placeholder="Selecciona días"
            />
            {errors.dias_semana && (
              <span className={styles.error}>{errors.dias_semana}</span>
            )}
          </div>

          <div className={styles.formField}>
            <FormField
              label="Hora Inicio"
              name="h_inicio"
              type="time"
              value={formData.h_inicio}
              onChange={handleChange}
            />
            {errors.h_inicio && (
              <span className={styles.error}>{errors.h_inicio}</span>
            )}
          </div>

          <div className={styles.formField}>
            <FormField
              label="Hora Fin"
              name="h_fin"
              type="time"
              value={formData.h_fin}
              onChange={handleChange}
            />
            {errors.h_fin && (
              <span className={styles.error}>{errors.h_fin}</span>
            )}
          </div>

          <div className={styles.formField}>
            <FormField
              label="Cupos Máx."
              name="cupos_max"
              type="number"
              value={formData.cupos_max}
              onChange={handleChange}
              min="1"
              placeholder="Ej: 5"
            />
            {errors.cupos_max && (
              <span className={styles.error}>{errors.cupos_max}</span>
            )}
          </div>

          <div className={styles.formField}>
            <FormField
              label="Intervalo (min)"
              name="intervalo"
              type="number"
              value={formData.intervalo}
              onChange={handleChange}
              min="5"
              step="5"
              placeholder="Ej: 30"
            />
            {errors.intervalo && (
              <span className={styles.error}>{errors.intervalo}</span>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <Button 
            type="button" 
            variant="secondary" 
            size="medium" 
            icon={X} 
            iconPosition="left"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            size="medium" 
            icon={Save} 
            iconPosition="left"
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </ModalCustom>
  );
};

export default ModalEditarHorario;
