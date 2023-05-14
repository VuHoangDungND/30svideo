import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { db } from '~/config';
import MainPage from '~/layouts/components/MainPage';

function Following() {
    const [videoList, setVideoList] = useState([]);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi = async () => {
            const videoRef = collection(db, 'videos');

            const followingQuery = query(videoRef, orderBy('username'));

            const videos = await getDocs(followingQuery);
            const rs = [];
            videos.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });

            setVideoList(rs);
        };
        fetchApi();
    }, []);

    return <MainPage videoList={videoList} />;
}

export default Following;
