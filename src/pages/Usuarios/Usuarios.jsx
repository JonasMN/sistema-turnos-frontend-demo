import React, { useState, Suspense, lazy } from 'react'
import SelectView from '../../components/SelectedView/SelectedView'
import Loader from "../../components/Loader/Loader.jsx";
import styles from './Usuarios.module.scss'

const ListadoUsuarios = lazy(() => import('./views/ListadoUsuarios/ListadoUsuarios.jsx'));

const VIEW_USUARIOS = Object.freeze({
  LISTADO_USUARIOS: Symbol(),
})

export default function Locaciones() {
  const [typeView, setTypeView] = useState(VIEW_USUARIOS.LISTADO_USUARIOS);

  const botonesConfig = [
    {
      callback: () => { setTypeView(VIEW_USUARIOS.LISTADO_USUARIOS) },
      texto: "Usuarios",
      // icon: 'file-earmark-fill'
    },
  ];

  const selectViewConfig = {
    [VIEW_USUARIOS.LISTADO_USUARIOS]: <ListadoUsuarios />,
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
