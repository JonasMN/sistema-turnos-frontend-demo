// COMENTADO PARA MODO DEMO - USAR MOCK EN SU LUGAR
// import config from "../../config/config";
// import connection from "../../utils/connection";
// import setPagePaginations from "../../utils/setPagePaginations.js";
import { mockMotivosTurnosService } from "../../mocks/mockServices.js";

const getMotivoTurnos = async (page = 1) => {
    // MODO DEMO: Usar servicio mockeado
    return await mockMotivosTurnosService.getAll();
    
    // COMENTADO - LÓGICA ORIGINAL DE API
    // let response = {};
    // try {
    //     const paginateParams = setPagePaginations(page);
    //     const responseGet = await connection({
    //         url: `/motivo_turno?${paginateParams}`,
    //     });
    //     response.data = responseGet;
    // } catch (error) {
    //     console.error("catch service", error);
    //     response = error.response;
    // }
    // return response;
};

export default getMotivoTurnos;
