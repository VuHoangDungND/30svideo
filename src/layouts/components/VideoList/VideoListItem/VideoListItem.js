import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';

import styles from './VideoListItem.module.scss';

const cx = classNames.bind(styles);

function VideoListItem({ videoData }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <ReactPlayer url={videoData.video_url} width="191px" />
            </div>
            <div className={cx('desc')}>
                <span>{videoData.desc}</span>
            </div>
        </div>
    );
}
VideoListItem.propTypes = {
    videoData: PropTypes.object.isRequired,
};
export default VideoListItem;
