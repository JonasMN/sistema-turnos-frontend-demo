import React from "react";
import { Notebook, Calendar } from 'lucide-react';
import styles from "./AgendasProgramadas.module.scss";

export default function ListaAgendas({ agendas, onSeleccionar, agendasSeleccionadas = [] }) {
    if (!agendas || agendas.length === 0) return null;
  
    return (
      <aside className={styles.columnaIzquierda}>
        <h3 className={styles.titulo}>Agendas</h3>
        <ul className={styles.ul}>
          {agendas.map((agenda) => {
            const estaSeleccionada = agendasSeleccionadas.some(a => a.id === agenda.id);
  
            return (
              <li
                key={agenda.id}
                className={`${styles.itemAgenda} ${estaSeleccionada ? styles.seleccionado : ""}`}
                onClick={() => onSeleccionar(agenda)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSeleccionar(agenda)}
              >
                <div >
                   <Calendar size="15" className={styles.detailIcon} />
                   <span className={styles.vigencia}>
                    {agenda.vigencia_desde ? new Date(agenda.vigencia_desde).toLocaleDateString("es-ES") : "—"}{" "}
                    {agenda.vigencia_hasta ? new Date(agenda.vigencia_hasta).toLocaleDateString("es-ES") : ""}
                  </span>
                </div>
                <div className={styles.ubicacion}>
                  <Notebook size="15" className={styles.detailIcon} />
                  {agenda.ubicacion?.nombre || "Sin ubicación"}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
  
