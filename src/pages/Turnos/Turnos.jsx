import React, { lazy, Suspense, useState } from 'react'
import SelectView from '../../components/SelectedView/SelectedView'
const ListadoTurnos = lazy(() => import("./views/ListadoTurnos/ListadoTurnos.jsx"))
import styles from "./Turnos.module.scss";
import Loader from '../../components/Loader/Loader.jsx';


const VIEW_TURNOS = Object.freeze({
  TURNOS: Symbol(),
})

export default function Turnos() {
  const [typeView, setTypeView] = useState(VIEW_TURNOS.TURNOS);

  const botonesConfig = [
    {
      callback: () => { setTypeView(VIEW_TURNOS.TURNOS) },
      texto: "Turnos",
      // icon: 'file-earmark-fill'
    },
  ];

  const selectViewConfig = {
    [VIEW_TURNOS.TURNOS]: <ListadoTurnos />,
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
