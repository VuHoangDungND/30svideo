import * as contactVideoService from '~/services/contactVideoService';

//initial state
const localState = JSON.parse(localStorage.getItem('user'));

const initstate = {
    token: null,
    volume: '0',
    theme: 'white',
    currentLogin: false,
    ...localState,
};

let fetchApi;

const reducers = (state = initstate, action) => {
    switch (action.type) {
        case 'SET_VOLUME':
            return {
                ...state,
                volume: action.payload,
            };

        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload,
            };

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };

        case 'SET_LOGIN':
            return {
                ...state,
                currentLogin: action.payload,
            };

        case 'SET_LIKE':
            fetchApi = async () =>
                await contactVideoService.like(
                    state.token,
                    action.payload.id_user,
                    action.payload.id_video,
                );
            fetchApi();
            return state;

        case 'SET_UNLIKE':
            fetchApi = async () =>
                await contactVideoService.unlike(
                    state.token,
                    action.payload.id_user,
                    action.payload.id_video,
                );
            fetchApi();
            return state;

        case 'SET_DOWNLOAD':
            fetchApi = async () => await contactVideoService.download(action.payload.id_video);
            fetchApi();
            return state;

        case 'SET_SHARE':
            fetchApi = async () => await contactVideoService.share(action.payload.id_video);
            fetchApi();
            return state;

        default:
            return state;
    }
};

export default reducers;
