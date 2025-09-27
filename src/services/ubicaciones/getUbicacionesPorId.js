import config from "../../config/config";
import connection from "../../utils/connection";

const getUbicacionesPorId = async (idUbicacion) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/ubicaciones/${idUbicacion}`,
        });
        // const status = responseGet.pop()
        // if (status === 401) return (window.location.href = `${config.URL.BASENAME}/login`);
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default getUbicacionesPorId;
