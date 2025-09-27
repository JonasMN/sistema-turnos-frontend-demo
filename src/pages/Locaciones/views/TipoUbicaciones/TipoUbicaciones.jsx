import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from "./TipoUbicaciones.module.scss";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import FadeInFlex from "../../../../components/FadeInFlex/FadeInFlex.jsx";
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioTipoUbicacion = lazy(() => import("./components/FormularioTipoUbicacion.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

// COMENTADO - USAR MOCKS
// import getTipoUbicaciones from "../../../../services/tipoUbicaciones/getTipoUbicaciones.js";
// import postTipoUbicaciones from "../../../../services/tipoUbicaciones/postTipoUbicaciones.js";
// import putTipoUbicaciones from "../../../../services/tipoUbicaciones/putTipoUbicaciones.js";
// import deleteTipoUbicacion from "../../../../services/tipoUbicaciones/deleteTipoUbicacion.js";
import { useTipoUbicaciones } from "../../../../hooks/useMockData.js";
import useModal from "../../../../hooks/useModal.jsx";
import generarColumnas from "../../../../utils/generarColumnas.js";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function TipoUbicaciones() {
  const { data: tipoUbicaciones, loading: isLoading, getAll, create, update, remove } = useTipoUbicaciones();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showModal, toggleModal] = useModal();
  const [tipoUbicacionSeleccionada, setTipoUbicacionSeleccionada] = useState(null);
  const [page, setPage] = useState(1)
  function handlePageChange(newPage) {
    setPage(newPage)
    getAll()
  }
  useEffect(() => { getAll(); }, [getAll]);

  const handleCrear = () => {
    setTipoUbicacionSeleccionada(null);
    toggleModal();
  };

  const handleEditar = (tipoUbicacion) => {
    setTipoUbicacionSeleccionada(tipoUbicacion);
    toggleModal();
  };

  const handleDeleteClick = async (tipoUbicacion) => {
    setTipoUbicacionSeleccionada(tipoUbicacion);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!tipoUbicacionSeleccionada) return;
      await remove(tipoUbicacionSeleccionada.id);
      toast.success("Eliminado exitosamente");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setConfirmOpen(false);
      setTipoUbicacionSeleccionada(null);
    }
  };

  const handleGuardar = async (datosTipoUbicacion) => {
    try {
      if (tipoUbicacionSeleccionada) {
        await update(tipoUbicacionSeleccionada.id, datosTipoUbicacion);
        toast.success("Modificado exitosamente");
      } else {
        await create(datosTipoUbicacion);
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
    ],
    {
      onEdit: handleEditar,
      onDelete: handleDeleteClick,
    }
  );

  return (
    <>
      <EntityManager
        title="Tipo ubicaciones (DEMO)"
        data={tipoUbicaciones}
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
          title={
            tipoUbicacionSeleccionada
              ? "Editar Tipo Ubicación"
              : "Crear Tipo Ubicación"
          }
          modalFooter={false}
        >
          <FormularioTipoUbicacion
            tipoUbicacion={tipoUbicacionSeleccionada}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
          />
        </ModalCustom>

        {confirmOpen && (
          <ConfirmDialog
            open={confirmOpen}
            title="Eliminar tipo ubicación"
            message={`¿Estás seguro de eliminar el tipo ubicación "${tipoUbicacionSeleccionada?.nombre}"?`}
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
}
