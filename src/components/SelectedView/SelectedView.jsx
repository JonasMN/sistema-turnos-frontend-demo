import React, { useState, useEffect } from 'react';
import styles from './SelectedView.module.scss';
import Loader from '../Loader/Loader.jsx';

const SelectView = ({ arrayConfig = [], stylesCustom = 'default', imagenes = false }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [varStyles, setVarStyles] = useState({ left: '0%', animation: "left .2s ease-in-out forwards" });
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (positionArray, callback) => {
    if (activeButton === positionArray) return;
    setIsLoading(true)
    setActiveButton(positionArray);
    animationButtonBar(positionArray);
    callback();
    setIsLoading(false)
  };

  const animationButtonBar = (position) => {
    const cantidadItem = arrayConfig.length;
    const positionBase = (100 / cantidadItem) * position;
    setVarStyles({
      left: positionBase + "%",
      width: (100 / cantidadItem) + "%",
      transition: "left .3s ease-in-out"
    });
  };

  useEffect(() => {
    handleClick(0, () => { });
  }, []);

  return (
    <div className={styles['botonera-' + stylesCustom]}>
      {isLoading && <Loader />}
      
      {arrayConfig.map((item, index) => (
        <div
          key={`boton-${item.texto}-key-${index}`}
          onClick={() => handleClick(index, item.callback)}
          className={
            activeButton === index
              ? styles[`botonera-${stylesCustom}-button-active`]
              : styles[`botonera-${stylesCustom}-button`]
          }
        >
          <span className={styles[`botonera-${stylesCustom}-button-span`]}>
            {item.icon ? <i className={`bi bi-${item.icon}`}></i> : null}
            &nbsp;
            {item.texto}
          </span>
        </div>
      ))}
      <span
        id="line"
        className={styles[`botonera-${stylesCustom}-line`]}
        style={varStyles}
      ></span>
    </div>
  );
};

export default SelectView;
