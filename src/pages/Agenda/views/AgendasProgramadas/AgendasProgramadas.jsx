import React, { useState, useMemo, useEffect,lazy, Suspense } from "react";
const PanelAgenda = lazy(() => import("./PanelAgenda"));
const ListaAgendas = lazy(() => import("./ListaAgendas"));
import FiltrosAgendasProgramadas from "./FiltrosAgendasProgramadas";
// COMENTADO - USAR MOCKS
// import getConfirguracionAgenda from "../../../../services/agenda/getConfirguracionAgenda.js";
// import putAgenda from "../../../../services/agenda/putAgenda.js";
// import deleteAgenda from "../../../../services/agenda/deleteAgenda.js";
// import deleteAgendaDetalle from "../../../../services/agenda/deleteAgendaDetalle.js";
// import postAgendaDetalle from "../../../../services/agenda/postAgendaDetalle.js";
import Loader from "../../../../components/Loader/Loader.jsx";
import { toast } from "react-toastify";
import { useAgendas } from "../../../../hooks/useMockData.js";
import styles from "./AgendasProgramadas.module.scss";

export default function AgendasProgramadas() {
  const { data: agendasData, loading: isLoading, getAll, create, update, remove } = useAgendas();
  const [filtros, setFiltros] = useState({
    unidad: "",
    ubicacion: "",
  });

  const [agendas, setAgendas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  
  useEffect(() => {
    if (agendasData && agendasData.resultados) {
      setAgendas(agendasData.resultados);
    }
  }, [agendasData]);

  useEffect(() => {
    getAll();
  }, []);


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
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "unidad" && { ubicacion: null }), 
    }));
  };

  const handleActualizarAgenda = async (agendaId, nuevosDatos) => {
    try {
      console.log('Actualizando agenda:', agendaId, nuevosDatos);
      
      // Encontrar la agenda actual
      const agendaActual = agendas.find(a => a.id === agendaId);
      if (!agendaActual) {
        throw new Error('Agenda no encontrada');
      }

      // Los nuevosDatos vienen del FormularioAgenda en formato específico
      const datosActualizacion = nuevosDatos[0]; // Es un array con un objeto
      
      // Actualizar los detalles según los datos del formulario
      let detallesActualizados = [...agendaActual.detalles];
      
      datosActualizacion.detalles.forEach(nuevoDetalle => {
        if (nuevoDetalle.id && nuevoDetalle.id !== null) {
          // Actualizar detalle existente
          const index = detallesActualizados.findIndex(d => d.id === nuevoDetalle.id);
          if (index !== -1) {
            detallesActualizados[index] = {
              ...detallesActualizados[index],
              ...nuevoDetalle.data
            };
          }
        } else {
          // Agregar nuevo detalle
          const maxId = Math.max(...detallesActualizados.map(d => d.id), 0);
          detallesActualizados.push({
            id: maxId + 1,
            ...nuevoDetalle.data
          });
        }
      });

      const agendaActualizada = {
        ...agendaActual,
        detalles: detallesActualizados
      };

      await update(agendaId, agendaActualizada);
      
      toast.success("Agenda actualizada exitosamente", {
        position: "top-right",
      });
    } catch (err) {
      console.error('Error actualizando agenda:', err);
      toast.error("Error al actualizar la agenda: " + err.message, {
        position: "top-right"
      });
    }
  };

  const handleEliminarAgenda = async (agendaId) => {
    try {
      await remove(agendaId);
      toast.success("Agenda eliminada exitosamente", { position: "top-right" });
    } catch (err) {
      toast.error("Error al eliminar la agenda: " + err.message, {
        position: "top-right"
      });
    }
  };

  const handleEliminarDetalleAgenda = async (detalleId) => {
    try {
      console.log('Eliminando detalle:', detalleId);
      
      // Encontrar la agenda que contiene este detalle
      const agendaConDetalle = agendas.find(agenda => 
        agenda.detalles.some(detalle => detalle.id === detalleId)
      );
      
      if (!agendaConDetalle) {
        throw new Error('Agenda con el detalle no encontrada');
      }
      
      // Filtrar los detalles para eliminar el especificado
      const detallesFiltrados = agendaConDetalle.detalles.filter(
        detalle => detalle.id !== detalleId
      );
      
      const agendaActualizada = {
        ...agendaConDetalle,
        detalles: detallesFiltrados
      };
      
      await update(agendaConDetalle.id, agendaActualizada);
      
      toast.success("Horario eliminado exitosamente", {
        position: "top-right",
      });
    } catch (err) {
      console.error('Error eliminando detalle:', err);
      toast.error("Error al eliminar el horario: " + err.message, {
        position: "top-right"
      });
    }
  };

  const handleAgregarHorario = async (agendaId, datosHorario) => {
    try {
      console.log('Agregando horario a agenda:', agendaId, datosHorario);
      
      // Encontrar la agenda por ID
      const agenda = agendas.find(a => a.id === agendaId);
      if (!agenda) {
        throw new Error('Agenda no encontrada');
      }
      
      // Crear el nuevo detalle con ID único
      const nuevoDetalle = {
        id: Math.max(...agenda.detalles.map(d => d.id), 0) + 1,
        idAgenda: agendaId,
        dia: datosHorario.dia,
        horaInicio: datosHorario.horaInicio,
        horaFin: datosHorario.horaFin,
        unidad: {
          id: datosHorario.unidad?.id || datosHorario.unidadId,
          nombre: datosHorario.unidad?.nombre || datosHorario.unidadNombre
        },
        ubicacion: {
          id: datosHorario.ubicacion?.id || datosHorario.ubicacionId,
          nombre: datosHorario.ubicacion?.nombre || datosHorario.ubicacionNombre
        }
      };
      
      // Agregar el nuevo detalle a la agenda
      const agendaActualizada = {
        ...agenda,
        detalles: [...agenda.detalles, nuevoDetalle]
      };
      
      await update(agendaId, agendaActualizada);
      
      toast.success("Horario agregado exitosamente", { position: "top-right" });
    } catch (err) {
      console.error('Error agregando horario:', err);
      toast.error("Error al agregar el horario: " + err.message, {
        position: "top-right"
      });
    }
  };

  const onFiltrar = async (datos) => {
    try {
      await getAll();
      setSeleccionadas([]);
      // MODO DEMO: Filtrado básico por ubicación
      if (datos.ubicacion && agendasData?.resultados) {
        const agendasFiltradas = agendasData.resultados.filter(
          agenda => agenda.ubicacionId === datos.ubicacion
        );
        setAgendas(agendasFiltradas);
      } else {
        setAgendas(agendasData?.resultados || []);
      }
    } catch (err) {
      toast.error("Error al obtener agendas: " + err.message);
    }
  };

  return (
    <div className={styles.configWrapper}>
      {isLoading && <Loader />}
      <FiltrosAgendasProgramadas
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
        onFiltrar={onFiltrar}
      />

      <div className={styles.contenedorAgendas}>
        <Suspense fallback={<Loader />}>
          <ListaAgendas
            agendas={agendas}
            agendasSeleccionadas={seleccionadas}
            onSeleccionar={(agenda) =>
              setSeleccionadas((prev) => {
                const yaEsta = prev.find((a) => a.id === agenda.id);

                if (yaEsta) {
                  return prev.filter((a) => a.id !== agenda.id);
                } else {
                  return prev.length >= 2
                    ? [prev[1], agenda]
                    : [...prev, agenda];
                }
              })
            }
          />
        </Suspense>

        <div className={styles.columnaDerecha}>
          {seleccionadas && seleccionadas.length > 0 ? (
            <div className={styles.panel} key={seleccionadas.id}>
              <Suspense fallback={<Loader />}>
                <PanelAgenda
                  agendasExistentes={agendas.filter((a) =>
                    seleccionadas.some((s) => s.id === a.id)
                  )}
                  diasOpciones={DIAS_OPCIONES}
                  onActualizarAgenda={handleActualizarAgenda}
                  onEliminarAgenda={handleEliminarAgenda}
                  onEliminarAgendaDetalle={handleEliminarDetalleAgenda}
                  onAgregarHorario={handleAgregarHorario}
                />
              </Suspense>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
