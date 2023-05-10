import { useEffect, useState } from 'react';
import Video from '~/components/Video';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '~/config';

function Home() {
    const [videoList, setVideoList] = useState([]);
    window.addEventListener('keydown');
    console.log(window);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi1 = async () => {
            const end = await getDocs(collection(db, 'videos'));
            const rs = [];
            end.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });
            setVideoList(rs);
        };
        fetchApi1();
    }, []);

    return (
        <>
            {videoList.map((result, index) => (
                <Video key={result.id} data={result} />
            ))}
        </>
    );
}

export default Home;
