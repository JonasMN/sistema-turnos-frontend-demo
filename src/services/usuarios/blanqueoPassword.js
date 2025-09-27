import config from "../../config/config";
import connection from "../../utils/connection";

const blanqueoPassword = async (idUsuario) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/usuarios/auth/blanqueo-password/${idUsuario}`,
            method: "GET"
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default blanqueoPassword 
