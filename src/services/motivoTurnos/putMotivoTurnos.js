import config from "../../config/config";
import connection from "../../utils/connection";

const putMotivoTurnos = async (body, idMotivoTurnos) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/motivo_turno/${idMotivoTurnos}`,
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

export default putMotivoTurnos;
