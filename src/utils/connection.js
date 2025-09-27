import config from "../config/config";
import { USER_LOCALSTORAGE_KEY } from "../config/config";

const {
    URL: { STOP_APP_URL_BACK, STOP_APP_URL_AFIP },
} = config;

const MESSAGE_ERROR = {
    estado: 0,
    message: "No se pudo realizar la petición",
};

const pendingRequests = {};

/**
 * # Connection
 * Función que realiza la conexión con el servidor
 *
 * Parametros:
 *
 * - method: método de la petición (GET, POST, PUT, DELETE)
 * - url: url de la petición
 * - extraHeaders: headers adicionales
 * - body: cuerpo de la petición
 * - formDataMode: si es true, se enviará el cuerpo como un formulario
 * - signal: se usa para abortar la petición
 * - abortRepect: si es true, se cancela al repetir la misma petición
 * - responseType: tipo de respuesta esperada ("json", "blob", "text")
 * @param {*} param
 * @returns
 */
export default async function connection({
    method = "GET",
    url = "",
    extraHeaders = {},
    body = {},
    formDataMode = false,
    signal = null,
    abortRepect = false,
    responseType = "json",
    apiAfip = false,
}) {
    const headers = new Headers({
        "Accept-Charset": "utf-8",
        "Access-Control-Allow-Origin": "*",
    });

    // No establecer Content-Type manualmente si es FormData
    if (!formDataMode) {
        headers.append("Content-Type", "application/json");
    }

    if (Object.keys(extraHeaders).length !== 0) {
        for (let headers_key in extraHeaders) {
            headers.append(headers_key, extraHeaders[headers_key]);
        }
    }

    if (abortRepect && pendingRequests[url]) {
        pendingRequests[url].abort();
    }

    const controller = new AbortController();
    signal = controller.signal;
    pendingRequests[url] = controller;

    const options = {
        method: method,
        headers: headers,
        redirect: "follow",
        signal: signal,
        credentials: 'include'
    };

    if (body && (method === "POST" || method === "PUT")) {
        options.body = formDataMode ? body : JSON.stringify(body);
    }
    let response;
    try {
        const fetchData = await fetch(
            (apiAfip ? STOP_APP_URL_AFIP : STOP_APP_URL_BACK) + url,
            options,
        );
        // Manejo del responseType
        if (responseType === "json") {
            response = await fetchData.json();
        } else if (responseType === "blob") {
            response = await fetchData.blob();
        } else if (responseType === "text") {
            response = await fetchData.text();
        } else {
            throw new Error(`responseType '${responseType}' no es soportado.`);
        }
        // if (fetchData?.status === 401) {
        //   localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        // }
        if (!response?.status) {
            response.status = fetchData.status;
        }
    } catch (error) {
        if (error.name === "AbortError") {
            response = {
                ...MESSAGE_ERROR,
                message: "Petición cancelada",
                codeError: 103,
            };
        } else {
            response = { ...MESSAGE_ERROR, message: error.message };
        }
    } finally {
        delete pendingRequests[url];
        return response;
    }
}
