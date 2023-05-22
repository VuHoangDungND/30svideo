import { USER_LOGIN, USER_LOGOUT } from './constants';

//initial state

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initstate = {
    userInfo: userInfoFromStorage,
    visitUser: null,
};

const userReducer = (state = initstate, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userInfo: {
                    avatar: 'https://yt3.ggpht.com/7gYiLHklRrTSJ0iToRaytTSYsilwNYbdDdORgpNAhWMC9Xrp3UXo9LxzTInQ_-S35P5-ZJzjMw=s48-c-k-c0x00ffffff-no-rj',
                    username: 'Thích Nghe Nhạc',
                    full_name: 'Love everyone',
                    bio: 'Không có gì đâu',
                },
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
