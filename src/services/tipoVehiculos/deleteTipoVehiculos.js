import config from "../../config/config";
import connection from "../../utils/connection";

const deleteTipoVehiculos = async (idTipoVehiculos) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/tipo_vehiculo/${idTipoVehiculos}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteTipoVehiculos;
