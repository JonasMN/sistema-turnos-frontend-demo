import React, { useState, Suspense, lazy } from 'react'
import SelectView from '../../components/SelectedView/SelectedView'
import Loader from "../../components/Loader/Loader.jsx";
import styles from './Locaciones.module.scss'

const Unidades = lazy(() => import('./views/Unidades/Unidades.jsx'));
const Ubicaciones = lazy(() => import('./views/Ubicaciones/Ubicaciones.jsx'));
const TipoUbicaciones = lazy(() => import('./views/TipoUbicaciones/TipoUbicaciones.jsx'));

const VIEW_LOCACIONES = Object.freeze({
  UNIDADES: Symbol(),
  UBICACION: Symbol(),
  TIPO_UBICACION: Symbol(),
})

export default function Locaciones() {
  const [typeView, setTypeView] = useState(VIEW_LOCACIONES.UNIDADES);

  const botonesConfig = [
    { callback: () => setTypeView(VIEW_LOCACIONES.UNIDADES), texto: "Unidades" },
    { callback: () => setTypeView(VIEW_LOCACIONES.UBICACION), texto: "Ubicaciones" },
    { callback: () => setTypeView(VIEW_LOCACIONES.TIPO_UBICACION), texto: "Tipo ubicaciones" }
  ];

  const selectViewConfig = {
    [VIEW_LOCACIONES.UNIDADES]: <Unidades />,
    [VIEW_LOCACIONES.UBICACION]: <Ubicaciones />,
    [VIEW_LOCACIONES.TIPO_UBICACION]: <TipoUbicaciones />,
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
