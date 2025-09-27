import { useEffect, useState, lazy, Suspense } from "react";
import { Eye, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader/Loader.jsx";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import Table from '../../../../components/Table/Table.jsx';

const FormularioTurno = lazy(() => import("./FormularioTurno.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

import useModal from "../../../../hooks/useModal.jsx";
// COMENTADO - USAR MOCKS
// import getEstadosTurnos from "../../../../services/turnos/getEstadosTurnos.js";
// import getTurnos from "../../../../services/turnos/getTurnos.js";
// import postCancelarTurno from "../../../../services/turnos/postCancelarTurno.js";
// import putEstadoTurno from "../../../../services/turnos/putEstadoTurno.js";
// import getUbicacionesPorUnidad from "../../../../services/ubicaciones/getUbicacionesPorUnidad.js";
// import getUnidadesPorEmpresa from "../../../../services/unidades/getUnidadesPorEmpresa.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import { useTurnos, useEstadosTurnos } from "../../../../hooks/useMockData.js";
import styles from "../../Turnos.module.scss";
import FiltrosTurnos from "./FiltrosTurnos";

export default function ListadoTurnos() {
  const { data: turnosData, loading: turnosLoading, getAll: getAllTurnos, update: updateTurno } = useTurnos();
  const { data: estadosData, loading: estadosLoading, getAll: getAllEstados } = useEstadosTurnos();
  
  const [filtros, setFiltros] = useState({
    unidad: "",
    ubicacion: "",
    fecha_desde: "",
    fecha_hasta: ""
  });
  const [modalType, setModalType] = useState(null);
  const [showModal, toggleModal] = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState([]);
  const [estados, setEstados] = useState([]);
  const [turnos, setTurnos] = useState({ pagina: 1, paginas: 1, total: 0, resultados: [] });
  const [page, setPage] = useState(1);
  
  const isLoading = turnosLoading || estadosLoading;

  const idEstadoCancelado = 9

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "unidad" && { ubicacion: null }), 
    }));
  };
  

  const onFiltrar = async (datos = filtros, newPage = 1) => {
    try {
      // Asegurarse de que tenemos los datos más recientes
      if (!turnosData || !turnosData.resultados) {
        await getAllTurnos();
        return;
      }
      
      // MODO DEMO: Filtrado básico por unidad, ubicación y fechas
      let turnosFiltrados = [...turnosData.resultados];
      
      console.log('Turnos originales:', turnosFiltrados.length);
      console.log('Filtros aplicados:', datos);
      
      if (datos.unidad?.id) {
        turnosFiltrados = turnosFiltrados.filter(turno => turno.id_unidad === datos.unidad.id);
        console.log('Después de filtrar por unidad:', turnosFiltrados.length);
      }
      
      if (datos.ubicacion?.id) {
        turnosFiltrados = turnosFiltrados.filter(turno => turno.id_ubicacion === datos.ubicacion.id);
        console.log('Después de filtrar por ubicación:', turnosFiltrados.length);
      }
      
      if (datos.fecha_desde) {
        turnosFiltrados = turnosFiltrados.filter(turno => turno.fecha >= datos.fecha_desde);
        console.log('Después de filtrar por fecha desde:', turnosFiltrados.length);
      }
      
      if (datos.fecha_hasta) {
        turnosFiltrados = turnosFiltrados.filter(turno => turno.fecha <= datos.fecha_hasta);
        console.log('Después de filtrar por fecha hasta:', turnosFiltrados.length);
      }
      
      // Simular estructura de paginación
      const paginatedData = {
        pagina: newPage,
        paginas: Math.ceil(turnosFiltrados.length / 10),
        total: turnosFiltrados.length,
        resultados: turnosFiltrados
      };
      
      console.log('Datos paginados finales:', paginatedData);
      setTurnos(paginatedData);
      
      if (turnosFiltrados.length === 0) {
        toast.warning("No hay turnos disponibles para los filtros seleccionados", { position: "top-right" });
      }
    } catch (err) {
      toast.error("Error al obtener turnos: " + err.message);
      console.error('Error en onFiltrar:', err);
    }
  };

  function handlePageChange(newPage) {
    setPage(newPage)
    onFiltrar(filtros, newPage)
  }

  useEffect(() => {
    const cargarEstadosTurnos = async () => {
      try {
        await getAllEstados();
        if (estadosData?.resultados) {
          const options = estadosData.resultados.map((estado) => ({
            value: estado.id,
            label: estado.nombre,
          }));
          setEstados(options);
        }
      } catch (err) {
        toast.error("Error al cargar los estados: " + err.message);
      }
    };
    cargarEstadosTurnos();
  }, [estadosData]);
  
  useEffect(() => {
    getAllTurnos();
    getAllEstados();
  }, []);
  
  // Cargar turnos inicialmente cuando lleguen los datos
  useEffect(() => {
    if (turnosData && turnosData.resultados && turnosData.resultados.length > 0) {
      setTurnos(turnosData);
      console.log('Turnos cargados inicialmente:', turnosData);
    }
  }, [turnosData]);

  const handleInfo = (turno) => {
    setTurnoSeleccionado(turno);
    setModalType("info");
    toggleModal();
  };

  const handleCancelar = (turno) => {
    setConfirmMessage(`¿Está seguro de que desea cancelar el turno?`);
    setTurnoSeleccionado(turno);
    setConfirmOpen(true);
  };


  const handleConfirmDelete = async () => {
    try {
      if (!turnoSeleccionado) return;
      
      // MODO DEMO: Simular cancelación cambiando estado a "Cancelado"
      await updateTurno(turnoSeleccionado.id, {
        ...turnoSeleccionado,
        estado: "Cancelado",
        nombre_estado: "Cancelado",
        id_estado: 4
      });
      
      toast.success("Turno cancelado exitosamente");
      onFiltrar(filtros, page);
    } catch (err) {
      toast.error("Error al cancelar: " + err.message);
    } finally {
      setConfirmOpen(false);
      setTurnoSeleccionado(null);
    }
  };

  const handleEdit = async (turno) => {
    setTurnoSeleccionado(turno)
    setModalType("edit");
    toggleModal();
  }

  const handleEstado = async (datos) => {
    try {
      // MODO DEMO: Actualizar estado del turno
      const estadoSeleccionado = estados.find(e => e.value === datos.id_estado);
      
      await updateTurno(turnoSeleccionado.id, {
        ...turnoSeleccionado,
        id_estado: datos.id_estado,
        nombre_estado: estadoSeleccionado?.label || 'Estado',
        estado: estadoSeleccionado?.label || 'Estado'
      });

      onFiltrar(filtros, page);
      toast.success("Estado actualizado correctamente.", { position: "top-right" });
    } catch (err) {
      toast.error("Error al actualizar el estado del turno: " + err.message);
    } finally {
      setTurnoSeleccionado(null);
      toggleModal();
    }
  }


  const formatHora = (hora) => (hora ? hora.substring(0, 5) : "");

  const formatFecha = (fecha) => {
    if (!fecha) return "-";

    try {
      const [year, month, day] = fecha.split("-");
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return fecha;
    }
  };
  const columns = generarColumnas(
    [
      {
        header: "Fecha", column: "fecha", center: true,
        customCell: (row) => `${formatFecha(row.fecha)}`,
      },
      {
        header: "Hora",
        column: "hora",
        center: true,
        customCell: (row) => row.hora || '-',
      },
      { header: "Cliente", column: "cliente", center: true },
      { header: "Vehículo", column: "vehiculo", center: true },
      { header: "Ubicación", column: "ubicacion", center: true },
      { header: "Tipo de servicio", column: "tipoServicio", center: true },
      { header: "Estado", column: "estado", center: true },
    ],
    {
      customActions: [
        {
          icon: Eye,
          variant: "info",
          onClick: handleInfo,
          label: "Ver detalle",
        },
        {
          icon: XCircle,
          variant: "secondary",
          onClick: handleCancelar,
          label: "Cancelar turno",
          disabled: (row) => row.estado === "Cancelado",
        },
      ],
      onEdit: handleEdit,
      disableEdit: (row) => row.estado === "Cancelado",
    }
  );

  return (
    <div className={styles.configWrapper}>
      {isLoading && <Loader />}

      <FiltrosTurnos
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
        onFiltrar={onFiltrar}
      />

      <div className={styles.header}>
        <h2 className={styles.titulo}>Listado de Turnos</h2>
      </div>
      <Table
        data={turnos}
        columns={columns}
        id="id"
        tableOverflow="true"
        pagination={true}
        page={page}
        handlePageChange={handlePageChange}
      />

      <Suspense fallback={<Loader />}>
        <ModalCustom
          isOpen={showModal}
          onHide={toggleModal}
          modalFooter={false}
          title={modalType == "edit" ? "Editar estado" : "Info"}
        >
          {modalType === "edit" && (
            <FormularioTurno
              estado={turnoSeleccionado}
              estadosOptions={estados}
              onGuardar={handleEstado}
              onCancelar={toggleModal}
            />
          )}
          {modalType === "info" && ""}
        </ModalCustom>

        {confirmOpen && (
          <ConfirmDialog
            open={confirmOpen}
            title="Cancelar turno"
            message={confirmMessage}
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
