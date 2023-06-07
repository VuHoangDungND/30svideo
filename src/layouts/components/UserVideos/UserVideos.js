import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import VideoList from '../VideoList';
import * as showService from '~/services/showService';

import styles from './UserVideos.module.scss';

const cx = classNames.bind(styles);
function UserVideos({ id_user }) {
    const [videosTab, setVideosTab] = useState(true);
    const [myvideoList, setMyVideoList] = useState([]);

    //lấy dữ liệu dựa trên nick name
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showVideos(id_user);
            setMyVideoList(res.data.data);
        };
        fetchApi();
    }, [id_user]);

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
