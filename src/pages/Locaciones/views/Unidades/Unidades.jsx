import React, { useState, useEffect, lazy, Suspense } from "react";
import styles from "./Unidades.module.scss";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import FadeInFlex from "../../../../components/FadeInFlex/FadeInFlex.jsx";
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioUnidad = lazy(() => import("./components/FormularioUnidad.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

// COMENTADO - USAR MOCKS
// import getUnidadesPorEmpresa from "../../../../services/unidades/getUnidadesPorEmpresa.js";
// import getUbicacionesPorUnidad from "../../../../services/ubicaciones/getUbicacionesPorUnidad.js";
// import postUnidad from "../../../../services/unidades/postUnidad.js";
// import putUnidad from "../../../../services/unidades/putUnidad.js";
// import deleteUnidad from "../../../../services/unidades/deleteUnidad.js";
import { toast } from "react-toastify";
import useModal from "../../../../hooks/useModal.jsx";
import generarColumnas from "../../../../utils/generarColumnas.js";
import { useUnidades } from "../../../../hooks/useMockData.js";
import { CloudCog } from "lucide-react";

export default function Unidades() {
  const { data: unidades, loading: isLoading, getAll, create, update, remove } = useUnidades();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showModal, toggleModal] = useModal();
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [page, setPage] = useState(1)
  function handlePageChange(newPage) {
    setPage(newPage)
    getAll()
  }

  useEffect(() => {
    getAll(); 
  }, []);

  const handleCrear = () => {
    setUnidadSeleccionada(null);
    toggleModal();
  };

  const handleEditar = (unidad) => {
    setUnidadSeleccionada(unidad);
    toggleModal();
  };

  const handleDeleteClick = async (unidad) => {
    // MODO DEMO: Simplificado - no verificar ubicaciones
    setConfirmMessage(`¿Estás seguro de eliminar "${unidad.nombre}"?`);
    setUnidadSeleccionada(unidad);
    setConfirmOpen(true);
  };

  const handleGuardar = async (datosUnidad) => {
    try {
      if (unidadSeleccionada) {
        await update(unidadSeleccionada.id, datosUnidad);
        toast.success("Modificado exitosamente");
      } else {
        await create(datosUnidad);
        toast.success("Creado exitosamente");
      }
      toggleModal();
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!unidadSeleccionada) return;
      await remove(unidadSeleccionada.id);
      toast.success("Eliminado exitosamente");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setConfirmOpen(false);
      setUnidadSeleccionada(null);
    }
  };

  const columns = generarColumnas(
    [
      { header: "Nombre", column: "nombre", center: true },
      {
        header: "Dirección",
        column: "direccion",
        center: true,
        customCell: (row) => {
          return <p>{row?.direccion?.direccion_formateada || ''}</p>
        },
      },
      { header: "Teléfono", column: "telefono", center: true },
    ],
    {
      onEdit: handleEditar,
      onDelete: handleDeleteClick,
    }
  );

  return (
    <>
      <EntityManager
        title="Unidades"
        columns={columns}
        onCrear={handleCrear}
        isLoading={isLoading}
        data={unidades}
        page={page}
        handlePageChange={handlePageChange}
      />

      <Suspense fallback={<Loader />}>
        <ModalCustom
          isOpen={showModal}
          onHide={toggleModal}
          title={unidadSeleccionada ? "Editar Unidad" : "Crear Unidad"}
          modalFooter={false}
        >
          <FormularioUnidad
            unidad={unidadSeleccionada}
            unidades={unidades}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
          />
        </ModalCustom>

        {confirmOpen && (
          <ConfirmDialog
            open={confirmOpen}
            title="Eliminar Unidad"
            message={confirmMessage}
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
  
}
