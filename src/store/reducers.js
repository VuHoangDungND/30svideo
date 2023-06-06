//initial state

const initstate = {
    token: null,
    volume: '0',
    theme: 'white',
    modalLogin: false,
};

const localState = localStorage.getItem('user') || initstate;

const reducers = (state = localState, action) => {
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

        case 'SET_MODAL-LOGIN':
            return {
                ...state,
                modalLogin: action.payload,
            };

        default:
            return state;
    }
};

export default reducers;
