import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';
import MainPage from '~/layouts/components/MainPage';

function Home() {
    const [videoList, setVideoList] = useState([]);

    //lấy dữ liệu từ mysql

    useEffect(() => {
        const fetchApi = async () => {
            const data = await showService.showHome();
            setVideoList(data);
        };

        fetchApi();
    }, []);

    return <MainPage videoList={videoList} />;
}

export default Home;
