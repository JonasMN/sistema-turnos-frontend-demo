import config from "../../config/config";
import connection from "../../utils/connection";

const putTipoTurnos = async (body, idTipoTurnos) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_turno/${idTipoTurnos}`,
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

export default putTipoTurnos;
