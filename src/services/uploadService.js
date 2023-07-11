import * as httpRequest from '../utils/httpRequest';

export const uploadVideo = async (token, formData) => {
    try {
        const res = await httpRequest.post(`/user/uploadVideo`, formData, {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const uploadImage = async (token, formData) => {
    try {
        const res = await httpRequest.post(`/user/uploadImage`, formData, {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
