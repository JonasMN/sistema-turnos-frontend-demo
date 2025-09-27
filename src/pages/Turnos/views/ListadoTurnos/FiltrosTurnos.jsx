import React from "react";
import Select from "../../../../components/Select/Select.jsx";
// COMENTADO - USAR MOCKS
// import SelectFieldAsyncPaginate from "../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginate.jsx";
import SelectFieldAsyncPaginate from "../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginateMock.jsx";
import FormField from "../../../../components/FormField/FormField.jsx";
import Button from "../../../../components/Button/Button.jsx";
import Box from "../../../../components/Box/Box.jsx";
import TimeSelect from "../../../../components/TimeSelect/TimeSelect.jsx";
import { Search  } from "lucide-react";
import { toast } from "react-toastify";
import styles from "../../Turnos.module.scss";

const FiltrosTurnos = ({
  filtros,
  onFiltroChange,
  onFiltrar,
}) => {

  const validarFiltros = (filtros) => {
    // MODO DEMO: Validaciones más flexibles
    if (filtros.fecha_hasta && filtros.fecha_desde && filtros.fecha_desde >= filtros.fecha_hasta)
      return "La fecha hasta debe ser posterior a la fecha desde.";

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
      unidad: filtros.unidad,
      ubicacion: filtros.ubicacion,
      fecha_desde: filtros.fecha_desde?.trim(),
      fecha_hasta: filtros.fecha_hasta?.trim(),
    };
    onFiltrar(datos);
  };
  
  const handleMostrarTodos = () => {
    // Llamar onFiltrar sin filtros para mostrar todos los turnos
    onFiltrar({});
  };

  return (
    <div>
      <Box columns={5}>
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

        <FormField
          label="Desde"
          tooltip="Si solo selecciona la fecha desde, se mostrarán los resultados únicamente de ese día."
          name="fecha_desde"
          type="date"
          value={filtros.fecha_desde}
          onChange={onFiltroChange}
          required
        />

        <FormField
          label="Hasta"
          name="fecha_hasta"
          type="date"
          value={filtros.fecha_hasta}
          onChange={onFiltroChange}
          required
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
          <Button
            type="button"
            onClick={handleMostrarTodos}
            title="Mostrar Todos"
            variant="secondary"
            size="medium"
            style={{ marginLeft: '10px' }}
          >
            Mostrar Todos
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default FiltrosTurnos;
