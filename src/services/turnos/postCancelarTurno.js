import config from "../../config/config";
import connection from "../../utils/connection";

const postCancelarTurno = async (idTurno) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/turnos/${idTurno}/cancelar`,
            method: "POST"
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default postCancelarTurno;
