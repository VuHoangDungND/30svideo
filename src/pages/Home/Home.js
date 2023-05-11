import { useEffect, useState } from 'react';
import Video from '~/components/Video';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '~/config';

function Home() {
    const [videoList, setVideoList] = useState([]);

    const list = [];
    // lấy dữ liệu vị trí của các componnet con
    const handlePushList = (top, isView, index) => {
        let isJoin = false;
        isJoin = list.every((item) => {
            return item.index !== index;
        });

        if (isJoin) {
            list.push({ index, isView, top });
        } else {
            list.forEach((item) => {
                if (item.index === index) {
                    item.isView = isView;
                    item.top = top;
                }
            });
        }
    };

    //di chuyển khi bấm phím
    useEffect(() => {
        const handleNextVideo = () => {
            console.log(list);
            let [videoPlaying] = list.filter((item) => {
                return item.isView === true;
            });
            console.log(videoPlaying.index, list.length);
            let nextVideo;
            if (videoPlaying.index === list.length - 1) nextVideo = videoPlaying;
            else {
                [nextVideo] = list.filter((item) => {
                    return item.index === videoPlaying.index + 1;
                });
            }

            window.scrollTo({
                top: nextVideo.top - window.screen.height + 60,
                behavior: 'smooth',
            });
        };
        window.addEventListener('keyup', handleNextVideo);
        return () => {
            window.removeEventListener('keyup', handleNextVideo);
        };
    }, [list]);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi = async () => {
            const videos = await getDocs(collection(db, 'videos'));
            const rs = [];
            videos.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });

            setVideoList(rs);
        };
        fetchApi();
    }, []);

    return (
        <>
            {videoList.map((result, index) => (
                <Video data={result} key={result.id} callback={handlePushList} index={index} />
            ))}
        </>
    );
}

export default Home;
