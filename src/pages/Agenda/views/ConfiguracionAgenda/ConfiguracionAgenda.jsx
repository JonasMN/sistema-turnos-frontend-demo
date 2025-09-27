import React, { useState, useMemo, useEffect } from "react";
import FiltrosAgenda from "./FiltrosAgenda";
// COMENTADO - USAR MOCKS
// import postAgenda from "../../../../services/agenda/postAgenda.js";
// import putAgenda from "../../../../services/agenda/putAgenda.js";
// import deleteAgenda from "../../../../services/agenda/deleteAgenda.js";
// import deleteAgendaDetalle from "../../../../services/agenda/deleteAgendaDetalle.js";
// import postAgendaDetalle from "../../../../services/agenda/postAgendaDetalle.js";
import Loader from "../../../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";
import { useAgendas } from "../../../../hooks/useMockData.js";
import styles from "../../Agenda.module.scss";

const DIAS_NUMERICOS = {
  lunes: 0,
  martes: 1,
  miércoles: 2,
  jueves: 3,
  viernes: 4,
  sábado: 5,
  domingo: 6,
};

export default function ConfiguracionAgenda() {
  const { data: agendasData, loading: isLoading, create } = useAgendas();
  const [filtros, setFiltros] = useState({
    unidad: "",
    ubicacion: "",
    dias_semana: [],
    h_inicio: "",
    h_fin: "",
    vigencia_desde: "",
    vigencia_hasta: "",
    cupos_max: "",
    intervalo: "",
  });

  const [error, setError] = useState(null);

  const validarFiltros = (filtros) => {
    if (!filtros.unidad) return "Debe seleccionar una unidad.";
    if (!filtros.ubicacion) return "Debe seleccionar una ubicación.";
    if (!filtros.dias_semana.length) return "Debe seleccionar al menos un día.";
    if (!filtros.vigencia_desde)
      return "Debe especificar la fecha de vigencia desde.";

    if (!filtros.h_inicio || !filtros.h_fin)
      return "Debe especificar la hora de inicio y fin.";
    if (filtros.h_inicio >= filtros.h_fin)
      return "La hora de inicio debe ser anterior a la de fin.";

    if (
      filtros.vigencia_hasta &&
      filtros.vigencia_desde >= filtros.vigencia_hasta
    )
      return "La vigencia hasta debe ser posterior a la vigencia desde.";

    const cupos = parseInt(filtros.cupos_max);
    if (isNaN(cupos) || cupos < 1 || cupos > 100)
      return "El cupo máximo debe ser un número entre 1 y 100.";

    const intervalo = parseInt(filtros.intervalo);
    if (
      isNaN(intervalo) ||
      intervalo < 5 ||
      intervalo > 60 ||
      intervalo % 5 !== 0
    )
      return "El intervalo debe estar entre 5 y 60 minutos.";

    return null;
  };


  const DIAS_OPCIONES = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miércoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sábado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
  ];

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    if (Array.isArray(value)) {
      const filteredValues = value.filter((v) => v);
      setFiltros((f) => ({
        ...f,
        [name]: filteredValues,
      }));
    } else {
      setFiltros((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "unidad" && { ubicacion: null }), 
      }));
    }
  };

  const handleGuardarAgenda = async () => {
    const mensajeError = validarFiltros(filtros);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    setError(null);

    try {
      // MODO DEMO: Crear agenda simplificada
      const agendaParaGuardar = {
        ubicacionId: parseInt(filtros.ubicacion?.id),
        ubicacion: filtros.ubicacion?.nombre || 'Ubicación Demo',
        unidadId: parseInt(filtros.unidad?.id),
        unidad: filtros.unidad?.nombre || 'Unidad Demo',
        fecha: filtros.vigencia_desde,
        dia: filtros.dias_semana[0] || 'lunes',
        horaInicio: filtros.h_inicio,
        horaFin: filtros.h_fin,
        intervaloMinutos: parseInt(filtros.intervalo),
        capacidadMaxima: parseInt(filtros.cupos_max),
        turnos: 0,
        turnosDisponibles: parseInt(filtros.cupos_max),
        activo: true,
        horarios: [
          {
            id: Date.now(),
            horaInicio: filtros.h_inicio,
            horaFin: filtros.h_fin,
            capacidad: parseInt(filtros.cupos_max)
          }
        ]
      };

      await create(agendaParaGuardar);

      setFiltros((prev) => ({
        ...prev,
        dias_semana: [],
        h_inicio: "",
        h_fin: "",
        cupos_max: "",
        intervalo: "",
      }));

      toast.success("Agenda guardada exitosamente", { position: "top-right" });
    } catch (err) {
      toast.error("Error al guardar la agenda: " + err.message, { position: "top-right" });
    }
  };

  return (
    <div className={styles.configWrapper}>
      {isLoading && <Loader />}
      <FiltrosAgenda
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
        diasOpciones={DIAS_OPCIONES}
        onGuardarAgenda={handleGuardarAgenda}
      />
    </div>
  );
}
