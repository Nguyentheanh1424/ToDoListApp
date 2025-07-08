import axios from 'axios';

const instance = axios.create({
    baseURL: "https://686656f289803950dbb24cfa.mockapi.io",
    timeout: 5000,
});

export default instance;