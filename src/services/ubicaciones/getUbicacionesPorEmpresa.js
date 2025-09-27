import config from "../../config/config";
import connection from "../../utils/connection";
import setPagePaginations from "../../utils/setPagePaginations.js";

const getUbicacionesPorEmpresa = async (idEmpresa, page= 1) => {
    let response = {};
    try {
        const paginateParams = setPagePaginations(page);
        const responseGet = await connection({
            url: `/ubicaciones/empresa/${idEmpresa}?${paginateParams}`,
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

export default getUbicacionesPorEmpresa;
