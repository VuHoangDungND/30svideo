import { USER_LOGIN, USER_LOGOUT } from './constants';

//initial state

const initstate = {
    userInfo: null,
};

const userReducer = (state = initstate, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userInfo: action.data,
            };

        case USER_LOGOUT:
            return {
                ...state,
                userInfo: null,
            };
        default:
            return state;
    }
};

export default userReducer;
