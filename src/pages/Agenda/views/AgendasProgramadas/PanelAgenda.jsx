import React, { useState, useMemo } from "react";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import useModal from "../../../../hooks/useModal.jsx";
import FormularioAgenda from "./FormularioAgenda";
import Button from "../../../../components/Button/Button.jsx";
import { Edit, Trash2, Plus, Calendar, BarChart  } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./AgendasProgramadas.module.scss";

const NUMEROS_A_DIAS = {
  0: "lunes",
  1: "martes",
  2: "miércoles",
  3: "jueves",
  4: "viernes",
  5: "sábado",
  6: "domingo",
};

const PanelAgenda = ({
  agendasExistentes,
  diasOpciones,
  onActualizarAgenda,
  onEliminarAgenda,
  onEliminarAgendaDetalle,
  onAgregarHorario,
}) => {
  const [detalleEditando, setDetalleEditando] = useState(null);
  const [agendaEditando, setAgendaEditando] = useState(null);
  const [diasGrupo, setDiasGrupo] = useState([]);
  const [showModal, toggleModal] = useModal();

  const capitalize = (str) => str?.charAt(0)?.toUpperCase() + str?.slice(1);

  const ordenDias = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  const agendasOrdenadas = useMemo(() => {
    return [...agendasExistentes].sort((a, b) => {
      const fechaA = new Date(a.vigencia_desde);
      const fechaB = new Date(b.vigencia_desde);
      return fechaA - fechaB;
    });
  }, [agendasExistentes]);

  const estaVigente = (agenda) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const vigenciaHasta = agenda.vigencia_hasta
      ? new Date(agenda.vigencia_hasta)
      : null;
    if (!vigenciaHasta) return true;

    vigenciaHasta.setHours(0, 0, 0, 0);
    return hoy <= vigenciaHasta;
  };

  const agruparPorHorario = (detalles) => {
    const grupos = {};

    detalles.forEach((detalle) => {
      const clave = `${detalle.hora_inicio}-${detalle.hora_fin}`;
      if (!grupos[clave]) {
        grupos[clave] = [];
      }
      grupos[clave].push(detalle.dia_semana);
    });

    return grupos;
  };

  const abrirModal = (detalle, agenda) => {
    setDetalleEditando(detalle);
    setAgendaEditando(agenda);
    setDiasGrupo([detalle?.dia_semana]);
    toggleModal(true);
  };

  const cerrarModal = () => {
    toggleModal(false);
    setDetalleEditando(null);
    setAgendaEditando(null);
    setDiasGrupo([]);
  };

  const handleGuardar = (nuevosDatos) => {
    if (detalleEditando) {
      onActualizarAgenda(agendaEditando.id, nuevosDatos);
    } else {
      onAgregarHorario(nuevosDatos);
    }
    cerrarModal();
  };
  

  const handleEliminarClick = (detalle, agenda) => {
    if(agenda.detalles.length <= 1) {
      toast.warning(
        <div className={styles.toastContainer}>
          <p>
            No se puede eliminar este día. <br />
            Una agenda debe tener al menos un día configurado.
          </p>
          <div className={styles.toastButtons}>
            <Button
              type="button"
              onClick={() => toast.dismiss()}
              variant="secondary"
              size="small"
            >
              Entendido
            </Button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
          className: styles.toastCustom,
        }
      );
      return;
    }
    
    toast.info(
      <div className={styles.toastContainer}>
        <p>
          ¿Estás seguro de eliminar el horario del{" "}
          {capitalize(NUMEROS_A_DIAS[detalle.dia_semana])}?
        </p>
        <div className={styles.toastButtons}>
          <Button
            type="button"
            onClick={() => {
              toast.dismiss();
              onEliminarAgendaDetalle(detalle.id);
            }}
            variant="primary"
            size="small"
          >
            Eliminar
          </Button>
          <Button
            type="button"
            onClick={() => toast.dismiss()}
            variant="secondary"
            size="small"
          >
            Cancelar
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: styles.toastCustom,
      }
    );
  };

  const handleEliminarAgendaClick = (agendaId) => {
    toast.info(
      <div className={styles.toastContainer}>
        <p>¿Estás seguro de eliminar toda la agenda?</p>
        <div className={styles.toastButtons}>
          <Button
            type="button"
            onClick={() => {
              toast.dismiss();
              onEliminarAgenda(agendaId);
            }}
            variant="primary"
            size="small"
          >
            Eliminar
          </Button>
          <Button
            type="button"
            onClick={() => toast.dismiss()}
            variant="secondary"
            size="small"
          >
            Cancelar
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: styles.toastCustom,
      }
    );
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES");
  };

  const mostrarVigencia = (vigencia_desde, vigencia_hasta) => {
    if (!vigencia_hasta) return `Desde ${formatFecha(vigencia_desde)}`;
    return `${formatFecha(vigencia_desde)} - ${formatFecha(vigencia_hasta)}`;
  };

  return (
    <>
      {(
        <div className={styles.agendasExistentes}>
          {agendasOrdenadas.length > 0 ? (
            <div className={`${styles.agendasContainer} ${agendasOrdenadas.length === 1 ? styles.unaAgenda : ""}`}>
              {agendasOrdenadas.map((agenda) => {
                const vigente = estaVigente(agenda);

                return (
                  <div key={agenda.id} className={styles.agendaCard}>
                    <div className={styles.agendaHeader}>
                      <h5>
                        Vigencia:{" "}
                        {mostrarVigencia(
                          agenda.vigencia_desde,
                          agenda.vigencia_hasta
                        )}{" "}
                        - {agenda.ubicacion?.nombre}
                        {!vigente && (
                          <span className={styles.vigenciaExpirada}></span>
                        )}
                      </h5>
                      <div className={styles.agendaActions}>
                        {vigente ? (
                          (() => {
                            const diasUsados = agenda.detalles.map(
                              (d) => d.dia_semana
                            );
                            const diasDisponibles = diasOpciones.filter(
                              (opcion) =>
                                !diasUsados.includes(
                                  ordenDias.indexOf(opcion.value.toLowerCase())
                                )
                            );

                            if (diasDisponibles.length === 0) return null;

                            return (
                              <Button
                                type="button"
                                onClick={() => {
                                  setDetalleEditando(null);
                                  setAgendaEditando(agenda);
                                  setDiasGrupo([]);
                                  toggleModal(true);
                                }}
                                variant="new"
                                size="small"
                                icon={Plus}
                                aria-label="Agregar nuevo horario"
                              >
                                Agregar horario
                              </Button>
                            );
                          })()
                        ) : (
                          <span className={styles.noVigenteTag}>
                            No vigente
                          </span>
                        )}

                        {vigente && (
                          <Button
                            type="button"
                            onClick={() => {
                              setDetalleEditando(agenda.detalles[0]);
                              setAgendaEditando(agenda);
                              setDiasGrupo(
                                agenda.detalles.map((d) => d.dia_semana)
                              );
                              toggleModal(true);
                            }}
                            variant="primary"
                            size="small"
                            icon={Edit}
                            aria-label="Editar todos los horarios"
                          >
                            Editar agenda
                          </Button>
                        )}

                        <Button
                          type="button"
                          onClick={() => {
                            handleEliminarAgendaClick(agenda.id);
                          }}
                          variant="secondary"
                          size="small"
                          icon={Trash2}
                          aria-label="Eliminar agenda"
                        >
                          Eliminar agenda
                        </Button>
                      </div>
                    </div>
                    <div className={styles.agendaInfo}>
                      <div className={styles.agendaDetail}>
                        <Calendar className={styles.detailIcon} />
                        <strong>Días configurados:</strong>{" "}
                        {agenda.detalles
                          .map((detalle) =>
                            capitalize(NUMEROS_A_DIAS[detalle.dia_semana])
                          )
                          .sort(
                            (a, b) =>
                              ordenDias.indexOf(a.toLowerCase()) -
                              ordenDias.indexOf(b.toLowerCase())
                          )
                          .join(", ")}
                      </div>

                      <div className={styles.agendaDetail}>
                        <BarChart className={styles.detailIcon} />
                        <strong>Horarios configurados</strong>
                      </div>

                      <div className={styles.horariosPorDia}>
                        {agenda.detalles
                          .sort((a, b) => a.dia_semana - b.dia_semana)
                          .map((detalle) => (
                            <div
                              key={`${agenda.id}-${detalle.dia_semana}`}
                              className={styles.detalleHorario}
                            >
                              <div className={styles.horarioInfo}>
                                <strong>
                                  {capitalize(
                                    NUMEROS_A_DIAS[detalle.dia_semana]
                                  )}
                                  :
                                </strong>{" "}
                                {detalle.hora_inicio} - {detalle.hora_fin}(
                                {detalle.cupo_por_franja} cupos, cada{" "}
                                {detalle.intervalo_minutos}min)
                              </div>

                              <div className={styles.horarioActions}>
                                {vigente ? (
                                  <>
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        abrirModal(detalle, agenda)
                                      }
                                      variant="primary"
                                      size="small"
                                      icon={Edit}
                                      aria-label={`Editar horario`}
                                    />
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        handleEliminarClick(detalle, agenda)
                                      }
                                      variant="secondary"
                                      size="small"
                                      icon={Trash2}
                                      aria-label={`Eliminar horario de ${capitalize(
                                        NUMEROS_A_DIAS[detalle.dia_semana]
                                      )}`}
                                    />
                                  </>
                                ) : (
                                  <span
                                    className={styles.vigenciaExpiradaText}
                                  ></span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.sinAgendas}>
              <Calendar className={styles.sinAgendasIcon} />
              Aún no hay agendas configuradas para esta ubicación.
            </div>
          )}
        </div>
      )}

      <ModalCustom
        isOpen={showModal}
        onHide={cerrarModal}
        title={
          detalleEditando
            ? `Editar horario`
            : "Agregar nuevo horario"
        }
      >
        <FormularioAgenda
          detalleEditando={detalleEditando}
          agendaEditando={agendaEditando}
          diasOpciones={diasOpciones}
          diasOcupados={
            agendaEditando
              ? agendaEditando.detalles.map((d) => d.dia_semana)
              : []
          }
          diasGrupo={diasGrupo}
          onCerrar={cerrarModal}
          onGuardar={handleGuardar}
        />
      </ModalCustom>
    </>
  );
};

export default PanelAgenda;