import React from "react";
import ModalCustom from "../../components/ModalCustom/ModalCustom.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./ConfirmDialog.module.scss";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <ModalCustom
      isOpen={open}
      onHide={onCancel}
      title={title || "Confirmación"}
      modalFooter={false}
      size={"md"}
    >
      <div className={styles.confirmBody || "d-flex flex-column gap-3"}>
        <p>{message || "¿Estás seguro?"}</p>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" size="medium" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="primary" size="medium" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </ModalCustom>
  );
}
