import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from "./TiposVehiculos.module.scss";
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import FadeInFlex from "../../../../components/FadeInFlex/FadeInFlex.jsx";
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";

const FormularioTipoVehiculos = lazy(() => import("./components/FormularioTipoVehiculos.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

// COMENTADO PARA MODO DEMO - USAR HOOK PERSONALIZADO EN SU LUGAR
// import getTipoVehiculos from "../../../../services/tipoVehiculos/getTipoVehiculos.js";
// import postTipoVehiculos from "../../../../services/tipoVehiculos/postTipoVehiculos.js";
// import putTipoVehiculos from "../../../../services/tipoVehiculos/putTipoVehiculos.js";
// import deleteTipoVehiculos from "../../../../services/tipoVehiculos/deleteTipoVehiculos.js";
import { useTiposVehiculos } from "../../../../hooks/useMockData.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import { Plus } from "lucide-react";
import useModal from "../../../../hooks/useModal.jsx";
import { toast } from "react-toastify";

export default function TiposVehiculos() {
  // MODO DEMO: Usar hook personalizado
  const { 
    data: tiposVehiculos, 
    loading: isLoading, 
    error,
    getAll,
    create,
    update,
    remove 
  } = useTiposVehiculos();

  const [showModal, toggleModal] = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tipoVehiculosSeleccionado, setTipoVehiculosSeleccionado] = useState(null);


  // MODO DEMO: Cargar datos al montar el componente
  useEffect(() => {
    getAll();
  }, [getAll]);

  // MODO DEMO: Mostrar errores si los hay
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [error]);

  const handleCrear = () => {
    setTipoVehiculosSeleccionado(null);
    toggleModal();
  };

  const handleEditar = (tipoVehiculos) => {
    setTipoVehiculosSeleccionado(tipoVehiculos);
    toggleModal();
  };

  const handleDeleteClick = async (tipoVehiculos) => {
    setTipoVehiculosSeleccionado(tipoVehiculos);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!tipoVehiculosSeleccionado) return;
      
      // MODO DEMO: Simplificado - Solo llamar al método remove
      await remove(tipoVehiculosSeleccionado.id);
      toast.success("Eliminado exitosamente");
      
    } catch (err) {
      toast.error("Error al eliminar: " + err.message);
    } finally {
      setConfirmOpen(false);
      setTipoVehiculosSeleccionado(null);
    }
  };


  const handleGuardar = async (datosTipoVehiculos) => {
    try {
      if (tipoVehiculosSeleccionado) {
        // MODO DEMO: Simplificado - Actualizar existente
        await update(tipoVehiculosSeleccionado.id, datosTipoVehiculos);
        toast.success("Modificado exitosamente");
      } else {
        // MODO DEMO: Simplificado - Crear nuevo
        await create({
          ...datosTipoVehiculos,
          usuario_creacion: 1,
          id_empresa: 1,
        });
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
        title="Tipo de vehiculos (DEMO)"
        data={tiposVehiculos}
        columns={columns}
        isLoading={isLoading}
        onCrear={handleCrear}
        // Nota: Se removió la paginación para simplicidad
      />
      <Suspense fallback={<Loader />}>
        <ModalCustom
          isOpen={showModal}
          onHide={toggleModal}
          title={
            tipoVehiculosSeleccionado
              ? "Editar Tipo vehiculos"
              : "Crear Tipo vehiculos"
          }
          modalFooter={false}
        >
          <FormularioTipoVehiculos
            tipoVehiculos={tipoVehiculosSeleccionado}
            onGuardar={handleGuardar}
            onCancelar={toggleModal}
          />
        </ModalCustom>

        <ConfirmDialog
          open={confirmOpen}
          title="Eliminar tipo de vehiculo"
          message={`¿Estás seguro de eliminar el tipo de vehiculo "${tipoVehiculosSeleccionado?.nombre}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </Suspense>
    </>
  );
}
