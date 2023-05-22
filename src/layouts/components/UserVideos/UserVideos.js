import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/config';
import VideoList from '../VideoList';

import styles from './UserVideos.module.scss';

const cx = classNames.bind(styles);
function UserVideos() {
    const [videosTab, setVideosTab] = useState(true);
    const [myvideoList, setMyVideoList] = useState([]);

    //lấy dữ liệu từ firebase
    useEffect(() => {
        const fetchApi = async () => {
            const videos = await getDocs(collection(db, 'videos'));
            const rs = [];
            videos.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });

            setMyVideoList(rs);
        };
        fetchApi();
    }, []);

    const handleVideosTab = () => {
        setVideosTab(true);
    };

    const handleLikedTab = () => {
        setVideosTab(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('videoFeedTab')}>
                <div className={cx('videos-tab', { active: videosTab })} onClick={handleVideosTab}>
                    <span>Videos</span>
                </div>

                <div className={cx('liked-tab', { active: !videosTab })} onClick={handleLikedTab}>
                    <FontAwesomeIcon icon={faLock} />
                    <span>Liked</span>
                </div>

                <div className={cx('bottom-line')}></div>
            </div>
            {videosTab ? <VideoList data={myvideoList} /> : <VideoList data={myvideoList} />}
        </div>
    );
}

export default UserVideos;
