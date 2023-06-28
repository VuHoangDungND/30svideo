import * as httpRequest from '../utils/httpRequest';

export const showHome = async () => {
    try {
        const res = await httpRequest.get('/');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const showHomeWithLogin = async (token) => {
    try {
        const res = await httpRequest.get('/user', {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const showSuggestAccount = async (token) => {
    try {
        const res = await httpRequest.get(`/user/suggestAccounts`, {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const showMyUser = async (token) => {
    try {
        const res = await httpRequest.get(`/user/showMyUser`, {
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const showUserProfile = async (id_user) => {
    try {
        const res = await httpRequest.get(`/userProfile`, {
            params: {
                id_user,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const showUserProfileWithLogin = async (token, id_user) => {
    try {
        const res = await httpRequest.get(`/user/userProfile`, {
            params: {
                id_user,
            },
            headers: { Authorization: 'Bearer ' + token },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const showVideos = async (id_user) => {
    try {
        const res = await httpRequest.get(`/user/listUserVideos`, {
            params: {
                id_user,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
