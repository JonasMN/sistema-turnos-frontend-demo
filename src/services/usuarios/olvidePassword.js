import config from "../../config/config";
import connection from "../../utils/connection";

const olvidePassword = async (body) => {
    let response = {};
    try {
        const responseGet = await connection({
            url: `/usuarios/auth/olvide-password`,
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

export default olvidePassword 
