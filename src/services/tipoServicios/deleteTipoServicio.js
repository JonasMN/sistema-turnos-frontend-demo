import config from "../../config/config";
import connection from "../../utils/connection";

const deleteTipoServicio = async (idTipoServicio) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_servicio/${idTipoServicio}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteTipoServicio;
