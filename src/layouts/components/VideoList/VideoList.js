import PropTypes from 'prop-types';
import VideoListItem from './VideoListItem';
import classNames from 'classnames/bind';

import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);

function VideoList({ data }) {
    return (
        <div className={cx('wrapper')}>
            {data.map((videoData, index) => (
                <VideoListItem videoData={videoData} />
            ))}
        </div>
    );
}

VideoList.propTypes = {
    data: PropTypes.object.isRequired,
};

export default VideoList;
