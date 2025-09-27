import config from "../../config/config";
import connection from "../../utils/connection";

const deleteAgenda = async (idAgenda) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/agenda/${idAgenda}`,
            method: "DELETE"
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default deleteAgenda;
