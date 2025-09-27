import config from "../../config/config";
import connection from "../../utils/connection";

const putTipoVehiculos = async (body, idUsuario) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/usuarios/${idUsuario}`,
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

export default putTipoVehiculos;
