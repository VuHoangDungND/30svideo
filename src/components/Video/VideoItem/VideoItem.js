import classNames from 'classnames/bind';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import styles from './VideoItem.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function VideoItem({ video_url, isInView }) {
    const [isPlaying, setIsPlaying] = useState(isInView);
    const [isMuted, setIsMuted] = useState(true);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        setIsPlaying(isInView);
    }, [isInView]);

    return (
        <div className={cx('wrapper')}>
            <ReactPlayer
                url={video_url}
                loop
                width="100%"
                height="calc(450px + ((100vw - 768px) / 1152) * 200)"
                muted={isMuted}
                playing={isPlaying}
            />

            {/* các nút tương tác video */}
            <button className={cx('play')} onClick={handlePlay}>
                {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
            <button className={cx('sound')} onClick={handleMute}>
                {isMuted ? (
                    <FontAwesomeIcon icon={faVolumeMute} />
                ) : (
                    <FontAwesomeIcon icon={faVolumeHigh} />
                )}
            </button>
        </div>
    );
}

export default VideoItem;

VideoItem.propTypes = {
    video_url: PropTypes.string.isRequired,
    isInView: PropTypes.bool,
};
