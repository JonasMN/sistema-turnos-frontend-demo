import connection from "../../utils/connection";

const getPefiles = async () => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/usuarios/perfiles`,
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default getPefiles;
