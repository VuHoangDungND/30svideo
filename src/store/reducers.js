import * as contactVideoService from '~/services/contactVideoService';

//initial state
let localState = JSON.parse(localStorage.getItem('user'));
if (localState) {
    const exptime = localState.exp;
    if (exptime * 1000 < new Date().getTime()) {
        localState = { ...localState, exp: null, token: null };
    } else localState = { ...localState, currentLogin: true };
}

const initstate = {
    token: null,
    exp: 0,
    volume: '0',
    theme: 'white',
    currentLogin: false,
    currentId: null,
    currentVideoList: [],
    currentIndex: 0,
    currentLength: 0,
    currentLoading: false,
    currentSuggestAccount: [],
    ...localState,
};

let fetchApi, videoList, listAccounts;

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
                token: action.payload.token,
                exp: action.payload.exp,
                currentId: action.payload.currentId,
            };

        case 'SET_LOGIN':
            return {
                ...state,
                currentLogin: action.payload,
            };

        case 'SET_FOLLOW':
            fetchApi = async () => await contactVideoService.follow(state.token, action.payload);
            fetchApi();

            videoList = state.currentVideoList;
            videoList = videoList.map((video) => {
                if (video.id_user === action.payload)
                    return { ...video, follow_user: 1, followed: video.followed + 1 };
                else return video;
            });
            videoList = videoList.map((video) => {
                if (video.id_user === state.currentId)
                    return { ...video, following: video.following + 1 };
                else return video;
            });

            listAccounts = state.currentSuggestAccount;
            listAccounts = listAccounts.map((account) => {
                if (account.id_user === action.payload)
                    return { ...account, follow_user: 1, followed: account.followed + 1 };
                else return account;
            });

            return { ...state, currentVideoList: videoList, currentSuggestAccount: listAccounts };

        case 'SET_UNFOLLOW':
            fetchApi = async () => await contactVideoService.unfollow(state.token, action.payload);
            fetchApi();
            videoList = state.currentVideoList;
            videoList = videoList.map((video) => {
                if (video.id_user === action.payload)
                    return { ...video, follow_user: 0, followed: video.followed - 1 };
                else return video;
            });
            videoList = videoList.map((video) => {
                if (video.id_user === state.currentId)
                    return { ...video, following: video.following - 1 };
                else return video;
            });

            listAccounts = state.currentSuggestAccount;
            listAccounts = listAccounts.map((account) => {
                if (account.id_user === action.payload)
                    return { ...account, follow_user: 0, followed: account.followed - 1 };
                else return account;
            });

            return { ...state, currentVideoList: videoList, currentSuggestAccount: listAccounts };

        case 'SET_LIKE':
            fetchApi = async () =>
                await contactVideoService.like(
                    state.token,
                    action.payload.id_user,
                    action.payload.id_video,
                );
            fetchApi();
            videoList = state.currentVideoList;
            videoList = videoList.map((video) => {
                if (video.id_video === action.payload.id_video)
                    return { ...video, like_video: 1, likes: video.likes + 1 };
                else return video;
            });
            videoList = videoList.map((video) => {
                if (video.id_user === action.payload.id_user)
                    return { ...video, total_likes: video.total_likes + 1 };
                else return video;
            });

            listAccounts = state.currentSuggestAccount;
            listAccounts = listAccounts.map((account) => {
                if (account.id_user === action.payload.id_user)
                    return { ...account, total_likes: account.total_likes + 1 };
                else return account;
            });

            return { ...state, currentVideoList: videoList, currentSuggestAccount: listAccounts };

        case 'SET_UNLIKE':
            fetchApi = async () =>
                await contactVideoService.unlike(
                    state.token,
                    action.payload.id_user,
                    action.payload.id_video,
                );
            fetchApi();
            videoList = state.currentVideoList;
            videoList = videoList.map((video) => {
                if (video.id_video === action.payload.id_video)
                    return { ...video, like_video: 0, likes: video.likes - 1 };
                else return video;
            });
            videoList = videoList.map((video) => {
                if (video.id_user === action.payload.id_user)
                    return { ...video, total_likes: video.total_likes - 1 };
                else return video;
            });

            listAccounts = state.currentSuggestAccount;
            listAccounts = listAccounts.map((account) => {
                if (account.id_user === action.payload.id_user)
                    return { ...account, total_likes: account.total_likes - 1 };
                else return account;
            });

            return { ...state, currentVideoList: videoList, currentSuggestAccount: listAccounts };

        case 'SET_DOWNLOAD':
            fetchApi = async () => await contactVideoService.download(action.payload);
            fetchApi();
            videoList = state.currentVideoList;
            videoList = videoList.map((video) => {
                if (video.id_video === action.payload)
                    return { ...video, download: video.download + 1 };
                else return video;
            });

            return { ...state, currentVideoList: videoList };

        case 'SET_SHARE':
            fetchApi = async () => await contactVideoService.share(action.payload);
            fetchApi();
            videoList = state.currentVideoList;
            videoList = videoList.map((video) => {
                if (video.id_video === action.payload) return { ...video, share: video.share + 1 };
                else return video;
            });

            return { ...state, currentVideoList: videoList };

        case 'ADD_VIDEOLIST':
            return {
                ...state,
                currentVideoList: [...state.currentVideoList, ...action.payload],
                currentLength: state.currentLength + 5,
            };

        case 'SET_CURRENT_INDEX':
            return {
                ...state,
                currentIndex: action.payload,
            };

        case 'CLEAR_VIDEOLIST':
            return {
                ...state,
                currentVideoList: [],
                currentIndex: 0,
                currentLength: 0,
                currentSuggestAccount: [],
            };

        case 'SET_LOADING':
            return {
                ...state,
                currentLoading: action.payload,
            };

        case 'SET_LOCATION_VIDEO':
            videoList = state.currentVideoList;
            videoList = videoList.map((video, index) => {
                if (action.payload.index === index) {
                    return { ...video, location: action.payload.location };
                } else return video;
            });
            return {
                ...state,
                currentVideoList: videoList,
            };

        case 'SET_SUGGEST_ACCOUNT':
            return {
                ...state,
                currentSuggestAccount: action.payload,
            };

        default:
            return state;
    }
};

export default reducers;
