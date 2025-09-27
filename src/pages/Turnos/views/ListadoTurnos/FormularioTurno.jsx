import { useEffect, useState } from "react";
import Select from "../../../../components/Select/Select.jsx";
import FormularioBase from "../../../../components/FormularioBase/FormularioBase.jsx";
import { toast } from "react-toastify";
import styles from "../../Turnos.module.scss";
import { Save } from "lucide-react";

const FormularioTurno = ({ estado,estadosOptions, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    id_estado: "",
  });

  const validarFormulario = (formData) => {
    if (!formData.id_estado) {
      return "Debe seleccionar un estado.";
    }

    return null;
  };

  useEffect(() => {
    if (estado) {
      setFormData(estado);
    }
  }, []);

  const handleSetData = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajeError = validarFormulario(formData);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    if (!formData.id_estado) return;

    const datos = {
      estado: formData.id_estado,
    };
    onGuardar(datos);
  };

  return (
    <FormularioBase onSubmit={handleSubmit} onCancel={onCancelar}>
        <Select
          label="Estados"
          name="id_estado"
          value={formData.id_estado}
          onChange={handleSetData}
          options={estadosOptions ? [...estadosOptions.filter((o) => o.value !== 9)] : []}
          required
        />
    </FormularioBase>
  );
};

export default FormularioTurno;
