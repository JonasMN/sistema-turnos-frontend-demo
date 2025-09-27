import { useEffect, useState } from "react";
import Toggle from "../../../../../components/Toggle/Toggle";
import Button from "../../../../../components/Button/Button.jsx";
import FormField from "../../../../../components/FormField/FormField.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import { Save, X } from "lucide-react";
import { toast } from "react-toastify";

const FormularioTipoServicios = ({ tipoServicios, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    id_empresa: 1,
    descripcion: "",
    duracion_minutos: 0,
  });

  const validarFormularioTipoServicio = (formData) => {
    const isValidMinutos = (v) => /^(?:[1-9]|[1-5]\d|60)$/.test(String(v).trim());

    if (!isValidMinutos(formData.duracion_minutos)) {
      return "La duración debe ser entre 1 y 60 minutos.";
    }

    return null;
  };

  useEffect(() => {
    if (tipoServicios) {
      setFormData(tipoServicios);
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
    const mensajeError = validarFormularioTipoServicio(formData);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    if (formData.nombre.trim() === "") return;

    const datos = {
      nombre: formData.nombre?.trim(),
      descripcion: formData.descripcion?.trim(),
      duracion_minutos: formData?.duracion_minutos,
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

      <FormField
        label="Duracion tipo servicio"
        name="duracion_minutos"
        value={formData.duracion_minutos}
        onChange={handleSetData}
        required={true}
        placeholder="0"
      />
    </FormularioBase>
  );
};

export default FormularioTipoServicios;
