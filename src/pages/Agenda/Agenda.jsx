import React, { useState, Suspense, lazy } from 'react'
import Loader from "../../components/Loader/Loader.jsx";
import SelectView from '../../components/SelectedView/SelectedView'
import styles from './Agenda.module.scss'

const ConfiguracionAgenda = lazy(() => import('./views/ConfiguracionAgenda/ConfiguracionAgenda.jsx'));
const BloquearAgenda = lazy(() => import('./views/BloquearAgenda/BloquearAgenda.jsx'));
const AgendasProgramadas = lazy(() => import('./views/AgendasProgramadas/AgendasProgramadas.jsx'));

const VIEW_AGENDA = Object.freeze({
  LISTADO_AGENDAS: Symbol(),
  AGENDA: Symbol(),
  BLOQUEAR_AGENDA: Symbol(),
})

export default function Agenda() {
  const [typeView, setTypeView] = useState(VIEW_AGENDA.LISTADO_AGENDAS);

  const botonesConfig = [
    {
      callback: () => { setTypeView(VIEW_AGENDA.LISTADO_AGENDAS) },
      texto: "Mis agendas",
      // icon: 'file-earmark-fill'
    },
    {
      callback: () => { setTypeView(VIEW_AGENDA.AGENDA) },
      texto: "Nueva agenda",
      // icon: 'file-earmark-fill'
    },
    //     {
    //   callback: () => { setTypeView(VIEW_AGENDA.BLOQUEAR_AGENDA) },
    //   texto: "Bloquear Agenda",
    //   // icon: 'file-earmark-fill'
    // },
  ];

  const selectViewConfig = {
    [VIEW_AGENDA.LISTADO_AGENDAS]: <AgendasProgramadas />,
    [VIEW_AGENDA.AGENDA]: <ConfiguracionAgenda />,
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
