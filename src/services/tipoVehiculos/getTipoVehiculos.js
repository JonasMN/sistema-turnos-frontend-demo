// COMENTADO PARA MODO DEMO - USAR MOCK EN SU LUGAR
// import config from "../../config/config";
// import connection from "../../utils/connection";
// import setPagePaginations from "../../utils/setPagePaginations.js";
import { mockTiposVehiculosService } from "../../mocks/mockServices.js";

const getTipoVehiculos = async (page = 1) => {
    // MODO DEMO: Usar servicio mockeado
    return await mockTiposVehiculosService.getAll();
    
    // COMENTADO - LÓGICA ORIGINAL DE API
    // let response = {};
    // try {
    //     const paginateParams = setPagePaginations(page);
    //     const responseGet = await connection({
    //         url: `/tipo_vehiculo?${paginateParams}`,
    //     });
    //     response.data = responseGet;
    // } catch (error) {
    //     console.error("catch service", error);
    //     response = error.response;
    // }
    // return response;
};

export default getTipoVehiculos;
