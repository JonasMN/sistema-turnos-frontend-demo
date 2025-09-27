import React, { useState, useEffect } from 'react';
import Button from "../Button/Button.jsx";
import Loader from "../Loader/Loader.jsx";
import Table from "../Table/Table.jsx";
import { Plus } from "lucide-react";
import styles from "./EntityManager.module.scss";

export default function EntityManager({
  title,
  columns,
  entityKey = "id",
  serviceMethod, 
  onCrear,
  renderForm,
  data,
  page,
  handlePageChange,
  isLoading
}) {
  return (
    <div className={styles.container}>
      {isLoading && <Loader />}

      <div className={styles.header}>
        <h2 className={styles.titulo}>{`Listado de ${title}`}</h2>
        <Button
          onClick={onCrear}
          variant="primary"
          size="medium"
          icon={Plus}
          iconPosition="left"
        >
        </Button>
      </div>

      <Table
        data={data}
        columns={columns}
        id={entityKey}
        pagination={true}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
