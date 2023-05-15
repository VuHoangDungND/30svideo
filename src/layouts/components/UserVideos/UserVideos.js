import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './UserVideos.module.scss';

const cx = classNames.bind(styles);
function UserVideos() {
    const [videosTab, setVideosTab] = useState(true);

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
            <h1>Here</h1>
        </div>
    );
}

export default UserVideos;
