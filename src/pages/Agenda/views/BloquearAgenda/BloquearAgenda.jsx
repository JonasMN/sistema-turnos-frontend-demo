import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isValid } from "date-fns";
import es from "date-fns/locale/es";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import Box from "../../../../components/Box/Box.jsx";
import useModal from "../../../../hooks/useModal.jsx";
import FormularioBloquearAgenda from "./components/FormularioBloquearAgenda";
import getUbicacionesPorEmpresa from "../../../../services/ubicaciones/getUbicacionesPorEmpresa.js";
import { toast } from "react-toastify";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./BloquearAgenda.module.scss";

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const normalizeDate = (date) => {
  if (!date || !isValid(date)) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export default function YearGrid({ year = new Date().getFullYear(), events = []}) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const [blockedDays, setBlockedDays] = useState([
    {
      fecha: normalizeDate(new Date(year, 0, 1)),
      motivo: "Día de Año Nuevo",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 1, 12)),
      motivo: "Carnaval",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 1, 13)),
      motivo: "Carnaval",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 1)),
      motivo: "Día del Trabajador",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 1)),
      motivo: "Vacaciones",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 6)),
      motivo: "Vacaciones",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 7)),
      motivo: "Vacaciones",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 8)),
      motivo: "Vacaciones",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 9)),
      motivo: "Vacaciones",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 4, 10)),
      motivo: "Vacaciones",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 5, 20)),
      motivo: "Día de la Bandera",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 6, 9)),
      motivo: "Día de la Independencia",
      id_ubicacion: 7,
    },
    {
      fecha: normalizeDate(new Date(year, 11, 25)),
      motivo: "Navidad",
      id_ubicacion: 7,
    },
  ]);

  const [diasBloquearAgenda, setDiasBloquearAgenda] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, toggleModal] = useModal();
  const [formData, setFormData] = useState({
    ubicacion: "",
    motivo: "",
  });

  const getAndSet = async () => {
    try {
      setIsLoading(true);
      const { data } = await getUbicacionesPorEmpresa(1);
      if (data.error) {
        toast.error(data.error, { position: "top-right" });
        setUbicaciones([]);
        return;
      }
      setUbicaciones(
        data.map((u) => ({
          value: u.id,
          label: u.nombre,
        }))
      );
    } catch (err) {
      console.error("error al traer ubicaciones: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!ubicaciones.length) getAndSet();
  }, []);

  const isDateBlocked = (date) => {
    if (!isValid(date)) return false;

    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();

    return blockedDays.some((d) => {
      if (!d.fecha || !isValid(d.fecha)) return false;
      const bloqueadoOnly = new Date(
        d.fecha.getFullYear(),
        d.fecha.getMonth(),
        d.fecha.getDate()
      ).getTime();
      return bloqueadoOnly === dateOnly;
    });
  };

  const handleSelectSlot = (slotInfo) => {
    if (!slotInfo.start || !isValid(slotInfo.start)) {
      toast.error("Fecha inválida seleccionada");
      return;
    }
  
    const diasSeleccionados = (slotInfo.slots || [slotInfo.start]).map(d =>
      normalizeDate(d)
    );
  
    const existingBlock = blockedDays.find(d => {
      if (!d.fecha || !isValid(d.fecha)) return false;
      return diasSeleccionados.some(sel => 
        d.fecha.getTime() === sel.getTime()
      );
    });
  
    if (existingBlock) {
      setDiasBloquearAgenda(diasSeleccionados);
      setFormData({
        motivo: existingBlock.motivo || "",
        id_ubicacion: ubicaciones.find(u => u.value === existingBlock.id_ubicacion) || "",
      });
    } else {
      setDiasBloquearAgenda(diasSeleccionados);
      setFormData({
        motivo: "",
        id_ubicacion: "",
      });
    }
  
    toggleModal();
  };
  

  const handleSave = (datos) => {
    const fechasValidas = datos.dias.every((d) => isValid(d));
    if (!fechasValidas) {
      toast.error("Una o más fechas son inválidas");
      return;
    }

    setBlockedDays((prev) => {
      const nuevosBloqueos = datos.dias.map((d) => ({
        fecha: normalizeDate(d),
        motivo: datos.motivo,
        id_ubicacion: datos.id_ubicacion,
      }));
      
      const filteredPrev = prev.filter(p => 
        !datos.dias.some(d => {
          const pDate = p.fecha ? new Date(p.fecha.getFullYear(), p.fecha.getMonth(), p.fecha.getDate()).getTime() : null;
          const dDate = d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() : null;
          return pDate === dDate;
        })
      );
      
      return [...filteredPrev, ...nuevosBloqueos];
    });
    
    toggleModal();
  };

  const handleEditBlockedDay = (bloqueo) => {
    if (!bloqueo.fecha || !isValid(bloqueo.fecha)) {
      toast.error("Fecha inválida en el día bloqueado");
      return;
    }

    const normalizedDate = normalizeDate(bloqueo.fecha);
    setDiasBloquearAgenda([normalizedDate]);
    setFormData({
      motivo: bloqueo.motivo || "",
      id_ubicacion: ubicaciones.find(u => u.value === bloqueo.id_ubicacion) || "",
    });
    toggleModal();
  };

  const safeFormat = (date, formatString, options = {}) => {
    if (!date || !isValid(date)) return "Fecha inválida";
    return format(date, formatString, options);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.calendarWrapper}>
          <Box columns={3}>
            {months.map((date, i) => (
              <div key={i} className={styles.monthCard}>
                <h4 className={styles.monthTitle}>
                  {safeFormat(date, "MMMM", { locale: es })}
                </h4>
                <Calendar
                  localizer={localizer}
                  events={[]}
                  defaultDate={date}
                  defaultView="month"
                  toolbar={false}
                  popup={false}
                  selectable={true}
                  onSelectSlot={handleSelectSlot}
                  style={{ height: 210 }}
                  dayPropGetter={(date) => {
                    return {
                      className: isDateBlocked(date)
                        ? `${styles.holidayDay} rbc-day-bg`
                        : "rbc-day-bg",
                    };
                  }}
                  components={{
                    header: ({ date }) => {
                      const dayNames = [
                        "Dom",
                        "Lun",
                        "Mar",
                        "Mié",
                        "Jue",
                        "Vie",
                        "Sáb",
                      ];
                      return (
                        <div className={styles.weekDayHeader}>
                          {dayNames[date.getDay()]}
                        </div>
                      );
                    },
                  }}
                />
              </div>
            ))}
          </Box>
        </div>

        <div className={styles.panel}>
          <h3>Días Bloqueados</h3>
          {blockedDays.length === 0 && <p>No hay días bloqueados</p>}
          <ul className={styles.blockedDaysList}>
            {blockedDays.map((d, i) => (
              <li
                key={i}
                onClick={() => handleEditBlockedDay(d)}
                className={styles.blockedDayItem}
              >
                <strong>{safeFormat(d.fecha, "dd/MM/yyyy")}</strong>: {d.motivo}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ModalCustom
        isOpen={showModal}
        onHide={toggleModal}
        title={`${
          diasBloquearAgenda.length > 0
          ? `Bloquear días para el mes de ${safeFormat(diasBloquearAgenda[0], "MMMM", { locale: es })}`
          : "Bloquear días"}
        `}
      >
        <FormularioBloquearAgenda
          diasBloquearAgenda={diasBloquearAgenda}
          ubicaciones={ubicaciones}
          formData={formData}
          setFormData={setFormData}
          onCancelar={toggleModal}
          onGuardar={handleSave}
        />
      </ModalCustom>
    </div>
  );
}