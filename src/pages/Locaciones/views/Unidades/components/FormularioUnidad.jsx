import { useEffect, useState } from "react";
import Toggle from "../../../../../components/Toggle/Toggle";
import Button from "../../../../../components/Button/Button.jsx";
import FormField from "../../../../../components/FormField/FormField.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import MapGoogle from "../../../../../components/MapGoogle/MapGoogle";
import AutoCompleteInput from "../../../../../components/AutoCompleteInput/AutoCompleteInput";
import { toast } from "react-toastify";
import styles from "../Unidades.module.scss";
import { Save, X } from "lucide-react";

const FormularioUnidad = ({
  unidad,
  unidades,
  tipoServicios,
  tipoVehiculos,
  onGuardar,
  onCancelar,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    id_empresa: 1,
  });

  const validarFormularioUnidad = (formData) => {
    if (
      formData.telefono &&
      !/^(?!.*(\d)\1{6,})(\d{10,12})$/.test(formData.telefono)
    ) {
      return "El teléfono ingresado no es válido.";
    }

    if (!formData.direccion || !formData.direccion.latitud || !formData.direccion.longitud) {
      return "Debe ingresar una dirección válida";
    }

    return null;
  };

  useEffect(() => {
    if (unidad) {
      setFormData(unidad);
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

    const mensajeError = validarFormularioUnidad(formData);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    if (formData.nombre.trim() === "") return;

    const datos = {
      nombre: formData.nombre.trim(),
      direccion: formData.direccion,
      telefono: formData.telefono.trim(),
      id_empresa: formData.id_empresa,
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
        label="Teléfono"
        name="telefono"
        type="tel"
        value={formData.telefono}
        required={true}
        onChange={handleSetData}
        placeholder="Teléfono"
      />

      <AutoCompleteInput
        setAddress={(address) =>
          setFormData((f) => ({
            ...f,
            direccion: address,
          }))
        }
        label="Dirección"
        inputValue={formData.direccion?.direccion_formateada}
      />
{/* 
      <MapGoogle
        lat={formData.direccion?.latitud || -34.6073275}
        long={formData.direccion?.longitud || -58.3842001}
        zoom={14}
        className={styles.mapa}
      >
        {formData.direccion && (
          <MapGoogle.Marker
            position={{
              lat: formData.direccion.latitud,
              lng: formData.direccion.longitud,
            }}
          />
        )}
      </MapGoogle> */}
    </FormularioBase>
  );
};

export default FormularioUnidad;
