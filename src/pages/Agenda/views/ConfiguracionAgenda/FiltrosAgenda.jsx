import React from "react";
import Select from "../../../../components/Select/Select.jsx";
import FormField from "../../../../components/FormField/FormField.jsx";
import Button from "../../../../components/Button/Button.jsx";
// COMENTADO - USAR MOCKS
// import SelectFieldAsyncPaginate from "../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginate.jsx";
import SelectFieldAsyncPaginate from "../../../../components/SelectFieldAsyncPaginate/SelectFieldAsyncPaginateMock.jsx";
import Box from "../../../../components/Box/Box.jsx";
import TimeSelect from "../../../../components/TimeSelect/TimeSelect.jsx";
import IntervalSelect from "../../../../components/IntervalSelect/IntervalSelect.jsx";
import { Save } from "lucide-react";
import styles from "../../Agenda.module.scss";

const FiltrosAgenda = ({
  filtros,
  onFiltroChange,
  onGuardarAgenda,
  diasOpciones,
}) => {
  const todosCamposCompletos =
    filtros.unidad &&
    filtros.ubicacion &&
    Array.isArray(filtros.dias_semana) &&
    filtros.dias_semana.length > 0 &&
    filtros.h_inicio &&
    filtros.h_fin &&
    filtros.cupos_max &&
    filtros.intervalo &&
    filtros.vigencia_desde;

  return (
    <div>
      <Box columns={4}>
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

        <Select
          label="Días de la semana"
          name="dias_semana"
          value={filtros.dias_semana}
          onChange={onFiltroChange}
          options={diasOpciones}
          placeholder="Seleccionar"
          multiple={true}
          useCustomMultiValue={true}
          required
        />

        <FormField
          label="Vigencia Desde"
          name="vigencia_desde"
          type="date"
          value={filtros.vigencia_desde}
          onChange={onFiltroChange}
          required
        />

        <FormField
          label="Vigencia Hasta"
          name="vigencia_hasta"
          type="date"
          value={filtros.vigencia_hasta}
          onChange={onFiltroChange}
        />

        <TimeSelect
          value={filtros.h_inicio}
          onChange={onFiltroChange}
          name="h_inicio"
          label="Hora inicio"
        />

        <TimeSelect
          value={filtros.h_fin}
          onChange={onFiltroChange}
          name="h_fin"
          label="Hora fin"
        />

        <FormField
          label="Cupos máximo para la ubicación"
          name="cupos_max"
          type="number"
          value={filtros.cupos_max}
          onChange={onFiltroChange}
          min="1"
          placeholder="0"
          required
        />

        <IntervalSelect
          value={filtros.intervalo}
          onChange={onFiltroChange}
          name="intervalo"
          label="Intervalo (min)"
          placeholder="0"
          required
        />
      </Box>
      <div className={styles.botonesContainer}>
        <Button
          type="button"
          onClick={onGuardarAgenda}
          title="Guardar nueva agenda"
          disabled={!todosCamposCompletos}
          variant="primary"
          size="large"
          icon={Save}
          iconPosition="left"
        ></Button>
      </div>
    </div>
  );
};

export default FiltrosAgenda;
