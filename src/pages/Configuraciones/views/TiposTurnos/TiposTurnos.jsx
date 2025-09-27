import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from "./TiposTurnos.module.scss";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import FadeInFlex from "../../../../components/FadeInFlex/FadeInFlex.jsx";
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioTipoTurnos = lazy(() => import("./components/FormularioTipoTurnos.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

// COMENTADO - USAR MOCKS
// import getTipoTurnos from "../../../../services/tipoTurnos/getTipoTurnos.js";
// import postTipoTurnos from "../../../../services/tipoTurnos/postTipoTurnos.js";
// import putTipoTurnos from "../../../../services/tipoTurnos/putTipoTurnos.js";
// import deleteTipoTurnos from "../../../../services/tipoTurnos/deleteTipoTurnos.js";
import { useTiposTurnos } from "../../../../hooks/useMockData.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import { Plus } from "lucide-react";
import useModal from "../../../../hooks/useModal.jsx";
import { toast } from "react-toastify";

export default function TiposTurnos() {
  const { data: tiposTurnos, loading: isLoading, getAll, create, update, remove } = useTiposTurnos();
  const [showModal, toggleModal] = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tipoTurnoSeleccionado, setTipoTurnoSeleccionado] = useState(null);
  const [page, setPage] = useState(1)
  function handlePageChange(newPage) {
    setPage(newPage)
    getAll()
  }
  useEffect(() => { getAll(); }, [getAll]);

  const handleCrear = () => {
    setTipoTurnoSeleccionado(null);
    toggleModal();
  };

  const handleEditar = (tipoTurno) => {
    setTipoTurnoSeleccionado(tipoTurno);
    toggleModal();
  };

  const handleDeleteClick = async (tipoTurno) => {
    setTipoTurnoSeleccionado(tipoTurno);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!tipoTurnoSeleccionado) return;
      await remove(tipoTurnoSeleccionado.id);
      toast.success("Eliminado exitosamente");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setConfirmOpen(false);
      setTipoTurnoSeleccionado(null);
    }
  };

  const handleGuardar = async (datosTipoTurnos) => {
    try {
      if (tipoTurnoSeleccionado) {
        await update(tipoTurnoSeleccionado.id, datosTipoTurnos);
        toast.success("Modificado exitosamente");
      } else {
        await create(datosTipoTurnos);
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
        title="Tipo de turnos"
        data={tiposTurnos}
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
            tipoTurnoSeleccionado ? "Editar Tipo turnos" : "Crear Tipo turnos"
          }
          modalFooter={false}
        >
          <FormularioTipoTurnos
            tipoTurnos={tipoTurnoSeleccionado}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
            setTipoTurnoSeleccionado={setTipoTurnoSeleccionado}
          />
        </ModalCustom>

        <ConfirmDialog
          open={confirmOpen}
          title="Eliminar tipo de turno"
          message={`¿Estás seguro de eliminar el tipo de turno "${tipoTurnoSeleccionado?.nombre}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Suspense>
    </>
  );
}
