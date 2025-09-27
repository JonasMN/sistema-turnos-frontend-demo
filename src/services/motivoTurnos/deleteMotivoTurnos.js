import config from "../../config/config";
import connection from "../../utils/connection";

const deleteMotivoTurnos = async (idMotivoTurnos) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/motivo_turno/${idMotivoTurnos}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteMotivoTurnos;
