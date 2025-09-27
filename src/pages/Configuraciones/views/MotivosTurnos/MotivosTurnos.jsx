import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from './MotivosTurnos.module.scss';
import ModalCustom from '../../../../components/ModalCustom/ModalCustom.jsx';
import FadeInFlex from '../../../../components/FadeInFlex/FadeInFlex.jsx';
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioMotivosTurnos = lazy(() => import("./components/FormularioMotivosTurnos.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

// COMENTADO - USAR MOCKS
// import getMotivoTurnos from '../../../../services/motivoTurnos/getMotivoTurnos.js';
// import postMotivoTurnos from '../../../../services/motivoTurnos/postMotivoTurnos.js';
// import putMotivoTurnos from '../../../../services/motivoTurnos/putMotivoTurnos.js';
// import deleteMotivoTurnos from "../../../../services/motivoTurnos/deleteMotivoTurnos.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import useModal from "../../../../hooks/useModal.jsx";
import { Plus } from 'lucide-react';
import { toast } from "react-toastify";
import { useMotivosTurnos } from "../../../../hooks/useMockData.js";

export default function MotivosTurnos() {
  const { data: motivoTurnos, loading: isLoading, getAll, create, update, remove } = useMotivosTurnos();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showModal, toggleModal] = useModal();
  const [motivosTurnoSeleccionado, setMotivoTurnoSeleccionado] = useState(null);
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    getAll();
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleCrear = () => {
    setMotivoTurnoSeleccionado(null);
    toggleModal();
  };

  const handleEditar = (motivoTurno) => {
    setMotivoTurnoSeleccionado(motivoTurno);
    toggleModal();
  };

  const handleDeleteClick = async (motivoTurno) => {
    setMotivoTurnoSeleccionado(motivoTurno);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!motivosTurnoSeleccionado) return;
      await remove(motivosTurnoSeleccionado.id);
      toast.success("Eliminado exitosamente");
      setPage(1);
    } catch (err) {
      toast.error("Error al eliminar: " + err.message);
    } finally {
      setConfirmOpen(false);
      setMotivoTurnoSeleccionado(null);
    }
  };

  const handleGuardar = async (datosMotivoTurnos) => {
    try {
      if (motivosTurnoSeleccionado) {
        await update(motivosTurnoSeleccionado.id, datosMotivoTurnos);
        toast.success("Modificado exitosamente");
      } else {
        await create(datosMotivoTurnos);
        toast.success("Creado exitosamente");
      }
      toggleModal();
    } catch (err) {
      toast.error("Error al guardar: " + err.message);
    }
  };

  const columns = generarColumnas(
    [
      { header: "Nombre", column: "nombre", center: true },
      { header: "Descripción", column: "descripcion", center: true },
    ],
    {
      onEdit: handleEditar,
      onDelete: handleDeleteClick,
    }
  );

  return (
    <>
      <EntityManager
        title="Motivo de turnos"
        data={motivoTurnos}
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
            motivosTurnoSeleccionado
              ? "Editar motivo de turnos"
              : "Crear motivo de turnos"
          }
          modalFooter={false}
        >
          <FormularioMotivosTurnos
            motivosTurnos={motivosTurnoSeleccionado}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
          />
        </ModalCustom>

        <ConfirmDialog
          open={confirmOpen}
          title="Eliminar motivo de turno"
          message={`¿Estás seguro de eliminar el motivo de turno "${motivosTurnoSeleccionado?.nombre}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Suspense>
    </>
  );
}

