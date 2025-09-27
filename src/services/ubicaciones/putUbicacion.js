import config from "../../config/config";
import connection from "../../utils/connection";

const putUbicacion = async (body, idUbicacion) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/ubicaciones/${idUbicacion}`,
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

export default putUbicacion;
