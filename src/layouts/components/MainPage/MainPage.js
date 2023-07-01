import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VideoInfo from '~/components/VideoInfo';
import { actions } from '~/store';
import * as showService from '~/services/showService';

function MainPage() {
    const state = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    //lấy dữ liệu ở trang home khi moi vao
    useEffect(() => {
        let fetchApi;
        if (state.currentLogin) {
            fetchApi = async () => {
                const res = await showService.showHomeWithLogin(state.token);
                dispatch(actions.addVideoList(res.data.data));
            };
        } else {
            fetchApi = async () => {
                const res = await showService.showHome();
                dispatch(actions.addVideoList(res.data.data));
            };
        }

        if (state.currentLength === 0) fetchApi();
    }, [state.token, state.currentLogin, state.currentLength, dispatch]);

    useEffect(() => {
        if (state.currentVideoList[state.currentIndex])
            window.scrollTo({
                top: state.currentVideoList[state.currentIndex].location,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // load video when scroll to max height
    const loadMoreVideo = useCallback(async () => {
        let res;
        if (state.currentLogin) res = await showService.showHomeWithLogin(state.token);
        else res = await showService.showHome();
        dispatch(actions.addVideoList(res.data.data));
    }, [dispatch, state.token, state.currentLogin]);

    //handle scroll
    let handleScroll = useCallback(
        (e) => {
            if (
                window.innerHeight + e.target.documentElement.scrollTop >=
                e.target.documentElement.scrollHeight
            ) {
                loadMoreVideo();
            }
        },
        [loadMoreVideo],
    );

    //add event listeners
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // handle move to next video
    const handleMoveToVideo = useCallback(
        (event) => {
            event.preventDefault();
            let nextVideo = state.currentVideoList[state.currentIndex];
            switch (event.keyCode) {
                case 40:
                    if (state.currentIndex !== state.currentLength - 1) {
                        nextVideo = state.currentVideoList[state.currentIndex + 1];
                        dispatch(actions.setCurrentIndex(state.currentIndex + 1));
                    }
                    window.scrollTo({
                        top: nextVideo.location,
                        behavior: 'smooth',
                    });
                    break;

                case 38:
                    if (state.currentIndex !== 0) {
                        nextVideo = state.currentVideoList[state.currentIndex - 1];
                        dispatch(actions.setCurrentIndex(state.currentIndex - 1));
                    }
                    window.scrollTo({
                        top: nextVideo.location,
                        behavior: 'smooth',
                    });
                    break;

                default:
                    break;
            }
        },
        [dispatch, state.currentIndex, state.currentLength, state.currentVideoList],
    );

    //add event listeners
    useEffect(() => {
        window.addEventListener('keyup', handleMoveToVideo);

        return () => {
            window.removeEventListener('keyup', handleMoveToVideo);
        };
    }, [handleMoveToVideo]);

    return (
        <>
            {state.currentVideoList.map((result, index) => (
                <VideoInfo data={result} key={index} index={index} />
            ))}
        </>
    );
}

export default MainPage;
