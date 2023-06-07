import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';
import MainPage from '~/layouts/components/MainPage';

function Home() {
    const [videoList, setVideoList] = useState([]);

    //lấy dữ liệu ở trang home

    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showHome();
            setVideoList(res.data.data);
        };

        fetchApi();
    }, []);

    return <MainPage videoList={videoList} />;
}

export default Home;
