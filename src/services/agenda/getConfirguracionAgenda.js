import config from "../../config/config";
import connection from "../../utils/connection";

const getConfirguracionAgenda = async ({unidad = "",ubicacion = ""}) => {
    let response = {};
    try {
        const params = new URLSearchParams();

        if (unidad) params.append("unidad", unidad);
        if (ubicacion) params.append("ubicacion", ubicacion);
    
        const responseGet = await connection({
          url: `/agenda/?${params.toString()}`,
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

export default getConfirguracionAgenda;
