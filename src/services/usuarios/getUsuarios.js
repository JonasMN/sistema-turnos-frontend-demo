// COMENTADO PARA MODO DEMO - USAR MOCK EN SU LUGAR
// import connection from "../../utils/connection";
import { mockUsuariosService } from "../../mocks/mockServices.js";

const getUsuarios = async () => {
    // MODO DEMO: Usar servicio mockeado
    return await mockUsuariosService.getAll();
    
    // COMENTADO - LÓGICA ORIGINAL DE API
    // let response = {};
    // try {
    //     const responseGet = await connection({
    //         url: `/usuarios`,
    //     });
    //     response.data = responseGet;
    // } catch (error) {
    //     console.error("catch service", error);
    //     response = error.response;
    // }
    // return response;
};

export default getUsuarios;
