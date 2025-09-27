// COMENTADO PARA MODO DEMO - USAR MOCK EN SU LUGAR
// import config from "../../config/config";
import { mockLoginService } from "../../mocks/mockServices.js";

// COMENTADO - LÓGICA ORIGINAL DE API
// const clientId = 'jb849d483b883';
// const origin = window.location.origin;

const login = async ({ email, password }) => {
    // MODO DEMO: Usar servicio mockeado
    return await mockLoginService({ email, password });
    
    // COMENTADO - LÓGICA ORIGINAL DE API
    // let response = {};
    // try {
    //     const responseGet = await fetch(`${config.URL.STOP_APP_URL}/auth/api/v1/auth/local/login`, {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'client-id': clientId,
    //             ...origin != null ? { 'origin': origin ?? '' } : {}
    //         },
    //         credentials: 'include'
    //     });
    //     if (!responseGet.ok) {
    //         throw new Error(`HTTP error! status: ${responseGet.status}`);
    //     }
    //     const data = await responseGet.json();
    //     response.data = data;
    // } catch (error) {
    //     console.error("catch service", error);
    //     response = error.response || { error: error.message };
    // }
    // return response;
};

export default login;
