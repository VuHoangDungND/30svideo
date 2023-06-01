import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const get = async (path, option = {}) => {
    const respone = await httpRequest.get(path, option);

    return respone.data;
};

export const post = async (path, option = {}) => {
    const respone = await httpRequest.post(path, option);

    return respone.data;
};

export default httpRequest;
