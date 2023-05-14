import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '~/config';
import MainPage from '~/layouts/components/MainPage';
function Explore() {
    const [videoList, setVideoList] = useState([]);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi = async () => {
            const videoRef = collection(db, 'videos');

            const tmp = 'Dance';

            const exploreQuery = query(
                videoRef,
                where('music', '>=', tmp),
                where('music', '<=', tmp + '\uf8ff'),
            );
            const videos = await getDocs(exploreQuery);
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

export default Explore;
