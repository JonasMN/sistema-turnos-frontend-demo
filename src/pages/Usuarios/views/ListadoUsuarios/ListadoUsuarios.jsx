import React, { lazy, Suspense, useState, useEffect  } from 'react'
import ModalCustom from "../../../../components/ModalCustom/ModalCustom.jsx";
import EntityManager from "../../../../components/EntityManager/EntityManager.jsx";
import Loader from "../../../../components/Loader/Loader.jsx";
import Button from "../../../../components/Button/Button.jsx";
import Table from "../../../../components/Table/Table.jsx";

const FormularioUsuario = lazy(() => import("./components/FormularioUsuario.jsx"));
const ConfirmDialog = lazy(() => import("../../../../components/ConfirmDialog/ConfirmDialog.jsx"));

// MODO DEMO: Usar mocks en lugar de servicios reales
import { useUsuarios } from "../../../../hooks/mocks/useUsuarios.js";
import { usePerfiles } from "../../../../hooks/mocks/usePerfiles.js";
import generarColumnas from "../../../../utils/generarColumnas.js";
import useModal from "../../../../hooks/useModal.jsx";
import { toast } from "react-toastify";
import styles from "../../Usuarios.module.scss";
import { Plus } from "lucide-react";

export default function ListadoUsuarios() {
    // MODO DEMO: Usar hooks mock
    const {
        usuarios,
        usuariosData,
        isLoading: usuariosLoading,
        getAll: getAllUsuarios,
        create: createUsuario,
        update: updateUsuario,
        remove: removeUsuario,
        blanquearPassword: blanquearPasswordUsuario
    } = useUsuarios();
    
    const {
        perfiles: perfilesData,
        isLoading: perfilesLoading,
        getAll: getAllPerfiles
    } = usePerfiles();
    
    const [showModal, toggleModal] = useModal();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [idBlanqueoPassword, setIdBlanqueoPassword] = useState(null);
    const [perfiles, setPerfiles] = useState([]);
    
    const isLoading = usuariosLoading || perfilesLoading;


    const getAndSetPerfiles = async () => {
        try {
            // MODO DEMO: Usar hook mock de perfiles
            const { data, error } = await getAllPerfiles();
            if (error || !data?.resultados) {
                toast.error(error || 'Error al cargar perfiles', { position: "top-right" });
                setPerfiles([]);
                return;
            }
            const options = data.resultados.map((perfil) => ({
                label: perfil.nombre,
                value: perfil.idPerfil
            }));
            setPerfiles(options);
        } catch (err) {
            console.error("error al traer los perfiles: ", err.message);
            setPerfiles([]);
        }
    };
    const getAndSet = async () => {
        try {
            // MODO DEMO: Los usuarios ya se cargan automáticamente desde el hook
            // Solo necesitamos forzar una actualización si es necesario
            await getAllUsuarios();
        } catch (err) {
            console.error("error al traer los usuarios: ", err.message);
            toast.error("Error al cargar usuarios", { position: "top-right" });
        }
    };

    useEffect(() => {
        getAndSet();
        getAndSetPerfiles();
    }, []);

    useEffect(() => {
        const resetPassword = async () => {
          if (!idBlanqueoPassword) return;
          try {
            // MODO DEMO: Usar hook mock para blanquear password
            const response = await blanquearPasswordUsuario(idBlanqueoPassword);
            if (response.error || response.data?.estado === 0) {
              toast.error(response.error || response.data?.mensaje || "Ocurrió un error al restablecer.", { position: "top-right" });
              return;
            }
            toast.success(response.data?.mensaje || 'Acción ejecutada exitosamente');
          } catch (err) {
            console.error("Error al restablecer contraseña:", err.message);
            toast.error("Error al restablecer contraseña", { position: "top-right" });
          } finally {
            setIdBlanqueoPassword(null);
          }
        };
      
        resetPassword();
      }, [idBlanqueoPassword, blanquearPasswordUsuario]);
      

    const handleCrear = () => {
        setUsuarioSeleccionado(null);
        toggleModal();
    };

    const handleEditar = (usuarios) => {
        setUsuarioSeleccionado(usuarios);
        toggleModal();
    };

    const handleDeleteClick = async (usuarios) => {
        setUsuarioSeleccionado(usuarios);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!usuarioSeleccionado) return;
            // MODO DEMO: Usar hook mock para eliminar
            const response = await removeUsuario(usuarioSeleccionado.id);
            if (response.error) {
                toast.error(response.error || "Ocurrio un error al eliminar.", { position: "top-right" });
                return;
            }
            toast.success("Eliminado exitosamente");
        } catch (err) {
            console.error("Error al eliminar:", err.message);
            toast.error("Error al eliminar usuario", { position: "top-right" });
        } finally {
            setConfirmOpen(false);
            setUsuarioSeleccionado(null);
        }
    };


    const handleGuardar = async (datosUsuarios) => {
        try {
            let response;
            if (usuarioSeleccionado) {
                // MODO DEMO: Actualizar usuario existente
                response = await updateUsuario(usuarioSeleccionado.id, {
                    ...datosUsuarios,
                    usuario_creacion: 1
                });
                if (response.error) {
                    toast.error(response.error || "Ocurrio un error al guardar.", { position: "top-right" });
                    return;
                }
                toast.success("Modificado exitosamente");
            } else {
                // MODO DEMO: Crear nuevo usuario
                response = await createUsuario(datosUsuarios);
                if (response.error || response.data?.statusCode !== 201) {
                    toast.error(response.error || "No se pudo registrar el usuario. Inténtalo de nuevo.", { position: "top-right" });
                    return;
                }
                toast.success("El usuario fué registrado.");
            }
            toggleModal();
        } catch (err) {
            console.error("Error al guardar el usuario:", err.message);
            toast.error("Error al guardar usuario", { position: "top-right" });
        }
    };

    const columns = generarColumnas(
      [
        { header: "Nombre/s", column: "name", center: true },
        { header: "Apellido/s", column: "surname", center: true },
        { header: "Correo", column: "email", center: true },
        {
          header: "Perfil",
          column: "perfil",
          center: true,
          customCell: (row) => {
            return <p>{row?.perfiles?.map((p) => p.nombre).join(', ') || ''}</p>
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
        {isLoading && <Loader />}
        
        <div className={styles.header}>
          <h2 className={styles.titulo}>Listado de Usuarios</h2>
          <Button
            onClick={handleCrear}
            variant="primary"
            size="medium"
            icon={Plus}
            iconPosition="left"
          ></Button>
        </div>

        <Table
          data={usuariosData}
          columns={columns}
          id="id"
          tableOverflow="true"
          pagination={true}
        />

        <Suspense fallback={<Loader />}>
          <ModalCustom
            isOpen={showModal}
            onHide={toggleModal}
            title={usuarioSeleccionado ? "Editar usuario" : "Crear usuario"}
            modalFooter={false}
          >
            <FormularioUsuario
              usuarios={usuarioSeleccionado}
              perfiles={perfiles}
              onGuardar={handleGuardar}
              onCancelar={toggleModal}
              setIdBlanqueoPassword={setIdBlanqueoPassword}
            />
          </ModalCustom>

          {confirmOpen && (
            <ConfirmDialog
              open={confirmOpen}
              title="Eliminar usuario"
              message={`¿Estás seguro de eliminar el usuario "${usuarioSeleccionado?.name}"?`}
              onConfirm={handleConfirmDelete}
              onCancel={() => setConfirmOpen(false)}
            />
          )}
        </Suspense>
      </>
    );
}
