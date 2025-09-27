import { useEffect, useState } from "react";
import Toggle from "../../../../../components/Toggle/Toggle";
import Button from "../../../../../components/Button/Button.jsx";
import FormField from "../../../../../components/FormField/FormField.jsx";
import FormularioBase from "../../../../../components/FormularioBase/FormularioBase.jsx";
import Select from "../../../../../components/Select/Select.jsx";
import { Save, X } from "lucide-react";

const FormularioBloquearAgenda = ({ 
  diasBloquearAgenda, 
  ubicaciones, 
  formData, 
  setFormData, 
  onGuardar, 
  onCancelar 
}) => {

  const handleSetData = (e) => {
    const { name, value } = e.target
    setFormData((f) => ({
      ...f,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.motivo.trim() === "") return

    const datos = {
      motivo: formData.motivo.trim(),
      id_ubicacion: formData.id_ubicacion?.value || formData.id_ubicacion,
      dias: diasBloquearAgenda,
    }
    
    onGuardar(datos)
  }

  return (
    <FormularioBase onSubmit={handleSubmit} onCancel={onCancelar}>
      <p><strong>Días seleccionados:</strong> {diasBloquearAgenda.map(d => {
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
      }).join(", ")}</p>

      <Select
        label="Ubicación"
        name="id_ubicacion"
        value={formData.id_ubicacion?.value}
        onChange={handleSetData}
        options={ubicaciones}
        required={true}
        placeholder="Seleccionar"
      />

      <FormField
        label="Motivo"
        name="motivo"
        value={formData.motivo}
        onChange={handleSetData}
        required={true}
        placeholder=""
      />
    </FormularioBase>
  );
}

export default FormularioBloquearAgenda;