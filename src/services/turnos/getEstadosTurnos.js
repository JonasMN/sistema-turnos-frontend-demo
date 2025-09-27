import config from "../../config/config";
import connection from "../../utils/connection";

const getEstadosTurnos = async () => {
  let response = {};
  try {
    const responseGet = await connection({
      url: `/estado_turno/`,
    });

    response.data = responseGet;
  } catch (error) {
    console.error("catch service", error);
    response = error.response;
  }

  return response;
};  

export default getEstadosTurnos;
