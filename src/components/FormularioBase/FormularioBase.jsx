import Button from '../Button/Button.jsx';
import styles from "./FormularioBase.module.scss";
import { Save, X } from 'lucide-react';

export default function FormularioBase({ onSubmit, onCancel, children, extraButtons  }) {
  return (
    <form onSubmit={onSubmit} className={styles.formularioBase}>
      {children}

      <div className="d-flex justify-content-end gap-2">
        {extraButtons}

        <Button
          type="button"
          variant="secondary"
          size="medium"
          icon={X}
          iconPosition="left"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="medium"
          icon={Save}
          iconPosition="left"
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
