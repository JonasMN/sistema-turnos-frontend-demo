import connection from "../../utils/connection";

const postTipoVehiculos = async (body) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/usuarios/auth/signup`,
            method: "POST",
            body
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default postTipoVehiculos;
