import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import style from "./ModalCustom.module.scss";
import { X } from 'lucide-react';

const ModalCustom = ({
  isOpen = true,
  title,
  children,
  onHide,
  componentClassName = "",
  modalFooter,
  size = "lg",
  bodyClassName = "",
  centered,
  dialogClassName = "",
  icon = "",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      className={`${style.modal} ${componentClassName}`}
      size={size}
      show={isOpen}
      onHide={onHide}
      centered={centered}
      dialogClassName={style.dialog50}
    >
      <ModalHeader className={style["modal-header"]}>
        <div className="d-flex flex-row gap-1 align-center">
          {/* {icon && <i className={`bi ${icon}`}></i>} */}
          <ModalTitle className={style["modal-title"]}>{title}</ModalTitle>
        </div>
        {/* <i
          className={`bi bi-x ${style.closeBtn}`}
          onClick={onHide}
        ></i> */}
        <X className={style.closeBtn} onClick={onHide} />
      </ModalHeader>
      <ModalBody className={`${style["modal-body"]} ${bodyClassName}`}>
        {children}
      </ModalBody>
      {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
    </Modal>
  );
};

export default ModalCustom;

/*
  |-------------------------------------------|
  |SE USA EN CONJUNTO CON EL HOOK USEMODAL(); |
  |-------------------------------------------|

  const [editModal, setEditModal] = useModal();

      <ModalCustom
        size='xl' posibles valores -> sm lg xl
        isOpen={editModal} -> boolean
        onHide={setEditModal} -> toggle del boolean
        title='Editar componente'
        modalFooter={
        <div className='d-flex dflex flex-row gap-1'>
          <PrimaryButton
            color='var(--green)'
          >
            editar
          </PrimaryButton>
          <PrimaryButton
            color='var(--orange)'
          >
            Guardar
          </PrimaryButton>
        </div>
        }
      >
        Contenido del body
      </ModalCustom>
*/
