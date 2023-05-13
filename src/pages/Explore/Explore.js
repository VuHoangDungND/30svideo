import { useEffect, useState } from 'react';
import { collection, endAt, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '~/config';
import MainPage from '~/layouts/components/MainPage';
function Explore() {
    const [videoList, setVideoList] = useState([]);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi = async () => {
            const videoRef = collection(db, 'videos');

            const tmp = 'Dance';

            const q = query(
                videoRef,
                where('music', '>=', tmp),
                where('music', '<=', tmp + '\uf8ff'),
            );
            const videos = await getDocs(q);
            const rs = [];
            videos.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });

            setVideoList(rs);
        };
        fetchApi();
    }, []);

    console.log(videoList);
    return <MainPage videoList={videoList} />;
}

export default Explore;
