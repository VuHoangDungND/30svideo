//initial state
const localState = JSON.parse(localStorage.getItem('user'));

const initstate = {
    token: null,
    volume: '0',
    theme: 'white',
    currentLogin: false,
    ...localState,
};

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

        default:
            return state;
    }
};

export default reducers;
