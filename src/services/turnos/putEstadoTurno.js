import config from "../../config/config";
import connection from "../../utils/connection";

const putEstadoTurno = async (body, idTurno) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/turnos/${idTurno}/estado`,
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

export default putEstadoTurno;
