import connection from "../../utils/connection";

const deleteUsuarios = async (idUsuario) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/usuarios/${idUsuario}`,
            method: "DELETE",
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteUsuarios;
