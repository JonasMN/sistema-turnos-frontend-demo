import React from "react";
import Select from "../../components/Select/Select.jsx";

const IntervalSelect = ({ value, label, onChange, name = "", required = false }) => {
  const generateIntervals = () => {
    const intervals = [];
    for (let i = 5; i <= 60; i += 5) {
      intervals.push({ label: `${i} minutos`, value: i });
    }
    return intervals;
  };

  const intervals = generateIntervals();

  return (
    <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      options={intervals}
      placeholder="Seleccionar intervalo"
      multiple={false}
      required={required}
    />
  );
};

export default IntervalSelect;
