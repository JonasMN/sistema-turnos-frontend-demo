import config from "../../config/config";

const clientId = 'jb849d483b883';
const origin = window.location.origin;

const validateToken = async ({ token }) => {
    let response = {};
    try {
        const headers = {
            'Content-Type': 'application/json',
            'client-id': clientId,
            ...origin != null ? { 'origin': origin ?? '' } : {}
        };

        // Solo agregar el header token si se proporciona
        // Si no se proporciona, el backend debería usar las cookies
        if (token) {
            headers['token'] = token;
        }

        const responseGet = await fetch(`${config.URL.STOP_APP_URL}/auth/api/v1/auth/validate`, {
            method: 'GET',
            headers,
            credentials: 'include' // Importante: incluir cookies en la petición
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

export default validateToken;
