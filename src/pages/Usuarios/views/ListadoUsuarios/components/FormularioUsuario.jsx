import { useEffect, useState } from "react";
import FormField from "../../../../../components/FormField/FormField.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import Button from "../../../../../components/Button/Button.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import { toast } from "react-toastify";
import { RefreshCw   } from 'lucide-react';

const FormularioUsuario = ({ usuarios, perfiles, onGuardar, onCancelar, setIdBlanqueoPassword }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    perfil: "",
  });

  useEffect(() => {
    if (usuarios) {
      setFormData({
        ...usuarios,
        perfil: usuarios.perfiles?.map((u) => u.idPerfil) || [],
      });
    }
  }, []);

  const validarFormulario = (formData) => {
    const nombreApellidoRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombreApellidoRegex.test(formData.name)) {
      return "El nombre debe tener entre 2 y 50 caracteres.";
    }

    if (!nombreApellidoRegex.test(formData.surname)) {
      return "El apellido debe tener entre 2 y 50 caracteres.";
    }

    if (!correoRegex.test(formData.email)) {
      return "El correo ingresado no es válido.";
    }

    if (!formData.perfil || formData.perfil?.length === 0) {
      return "Debe seleccionar al menos un perfil.";
    }

    return null;
  };

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

  const procesarEnvio = (extra = {}) => {
    const mensajeError = validarFormulario(formData);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    const datos = {
      name: formData.name?.trim(),
      surname: formData.surname?.trim(),
      email: formData.email?.trim(),
      perfil: formData.perfil,
      ...extra,
    };

    onGuardar(datos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    procesarEnvio();
  };

  return (
    <FormularioBase
      onSubmit={handleSubmit}
      onCancel={onCancelar}
      extraButtons={
        usuarios && (
          <Button
            type="button"
            variant="outline"
            size="medium"
            icon={RefreshCw}
            iconPosition="left"
            onClick={() => {
              setIdBlanqueoPassword(usuarios?.id);
              onCancelar();
            }}
            className={"me-auto"}
          >
            Restablecer contraseña
          </Button>
        )
      }
    >
      <FormField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleSetData}
        required={true}
        placeholder="Nombre"
      />
      <FormField
        label="Apellido"
        name="surname"
        value={formData.surname}
        onChange={handleSetData}
        placeholder="Apellido"
      />
      <FormField
        label="Correo"
        name="email"
        value={formData.email}
        onChange={handleSetData}
        required={true}
        placeholder="Correo"
      />

      <Select
        label="Perfil"
        name="perfil"
        value={formData.perfil}
        onChange={handleSetData}
        options={perfiles}
        required={true}
        multiple={true}
        placeholder={"Seleccionar"}
      />
    </FormularioBase>
  );
};


export default FormularioUsuario;
