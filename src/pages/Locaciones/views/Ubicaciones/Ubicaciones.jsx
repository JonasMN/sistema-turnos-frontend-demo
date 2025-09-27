import { Plus, Edit, ChevronDown  } from 'lucide-react';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { toast } from "react-toastify";
import ModalCustom from '../../../../components/ModalCustom/ModalCustom.jsx';
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import useModal from "../../../../hooks/useModal.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioUbicacion = lazy(() => import('./components/FormularioUbicacion.jsx'));
const ConfirmDialog = lazy(() => import('../../../../components/ConfirmDialog/ConfirmDialog.jsx'));

// COMENTADO - USAR MOCKS
// import getUbicacionesPorEmpresa from '../../../../services/ubicaciones/getUbicacionesPorEmpresa.js';
// import postUbicacion from '../../../../services/ubicaciones/postUbicacion.js';
// import putUbicacion from '../../../../services/ubicaciones/putUbicacion.js';
// import deleteUbicacion from "../../../../services/ubicaciones/deleteUbicacion.js";
import { useUbicaciones } from "../../../../hooks/useMockData.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import styles from './Ubicaciones.module.scss';

export default function Ubicaciones() {
  const { data: ubicaciones, loading: isLoading, getAll, create, update, remove } = useUbicaciones();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showModal, toggleModal] = useModal();
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [page, setPage] = useState(1)
  function handlePageChange(newPage) {
    setPage(newPage)
    getAll()
  }

  useEffect(() => { getAll(); }, [getAll]);

  const handleCrear = () => {
    setUbicacionSeleccionada(null);
    toggleModal();
  };

  const handleEditar = (ubicacion) => {
    setUbicacionSeleccionada(ubicacion);
    toggleModal();
  };

  const handleDeleteClick = async (ubicacion) => {
    setUbicacionSeleccionada(ubicacion);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!ubicacionSeleccionada) return;
      await remove(ubicacionSeleccionada.id);
      toast.success("Eliminado exitosamente");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setConfirmOpen(false);
      setUbicacionSeleccionada(null);
    }
  };

  const handleGuardar = async (datosUbicacion) => {
    try {
      if (ubicacionSeleccionada) {
        await update(ubicacionSeleccionada.id, datosUbicacion);
        toast.success("Modificado exitosamente");
      } else {
        await create(datosUbicacion);
        toast.success("Creado exitosamente");
      }
      toggleModal();
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

const columns = generarColumnas(
  [
    { header: "Nombre", column: "nombre", center: true },
    { header: "Descripción", column: "descripcion", center: true },
    {
      header: "Unidad",
      column: "unidad",
      center: true,
      customCell: (row) => {
        return <span>{row?.unidades ? row?.unidades.nombre : ""}</span>;
      },
    },
    {
      header: "Tipo de ubicación",
      column: "tipoUbicacion",
      center: true,
      customCell: (row) => {
        return <span>{row?.tipoUbicaciones ? row?.tipoUbicaciones.nombre : ""}</span>;
      },
    },
    {
      header: "Tipo de servicio",
      column: "tipo_servicio",
      center: true,
      customCell: (row) => {
        const nombres = row?.tipos_servicio?.map((tipo) => tipo?.nombre) || [];
        const visibles = nombres.slice(0, 1);
        const ocultos = nombres.slice(1);
      
        return (
          <div style={{ position: "relative", display: "inline-block"}}>
            <div>
              {visibles.map((nombre, i) => (
                <span key={i}>{nombre}</span>
              ))}
            </div>
      
            {ocultos.length > 0 && (
              <span className={styles.badgeWrapper}>
                +{ocultos.length}
                <span className={styles.tooltipContent}>
                  {nombres.join(", ")}
                </span>
              </span>
            )}
          </div>
        );
      }
      
    },    
    {
      header: "Tipo de vehiculo",
      column: "tipo_vehiculo",
      center: true,
      customCell: (row) => {
        const nombres = row?.tipos_vehiculo?.map((tipo) => tipo?.nombre) || [];
        const visibles = nombres.slice(0, 1);
        const ocultos = nombres.slice(1);
        return (
          <div style={{ position: "relative", display: "inline-block"}}>
            <div>
              {visibles.map((nombre, i) => (
                <span key={i}>{nombre}</span>
              ))}
            </div>
      
            {ocultos.length > 0 && (
              <span className={styles.badgeWrapper}>
                +{ocultos.length}
                <span className={styles.tooltipContent}>
                  {nombres.join(", ")}
                </span>
              </span>
            )}
          </div>
        );
      },
    },
  ],
  {
    onEdit: handleEditar,
    onDelete: handleDeleteClick,
  }
);


  return (
    <>
      <EntityManager
        title="Ubicaciones"
        data={ubicaciones}
        columns={columns}
        isLoading={isLoading}
        onCrear={handleCrear}
        page={page}
        handlePageChange={handlePageChange}
      />

      <Suspense fallback={<Loader />}>
        <ModalCustom
          isOpen={showModal}
          onHide={toggleModal}
          title={ubicacionSeleccionada ? "Editar Ubicacion" : "Crear Ubicacion"}
          modalFooter={false}
        >
          <FormularioUbicacion
            ubicacion={ubicacionSeleccionada}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
          />
        </ModalCustom>

        {confirmOpen && (
          <ConfirmDialog
            open={confirmOpen}
            title="Eliminar Ubicación"
            message={`¿Estás seguro de eliminar la ubicación "${ubicacionSeleccionada?.nombre}"?`}
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
}

