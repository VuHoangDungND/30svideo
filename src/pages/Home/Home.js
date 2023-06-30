import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '~/store';
import * as showService from '~/services/showService';
import MainPage from '~/layouts/components/MainPage';
import Loading from '~/components/Loading';

function Home() {
    const state = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(actions.clearVideoList());
    }, []);

    console.log(state.currentVideoList);
    //lấy dữ liệu ở trang home

    useEffect(() => {
        let fetchApi;
        if (state.currentLogin) {
            fetchApi = async () => {
                const res = await showService.showHomeWithLogin(state.token);
                dispatch(actions.clearVideoList());
                dispatch(actions.addVideoList(res.data.data));
                console.log(1);
            };
        } else {
            fetchApi = async () => {
                const res = await showService.showHome();
                dispatch(actions.clearVideoList());
                dispatch(actions.addVideoList(res.data.data));

                console.log(2);
            };
        }

        if (state.currentLength === 0) fetchApi();
    }, [state.token, state.currentLogin, state.currentLength, dispatch]);

    return (
        <div>
            {state.currentLoading ? <Loading /> : <MainPage videoList={state.currentVideoList} />}
        </div>
    );
}

export default Home;
