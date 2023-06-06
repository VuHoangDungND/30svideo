import * as httpRequest from '../utils/httpRequest';

export const register = async (userData) => {
    try {
        const res = await httpRequest.post(`/auth/register`, userData);
        return res;
    } catch (error) {
        console.log(error);
    }
};
