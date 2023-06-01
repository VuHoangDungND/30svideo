import * as httpRequest from '../utils/httpRequest';

export const showHome = async () => {
    try {
        const res = await httpRequest.get('/');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const showSuggestAccount = async (type) => {
    try {
        const res = await httpRequest.get(`/user/suggestAccounts`, {
            params: {
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const showUserProfile = async (id_user) => {
    try {
        const res = await httpRequest.get(`/user/userProfile`, {
            params: {
                id_user,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const showVideos = async (id_user) => {
    try {
        const res = await httpRequest.get(`/user/videos`, {
            params: {
                id_user,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
