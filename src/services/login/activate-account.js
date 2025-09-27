import connection from "../../utils/connection";

const activateAccount = async ({ password, repeatPassword, hash }) => {
    let response = {};
    try {
        const responseGet = await connection({
            method: 'POST',
            url: `/usuarios/auth/activar-cuenta`,
            body: { password, repeatPassword, hash },
        });
        response.data = responseGet;
    } catch (error) {
        console.error("catch service", error);
        response = error.response;
    }

    return response;
};

export default activateAccount;
