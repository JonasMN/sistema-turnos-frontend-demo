import config from "../../config/config";

const logout = async (clientId = null) => {
    let response = {};
    try {
        const responseGet = await fetch(`${config.URL.STOP_APP_URL}/auth/api/v1/auth/local/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'client-id': clientId ?? 'jb849d483b883',
            },
            credentials: 'include'
        });

        if (!responseGet.ok) {
            throw new Error(`HTTP error! status: ${responseGet.status}`);
        }

        const data = await responseGet.json();
        response.data = data;
    } catch (error) {
        console.error("catch service", error);
        response = error.response || { error: error.message };
    }

    return response;
};

export default logout;
