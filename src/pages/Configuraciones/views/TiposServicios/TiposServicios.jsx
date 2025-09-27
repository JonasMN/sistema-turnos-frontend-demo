import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from './TiposServicios.module.scss';
import ModalCustom from '../../../../components/ModalCustom/ModalCustom.jsx';
import FadeInFlex from '../../../../components/FadeInFlex/FadeInFlex.jsx';
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioTipoServicios = lazy(() => import("./components/FormularioTipoServicios.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));
// COMENTADO - USAR MOCKS
// import getTipoServicios from "../../../../services/tipoServicios/getTipoServicios.js";
// import postTipoServicios from "../../../../services/tipoServicios/postTipoServicios.js";
// import putTipoServicios from "../../../../services/tipoServicios/putTipoServicios.js";
// import deleteTipoServicios from "../../../../services/tipoServicios/deleteTipoServicios.js";
import { useTiposServicios } from "../../../../hooks/useMockData.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import useModal from "../../../../hooks/useModal.jsx";
import { Plus } from 'lucide-react';
import { toast } from "react-toastify";

export default function TiposServicios() {
  const { data: tiposServicios, loading: isLoading, getAll, create, update, remove } = useTiposServicios();
  const [showModal, toggleModal] = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tipoServiciosSeleccionado, setTipoServiciosSeleccionado] = useState(null);

  useEffect(() => { getAll(); }, [getAll]);

  const handleCrear = () => {
    setTipoServiciosSeleccionado(null);
    toggleModal();
  };

  const handleEditar = (tipoServicios) => {
    setTipoServiciosSeleccionado(tipoServicios);
    toggleModal();
  };

  const handleDeleteClick = async (tipoServicios) => {
    setTipoServiciosSeleccionado(tipoServicios);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await remove(tipoServiciosSeleccionado.id);
      toast.success("Eliminado exitosamente");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setConfirmOpen(false);
      setTipoServiciosSeleccionado(null);
    }
  };

  const handleGuardar = async (datosTipoServicios) => {
    try {
      if (tipoServiciosSeleccionado) {
        await update(tipoServiciosSeleccionado.id, datosTipoServicios);
        toast.success("Modificado exitosamente");
      } else {
        await create(datosTipoServicios);
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
      { header: "Duración del tipo de servicio", column: "duracion_minutos", center: true, customCell: (row) => <span>{row.duracion_minutos} min</span>,    },
    ],
    {
      onEdit: handleEditar,
      onDelete: handleDeleteClick,
    }
  );

  return (
    <>
      <EntityManager
        title="Tipo de servicios (DEMO)"
        data={tiposServicios}
        columns={columns}
        isLoading={isLoading}
        onCrear={handleCrear}
      />
      <Suspense fallback={<Loader />}>
        <ModalCustom
          isOpen={showModal}
          onHide={toggleModal}
          title={
            tipoServiciosSeleccionado
              ? "Editar Tipo de servicio"
              : "Crear Tipo de servicio"
          }
          modalFooter={false}
        >
          <FormularioTipoServicios
            tipoServicios={tipoServiciosSeleccionado}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
          />
        </ModalCustom>

        <ConfirmDialog
          open={confirmOpen}
          title="Eliminar tipo de servicio"
          message={`¿Estás seguro de eliminar el tipo de servicio "${tipoServiciosSeleccionado?.nombre}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Suspense>
    </>
  );
}

