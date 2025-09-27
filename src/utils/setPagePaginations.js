export default function setParams(page) {
    const limit = 5;
    const offset = (page - 1) * limit;
    return `&limit=${limit}&page=${page}&offset=${offset}`
}