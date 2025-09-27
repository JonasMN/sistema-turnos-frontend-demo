import config from "../../config/config";
import connection from "../../utils/connection";

const putTipoServicios = async (body, idTipoServicios) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_servicio/${idTipoServicios}`,
            method: "PUT",
            body
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default putTipoServicios;
