import { useEffect, useState } from "react";
import Toggle from "../../../../../components/Toggle/Toggle";
import Button from "../../../../../components/Button/Button.jsx";
import FormField from "../../../../../components/FormField/FormField.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import { Save, X } from "lucide-react";

const FormularioTipoVehiculos = ({
  tipoVehiculos,
  onGuardar,
  onCancelar,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    if (tipoVehiculos) {
      setFormData(tipoVehiculos);
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
      nombre: formData.nombre?.trim(),
      descripcion: formData.descripcion?.trim(),
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
      <FormField
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleSetData}
        placeholder="Descripción"
      />
    </FormularioBase>
  );
};

export default FormularioTipoVehiculos;
