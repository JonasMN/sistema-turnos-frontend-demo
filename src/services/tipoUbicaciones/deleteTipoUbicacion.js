import config from "../../config/config";
import connection from "../../utils/connection";

const deleteTipoUbicacion = async (idTipoUbicacion) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_ubicacion/${idTipoUbicacion}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteTipoUbicacion;
