import React, { useState, useEffect, useMemo } from "react";
import FormField from "../../../../components/FormField/FormField.jsx";
import Select from "../../../../components/Select/Select.jsx";
import IntervalSelect from "../../../../components/IntervalSelect/IntervalSelect.jsx";
import Button from "../../../../components/Button/Button.jsx";
import FormularioBase from "../../../../components/FormularioBase/FormularioBase.jsx";
import TimeSelect from "../../../../components/TimeSelect/TimeSelect.jsx";
import styles from "../../Agenda.module.scss";
import { toast } from "react-toastify";
import { Save, X } from "lucide-react";

const DIAS_NUMERICOS = {
  lunes: 0,
  martes: 1,
  miércoles: 2,
  jueves: 3,
  viernes: 4,
  sábado: 5,
  domingo: 6,
};

const NUMEROS_A_DIAS = {
  0: "lunes",
  1: "martes",
  2: "miércoles",
  3: "jueves",
  4: "viernes",
  5: "sábado",
  6: "domingo",
};

const FormularioAgenda = ({ detalleEditando, agendaEditando, diasOpciones, diasOcupados = [], diasGrupo, onGuardar, onCerrar}) => {
  const [formData, setFormData] = useState({
    hora_inicio: "",
    hora_fin: "",
    cupo_por_franja: "",
    id_config: "",
    id: "",
    intervalo_minutos: "",
    dias_semana: [],
  });

  const todosCamposCompletos =
    formData.hora_inicio !== "" &&
    formData.hora_fin !== "" &&
    formData.cupo_por_franja !== "" &&
    formData.intervalo_minutos !== "" &&
    Array.isArray(formData.dias_semana) &&
    formData.dias_semana.length > 0;

    const diasDisponibles = useMemo(() => {
      if (detalleEditando) {
        return diasOpciones.filter(opcion => 
          diasOcupados.includes(DIAS_NUMERICOS[opcion.value])
        );
      } else {
        return diasOpciones.filter(opcion => 
          !diasOcupados.includes(DIAS_NUMERICOS[opcion.value])
        );
      }
    }, [diasOpciones, diasOcupados, detalleEditando]);

  const validarFormularioAgenda = (formData) => {
    if (!formData.dias_semana.length)
      return "Debe seleccionar al menos un día.";

    if (!formData.hora_inicio || !formData.hora_fin)
      return "Debe especificar la hora de inicio y fin.";

    if (formData.hora_inicio >= formData.hora_fin)
      return "La hora de inicio debe ser anterior a la de fin.";

    const cupos = parseInt(formData.cupo_por_franja, 10);
    if (isNaN(cupos) || cupos < 1 || cupos > 100)
      return "El cupo por franja debe ser un número entre 1 y 100.";

    const intervalo = parseInt(formData.intervalo_minutos, 10);
    if (isNaN(intervalo) || intervalo < 5 || intervalo > 60)
      return "El intervalo debe estar entre 5 y 60 minutos.";

    return null;
  };

  useEffect(() => {
    if (detalleEditando) {
      let diasSeleccionados = [];

      if (diasGrupo && diasGrupo.length > 0) {
        diasSeleccionados = diasGrupo.map((num) => NUMEROS_A_DIAS[num]);
      } else if (detalleEditando.dia_semana) {
        diasSeleccionados = [NUMEROS_A_DIAS[detalleEditando.dia_semana]];
      }

      setFormData({
        hora_inicio: detalleEditando.hora_inicio.substring(0, 5),
        hora_fin: detalleEditando.hora_fin.substring(0, 5),
        cupo_por_franja: detalleEditando.cupo_por_franja.toString(),
        id_config: detalleEditando?.id_config?.toString(),
        id: detalleEditando.id.toString(),
        intervalo_minutos: detalleEditando.intervalo_minutos,
        dias_semana: diasSeleccionados,
      });
    } else {
      setFormData({
        hora_inicio: "",
        hora_fin: "",
        cupo_por_franja: "",
        id_config:agendaEditando?.id?.toString() || "",
        id: "",
        intervalo_minutos: "",
        dias_semana: [],
      });
    }
  }, [detalleEditando, diasGrupo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleDiasChange = (selected) => {
  const { value } = selected.target;

  setFormData(prev => ({
    ...prev,
    dias_semana: value,
  }));
};

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensajeError = validarFormularioAgenda(formData);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    let datos;
    if(detalleEditando){
      datos = [
        {
          id_config: formData.id_config,
          detalles: formData.dias_semana.map((dia) => {
            const diaNum = DIAS_NUMERICOS[dia];
            const detalleExistente = agendaEditando.detalles.find(d => d.dia_semana === diaNum);
            return {
              id: detalleExistente ? detalleExistente.id : null,
              data: {
                hora_inicio: `${formData.hora_inicio}:00`,
                hora_fin: `${formData.hora_fin}:00`,
                cupo_por_franja: parseInt(formData.cupo_por_franja, 10),
                intervalo_minutos: parseInt(formData.intervalo_minutos, 10),
                dia_semana: diaNum,
              }
            };
          })
        }
      ];
    }else{
      const dias = Array.isArray(formData.dias_semana)
        ? formData.dias_semana
        : [formData.dias_semana];

      datos = {
        id_config: formData.id_config,
        detalles: dias.map((dia) => ({
          hora_inicio: `${formData.hora_inicio}:00`,
          hora_fin: `${formData.hora_fin}:00`,
          cupo_por_franja: parseInt(formData.cupo_por_franja, 10),
          intervalo_minutos: parseInt(formData.intervalo_minutos, 10),
          dia_semana: DIAS_NUMERICOS[dia],
        })),
      };

    }

    onGuardar(datos);
  };
  
  return (
    <FormularioBase onSubmit={handleSubmit} onCancel={onCerrar}>
      <Select
        label="Días de la semana"
        name="dias_semana"
        value={
          !detalleEditando || diasGrupo.length !== 1
            ? formData.dias_semana
            : formData.dias_semana[0]
        }       
        onChange={handleDiasChange}
        options={diasDisponibles}
        placeholder="Seleccionar"
        multiple={!!detalleEditando && diasGrupo.length !== 1}
        required
        disabled={!!detalleEditando && diasGrupo.length === 1}
      />

      <TimeSelect
        value={formData.hora_inicio}
        onChange={handleChange}
        name="hora_inicio"
        required
        label="Hora inicio"
        placeholder="Seleccionar"
      />

      <TimeSelect
        value={formData.hora_fin}
        onChange={handleChange}
        name="hora_fin"
        required
        label="Hora fin"
        placeholder="Seleccionar"
      />

      <FormField
        label="Cupos por Franja"
        type="number"
        name="cupo_por_franja"
        value={formData.cupo_por_franja}
        onChange={handleChange}
        min={1}
        required
        placeholder="0"
      />

      <IntervalSelect
        value={formData.intervalo_minutos}
        onChange={handleChange}
        name="intervalo_minutos"
        label="Intervalo (minutos)"
        placeholder="0"
        required
      />
    </FormularioBase>
  );
};

export default FormularioAgenda;