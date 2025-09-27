import React, { useState } from "react";
import s from "./Table.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Table({
  data = [],
  columns,
  id,
  tableOverflow = false,
  className = "",
  handlePageChange,
  page
}) {
  const totalPages = data.paginas;
  const totalItems = data.total ? data.total : data?.resultados?.length;

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);
    let startPage = Math.max(1, page - halfButtons);
    let endPage = Math.min(totalPages, page + halfButtons);

    if (page <= halfButtons) endPage = Math.min(totalPages, maxButtons);
    else if (page + halfButtons >= totalPages)
      startPage = Math.max(1, totalPages - maxButtons + 1);

    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className={s["page-button"]}
        >
          1
        </button>,
      );
      if (startPage > 2)
        buttons.push(
          <span
            key="start-ellipsis"
            className={`${s.ellipsis} ${s["page-button"]}`}
          >
            ...
          </span>,
        );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${s["page-button"]} ${i === page ? s.active : ""}`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1)
        buttons.push(
          <span
            key="end-ellipsis"
            className={`${s.ellipsis} ${s["page-button"]}`}
          >
            ...
          </span>,
        );
      buttons.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={s["page-button"]}
        >
          {totalPages}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className={`${s.tableResponsive} ${className}`}>
      <table
        className={`table table-striped ${s.table}`}
        style={
          tableOverflow
            ? { width: "100%" }
            : { tableLayout: "fixed", width: "100%" }
        }
      >
        <thead>
          <tr>
            {columns?.map((col, i) => (
              <th
                key={col.headerName ? col.headerName : i}
                className={s.headerClass}
                style={{
                  width: col.flex
                    ? `${(col.flex * 100) /
                    columns.reduce((acc, col) => acc + (col.flex || 1), 0)
                    }%`
                    : "auto",
                  textAlign: col.center ? "center" : "left",
                }}
              >
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data.resultados) && data.resultados.length > 0 ? (
            data.resultados.map((row, i) => (
              <tr key={id && row[id] ? row[id] : i}>
                {columns?.map((col, idx) =>
                  col ? (
                    <td
                      key={col.column || idx}
                      data-label={col.headerName}
                      className={col.customCell ? s.actionCell : ""}
                      style={{
                        width: col.flex
                          ? `${(col.flex * 100) /
                          columns.reduce(
                            (acc, col) => acc + (col.flex || 1),
                            0
                          )
                          }%`
                          : "auto",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: col.center ? "center" : "left",
                      }}
                    >
                      {col.customCell
                        ? col.customCell(row, i)
                        : row[col.column]}
                    </td>
                  ) : null
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns?.length || 1}
                style={{ textAlign: "center", padding: "10px" }}
              >
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <div className={s.tfoot}>
                <div className="dflex flex-row justify-content-between pl1 pr1 align-center w-100 fw-bold">
                  {totalPages >= 1 ? (
                    <div className={s["pagination-container"]}>
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`${s["arrow-button"]} ${s["page-button"]}`}
                      >
                        <ChevronLeft size={14}/>
                      </button>
                      {renderPageButtons()}
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`${s["arrow-button"]} ${s["page-button"]}`}
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  ) : null}
                  <div className={s["total-items"]}>
                    Registros: {totalItems}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}