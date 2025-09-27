import config from "../../config/config";
import connection from "../../utils/connection";

const deleteUbicacion = async (idUbicacion) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/ubicaciones/${idUbicacion}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteUbicacion;
