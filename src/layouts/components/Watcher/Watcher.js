import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Watcher.module.scss';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { actions } from '~/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faPlay,
    faVolumeHigh,
    faVolumeMute,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AccountPreview from '~/components/AccountPreview';

const cx = classNames.bind(styles);

function Watcher() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.reducer);
    const navigate = useNavigate();

    const [isPlaying, setIsPlaying] = useState(true);
    const [seekTime, setSeekTime] = useState('0');
    const [playTime, setPlayTime] = useState('0');
    const videoRef = useRef();

    const handlePlay = (e) => {
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time) => {
        const date = new Date(time * 1000);
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const second = ('0' + date.getUTCSeconds()).slice(-2);
        if (hour) {
            return `${hour}:${('0' + minute).slice(-2)}:${second}`;
        }
        return `${minute}:${second}`;
    };

    //đọc thời gian video đã chạy và lưu
    const handleProgress = (state) => {
        setPlayTime(
            `${formatTime(state.playedSeconds)} / ${formatTime(videoRef.current.getDuration())}`,
        );

        setSeekTime(state.played);
    };

    const data = { nickname: 'dungne', full_name: 'hehe' };
    //Render tippy
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <div className={cx('video-info')}>
                    <ReactPlayer
                        ref={videoRef}
                        url={'https://www.youtube.com/watch?v=HV_HIWW09fE'}
                        loop
                        width="100%"
                        height="100vh"
                        muted={state.volume === '0'}
                        playing={isPlaying}
                        playsinline
                        onProgress={(e) => handleProgress(e)}
                    />
                </div>

                <div className={cx('video-cover')} onClick={(e) => handlePlay(e)}>
                    <button
                        className={cx('icon-close')}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(-1);
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    {isPlaying ? null : (
                        <FontAwesomeIcon icon={faPlay} className={cx('icon-play')} />
                    )}

                    <div className={cx('sound-controls')} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={cx('icon-sound')}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(actions.setVolume(state.volume === '0' ? '50' : '0'));
                            }}
                        >
                            {state.volume === '0' ? (
                                <FontAwesomeIcon icon={faVolumeMute} />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            )}
                        </button>

                        <input
                            value={state.volume}
                            className={cx('input-volume')}
                            type={'range'}
                            min="0"
                            max="100"
                            step="1"
                            onChange={(e) => {
                                dispatch(actions.setVolume(e.target.value));
                            }}
                        />
                    </div>

                    <div
                        className={cx('time-controls')}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className={cx('seekBarContainer')}>
                            <input
                                type="range"
                                value={seekTime}
                                max="1"
                                min="0"
                                step="0.01"
                                className={cx('seekBarProgress')}
                                onChange={(e) =>
                                    videoRef.current.seekTo(e.target.value, 'fraction')
                                }
                            ></input>

                            <div
                                className={cx('seekBar')}
                                style={{ transform: `scaleX(${seekTime}) translateY(-50%) ` }}
                            ></div>
                        </div>

                        <div className={cx('seekBarTimeContainer')}>{playTime}</div>
                    </div>
                </div>
            </div>
            <div className={cx('content-container')}>
                <div className={cx('info-container')}>
                    <div className={cx('user')}>
                        <div>
                            <Tippy
                                interactive
                                delay={[800, 0]}
                                offset={[-20, 0]}
                                placement="bottom"
                                render={() => renderPreview()}
                                popperOptions={{ strategy: 'fixed' }}
                            >
                                <Link className={cx('user-nickname')}>
                                    {data.nickname}
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                </Link>
                            </Tippy>
                        </div>
                        <div className={cx('user-fullname')}>{data.full_name}</div>
                    </div>
                </div>
                <div className={cx('main-content')}></div>
                <div className={cx('comment-container')}></div>
            </div>
        </div>
    );
}

export default Watcher;
