import classNames from 'classnames/bind';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import styles from './VideoItem.module.scss';
import { useEffect, useState } from 'react';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function VideoItem({ video_url, isInView }) {
    const state = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    const [isPlaying, setIsPlaying] = useState(isInView);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        setIsPlaying(isInView);
    }, [isInView]);

    return (
        <div className={cx('wrapper')} onClick={() => {}}>
            <ReactPlayer
                url={video_url}
                loop
                width="100%"
                height="calc(450px + ((100vw - 768px) / 1152) * 200)"
                muted={state.volume === '0'}
                playing={isPlaying}
                playsinline
            />

            <div className={cx('cover')}>
                <button className={cx('icon-play')} onClick={handlePlay}>
                    {isPlaying ? (
                        <FontAwesomeIcon icon={faPause} />
                    ) : (
                        <FontAwesomeIcon icon={faPlay} />
                    )}
                </button>

                <div className={cx('sound-controls')}>
                    <input
                        value={state.volume}
                        className={cx('input-volume')}
                        type={'range'}
                        min="0"
                        max="100"
                        step="1"
                        onInput={(e) => {
                            dispatch(actions.setVolume(e.target.value));
                        }}
                    />
                </div>
                <button
                    className={cx('icon-sound')}
                    onClick={() => {
                        dispatch(actions.setVolume(state.volume === '0' ? '50' : '0'));
                    }}
                >
                    {state.volume === '0' ? (
                        <FontAwesomeIcon icon={faVolumeMute} />
                    ) : (
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    )}
                </button>
            </div>
            {/* các nút tương tác video */}
        </div>
    );
}

export default VideoItem;

VideoItem.propTypes = {
    video_url: PropTypes.string.isRequired,
    isInView: PropTypes.bool,
};
