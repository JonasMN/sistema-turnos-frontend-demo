import React from "react";
import Select from "../../components/Select/Select.jsx";

const TimeSelect = ({ value, label, onChange, name='', required=false }) => {
  const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hora = String(h).padStart(2, "0");
        const minutos = String(m).padStart(2, "0");
        times.push({label:`${hora}:${minutos}`,value:`${hora}:${minutos}`});
      }
    }
    return times;
  };

  const times = generateTimes();

  return (
    <Select
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    options={times}
    placeholder="Seleccionar"
    multiple={false}
    required={required}
  />
  );
};

export default TimeSelect;