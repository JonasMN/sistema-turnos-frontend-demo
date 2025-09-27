import { useEffect, useState } from "react";
import Toggle from "../../../../../components/Toggle/Toggle";
import Button from "../../../../../components/Button/Button.jsx";
import FormField from "../../../../../components/FormField/FormField.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import { EMPRESAS_OPTIONS } from "../../../constants.js";
import { Save, X } from "lucide-react";

const FormularioTipoTurnos = ({
  tipoTurnos,
  onGuardar,
  onCancelar,
  setTipoTurnoSeleccionado,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (tipoTurnos) {
      setFormData(tipoTurnos);
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

    if (formData.nombre.trim() === "") return;

    const datos = {
      nombre: formData.nombre.trim(),
    };
    onGuardar(datos);
  };

  return (
    <FormularioBase onSubmit={handleSubmit} onCancel={onCancelar}>
      <FormField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleSetData}
        required={true}
        placeholder="Nombre"
      />
    </FormularioBase>
  );
};

export default FormularioTipoTurnos;
