import config from "../../config/config";
import connection from "../../utils/connection";

const deleteTipoTurnos = async (idTipoTurnos) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_turno/${idTipoTurnos}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteTipoTurnos;
