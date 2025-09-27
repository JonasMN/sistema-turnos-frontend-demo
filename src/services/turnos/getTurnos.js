import config from "../../config/config";
import connection from "../../utils/connection";
import setPagePaginations from "../../utils/setPagePaginations.js";

const getTurnos = async ({ fecha_desde = "", fecha_hasta = "", id_unidad = "", id_ubicacion = "", page }) => {
  let response = {};
  try {
    const params = new URLSearchParams();

    if (fecha_desde) params.append("fecha_desde", fecha_desde);
    if (fecha_hasta) params.append("fecha_hasta", fecha_hasta);
    if (id_unidad) params.append("id_unidad", id_unidad);
    if (id_ubicacion) params.append("id_ubicacion", id_ubicacion);
    const paginateParams = setPagePaginations(page)
    const responseGet = await connection({
      url: `/turnos/panel?${params.toString()}${paginateParams}`,
    });

    response.data = responseGet;
  } catch (error) {
    console.error("catch service", error);
    response = error.response;
  }

  return response;
};

export default getTurnos;




