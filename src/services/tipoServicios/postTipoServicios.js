import config from "../../config/config";
import connection from "../../utils/connection";

const postTipoServicios = async (body) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_servicio`,
            method: "POST",
            body
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default postTipoServicios;
