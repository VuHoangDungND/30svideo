import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import VideoList from '../VideoList';
import * as showService from '~/services/showService';

import styles from './UserVideos.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function UserVideos({ id_user }) {
    const state = useSelector((state) => state.reducer);
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
            {videosTab ? (
                myvideoList.length === 0 ? (
                    <div className={cx('warn')}> Người dùng này chưa đăng video nào</div>
                ) : (
                    <VideoList data={myvideoList} />
                )
            ) : id_user === state.currentId ? (
                <VideoList data={myvideoList} />
            ) : (
                <div className={cx('warn')}> Video ở chế độ private</div>
            )}
        </div>
    );
}

export default UserVideos;
