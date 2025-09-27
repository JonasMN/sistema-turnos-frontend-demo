import React from "react";
import Select from "../../../../components/Select/Select.jsx";
import FormField from "../../../../components/FormField/FormField.jsx";
import Button from "../../../../components/Button/Button.jsx";
import Box from "../../../../components/Box/Box.jsx";
import TimeSelect from "../../../../components/TimeSelect/TimeSelect.jsx";
// COMENTADO - USAR MOCKS
// import SelectFieldAsyncPaginate from "../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginate.jsx";
import SelectFieldAsyncPaginate from "../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginateMock.jsx";
import IntervalSelect from "../../../../components/IntervalSelect/IntervalSelect.jsx";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import styles from "./AgendasProgramadas.module.scss";

const FiltrosAgendasProgramadas = ({
  filtros,
  onFiltroChange,
  onFiltrar,
}) => {
  const todosCamposCompletos =
    filtros.unidad !== "" || filtros.ubicacion !== "";

  const validarFiltros = (filtros) => {
    if (!filtros.unidad && !filtros.ubicacion)
      return "Debe indicar al menos una unidad o ubicación para la busqueda.";

    return null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajeError = validarFiltros(filtros);
    if (mensajeError) {
      toast.warning(mensajeError, { position: "top-right" });
      return;
    }

    const datos = {
      unidad: filtros.unidad?.id,
      ubicacion: filtros.ubicacion?.id,
    };
    onFiltrar(datos);
  };

  return (
    <div>
      <Box columns={3}>
        <SelectFieldAsyncPaginate
          label="Unidad"
          name="unidad"
          value={filtros.unidad}
          onChange={onFiltroChange}
          endpoint="/unidades?empresa=1"
          additional={{ page: 1 }}
          optionValue="id"
          optionLabel="nombre"
          placeholder="Seleccionar"
          required={true}
          isClearable
        />

        <SelectFieldAsyncPaginate
          key={filtros.unidad?.id || "default"}
          label="Ubicación"
          name="ubicacion"
          value={filtros.ubicacion}
          onChange={onFiltroChange}
          endpoint={`/ubicaciones?unidad=${filtros.unidad?.id}`}
          additional={{ page: 1 }}
          optionValue="id"
          optionLabel="nombre"
          placeholder="Seleccionar"
          required={true}
          isClearable
          isDisabled={!filtros.unidad}
        />
        <div className={styles.botonesContainer}>
          <Button
            type="button"
            onClick={handleSubmit}
            title="Buscar"
            variant="primary"
            size="medium"
            icon={Search}
            iconPosition="right"
          >
            Buscar
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default FiltrosAgendasProgramadas;
