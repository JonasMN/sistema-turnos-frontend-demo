import { useEffect, useState } from "react";
import Toggle from "../../../../../components/Toggle/Toggle";
import Button from "../../../../../components/Button/Button.jsx";
import FormField from "../../../../../components/FormField/FormField.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import Loader from "../../../../../components/Loader/Loader.jsx";
// COMENTADO - USAR MOCKS
// import SelectFieldAsyncPaginate from "../../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginate.jsx";
import SelectFieldAsyncPaginate from "../../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginateMock.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import { Save, X } from "lucide-react";
import { toast } from "react-toastify";

const FormularioUbicacion = ({ ubicacion, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    id_unidad: 0,
    id_tipo_ubicacion: 0,
    id_tipo_servicio: 0,
    id_tipo_vehiculo: 0,
  });

  const validarFormularioUbicacion = (formData) => {
    if (!formData.id_unidad || formData.id_unidad === 0) {
      return "Debe seleccionar una unidad.";
    }

    if (!formData.id_tipo_ubicacion || formData.id_tipo_ubicacion === 0) {
      return "Debe seleccionar un tipo de ubicación.";
    }

    if (!formData.id_tipo_servicio || formData.id_tipo_servicio?.length === 0) {
      return "Debe seleccionar un tipo de servicio.";
    }

    if (!formData.id_tipo_vehiculo || formData.id_tipo_vehiculo?.length === 0) {
      return "Debe seleccionar un tipo de vehiculo.";
    }

    return null;
  };

  useEffect(() => {
    if (ubicacion) {
      setFormData({
        ...ubicacion,
        id_tipo_servicio: ubicacion.tipos_servicio || [],
        id_tipo_vehiculo: ubicacion.tipos_vehiculo || [],
      });
    }
  }, []);

  const handleSetData = (e) => {
    const { name, value } = e.target;
  
    if (Array.isArray(value)) {
      const filteredValues = value.filter((v) => v);
      setFormData((f) => ({
        ...f,
        [name]: filteredValues,
      }));
    } else {
      if (!value) return;
  
      setFormData((f) => ({
        ...f,
        [name]: value,
      }));
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajeError = validarFormularioUbicacion(formData);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    if (formData.nombre.trim() === "") return;

    const datos = {
      nombre: formData.nombre?.trim(),
      descripcion: formData.descripcion?.trim(),
      id_unidad: formData.id_unidad?.id,
      id_tipo_ubicacion: formData.id_tipo_ubicacion?.id,
      id_tipo_servicio:  formData.id_tipo_servicio.map((obj) => obj.id),
      id_tipo_vehiculo: formData.id_tipo_vehiculo.map((obj) => obj.id),
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

      <SelectFieldAsyncPaginate
        label="Unidad"
        name="id_unidad"
        value={formData.id_unidad}
        onChange={handleSetData}
        endpoint="/unidades?empresa=1"
        additional={{ page: 1 }}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Seleccionar"
        required={true}
        isClearable
      />

      <SelectFieldAsyncPaginate
        label="Tipo ubicación"
        name="id_tipo_ubicacion"
        value={formData.id_tipo_ubicacion}
        onChange={handleSetData}
        endpoint="/tipo_ubicacion"
        additional={{ page: 1 }}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Seleccionar"
        required={true}
        isClearable
      />

      <SelectFieldAsyncPaginate
        label="Tipo servicio"
        name="id_tipo_servicio"
        value={formData.id_tipo_servicio}
        onChange={handleSetData}
        endpoint="/tipo_servicio"
        additional={{ page: 1 }}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Seleccionar"
        multiple={true}
        required={true}
        isClearable
      />

      <SelectFieldAsyncPaginate
        label="Tipo vehiculo"
        name="id_tipo_vehiculo"
        value={formData.id_tipo_vehiculo}
        onChange={handleSetData}
        endpoint="/tipo_vehiculo"
        additional={{ page: 1 }}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Seleccionar"
        multiple={true}
        required={true}
        isClearable
      />
    </FormularioBase>
  );
};

export default FormularioUbicacion;
