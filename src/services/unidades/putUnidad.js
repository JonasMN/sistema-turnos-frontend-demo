import config from "../../config/config";
import connection from "../../utils/connection";

const putUnidad = async (body, idUnidad) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/unidades/${idUnidad}`,
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

export default putUnidad;
