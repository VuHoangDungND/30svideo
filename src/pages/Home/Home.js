import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';
import MainPage from '~/layouts/components/MainPage';
import { useSelector } from 'react-redux';

function Home() {
    const [videoList, setVideoList] = useState([]);
    const state = useSelector((state) => state.reducer);

    //lấy dữ liệu ở trang home

    useEffect(() => {
        let fetchApi;
        if (state.currentLogin) {
            fetchApi = async () => {
                const res = await showService.showHomeWithLogin(state.token);
                setVideoList(res.data.data);
                console.log(1);
            };
        } else {
            fetchApi = async () => {
                const res = await showService.showHome();
                setVideoList(res.data.data);
                console.log(2);
            };
        }

        fetchApi();
    }, [state.token, state.currentLogin]);

    return <MainPage videoList={videoList} />;
}

export default Home;
