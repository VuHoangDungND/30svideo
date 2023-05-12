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
        window.handleMoveToVideo = function (event) {
            let [videoPlaying] = list.filter((item) => {
                return item.isView === true;
            });
            let nextVideo;
            switch (event.keyCode) {
                case 40:
                    if (videoPlaying.index === list.length - 1) nextVideo = videoPlaying;
                    else {
                        [nextVideo] = list.filter((item) => {
                            return item.index === videoPlaying.index + 1;
                        });
                    }
                    break;
                case 38:
                    if (videoPlaying.index === 0) nextVideo = videoPlaying;
                    else {
                        [nextVideo] = list.filter((item) => {
                            return item.index === videoPlaying.index - 1;
                        });
                    }
                    break;
                default:
                    break;
            }

            if (nextVideo)
                window.scrollTo({
                    top: nextVideo.top,
                    behavior: 'smooth',
                });
        };

        window.addEventListener('keyup', window.handleMoveToVideo);
        return () => {
            window.removeEventListener('keyup', window.handleMoveToVideo);
            delete window.handleNextVideo;
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
