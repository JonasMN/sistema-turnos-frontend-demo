import React, { useState, Suspense, lazy } from 'react'
import Loader from "../../components/Loader/Loader.jsx";
import SelectView from '../../components/SelectedView/SelectedView'
import styles from './Configuraciones.module.scss'

const TiposTurnos = lazy(() => import('./views/TiposTurnos/TiposTurnos.jsx'));
const MotivosTurnos = lazy(() => import('./views/MotivosTurnos/MotivosTurnos.jsx'));
const TiposServicios = lazy(() => import('./views/TiposServicios/TiposServicios.jsx'));
const TiposVehiculos = lazy(() => import('./views/TiposVehiculos/TiposVehiculos.jsx'));

const VIEW_LOCACIONES = Object.freeze({
  TIPOS_TURNOS: Symbol(),
  MOTIVOS_TURNOS: Symbol(),
  TIPOS_SERVICIOS: Symbol(),
  TIPOS_VEHICULOS: Symbol(),
})

export default function Locaciones() {
  const [typeView, setTypeView] = useState(VIEW_LOCACIONES.TIPOS_TURNOS);

  const botonesConfig = [
    {
      callback: () => { setTypeView(VIEW_LOCACIONES.TIPOS_TURNOS) },
      texto: "Tipos turnos",
      // icon: 'file-earmark-fill'
    },
    {
      callback: () => { setTypeView(VIEW_LOCACIONES.MOTIVOS_TURNOS) },
      texto: "Motivos turnos",
      // icon: 'file-earmark-fill'
    },
    {
      callback: () => { setTypeView(VIEW_LOCACIONES.TIPOS_SERVICIOS) },
      texto: "Tipos servicios",
      // icon: 'file-earmark-fill'
    },
    {
      callback: () => { setTypeView(VIEW_LOCACIONES.TIPOS_VEHICULOS) },
      texto: "Tipos vehiculos",
      // icon: 'file-earmark-fill'
    },
  ];

  const selectViewConfig = {
    [VIEW_LOCACIONES.TIPOS_TURNOS]: <TiposTurnos />,
    [VIEW_LOCACIONES.MOTIVOS_TURNOS]: <MotivosTurnos />,
    [VIEW_LOCACIONES.TIPOS_SERVICIOS]: <TiposServicios />,
    [VIEW_LOCACIONES.TIPOS_VEHICULOS]: <TiposVehiculos />,
  }
  const selectView = selectViewConfig[typeView];
  return (
    <div>
      <SelectView arrayConfig={botonesConfig} />
      <div className={styles.viewBody}>
        <Suspense fallback={<Loader />}>
          {selectView}
        </Suspense>
      </div>
    </div>
  )
}
