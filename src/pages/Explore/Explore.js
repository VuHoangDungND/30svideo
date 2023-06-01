import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';

import MainPage from '~/layouts/components/MainPage';
function Explore() {
    const [videoList, setVideoList] = useState([]);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi = async () => {
            const data = await showService.showHome('/');

            setVideoList(data);
        };
        fetchApi();
    }, []);

    return <MainPage videoList={videoList} />;
}

export default Explore;
