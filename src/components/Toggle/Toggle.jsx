import React from "react";
import styles from "./Toggle.module.scss";

const Toggle = ({ label, isChecked = false, onChange = null }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default Toggle;
