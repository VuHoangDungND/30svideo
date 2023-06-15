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
    faCode,
    faHeart,
    faMusic,
    faPlay,
    faVolumeHigh,
    faVolumeMute,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AccountPreview from '~/components/AccountPreview';
import Image from '~/components/Image';
import { faFacebook, faInstagram, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Account from '~/components/Account';

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

    const data = {
        nickname: 'dungne',
        full_name: 'hehe',
        avatar: null,
        description: 'Đặng Thu Hà thử mặc đồ của chị Dung Editor - h.ở đam mê, b.ó táo bạo',
        music: 'null',
        like: '1000',
    };
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
            {/* Phần video góc phải */}
            <div className={cx('video-container')}>
                <div className={cx('video-info')}>
                    <ReactPlayer
                        ref={videoRef}
                        url={'https://www.youtube.com/watch?v=R2XaalGNq8k&t=1216s'}
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
                    <Tippy
                        interactive
                        delay={[800, 0]}
                        offset={[-20, 0]}
                        placement="bottom"
                        render={() => renderPreview()}
                        popperOptions={{ strategy: 'fixed' }}
                    >
                        <div className={cx('info')}>
                            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />

                            <Link className={cx('user-nickname')}>
                                {data.nickname}
                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                            </Link>
                            <div className={cx('user-fullname')}>{data.full_name}</div>
                        </div>
                    </Tippy>
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('description')}>{data.description}</div>
                    <div className={cx('music')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <div className={cx('music-name')}>{data.music}</div>
                    </div>

                    <div className={cx('contact-container')}>
                        <div className={cx('icon-row')}>
                            <div className={cx('icon-video')}>
                                <div className={cx('icon-video-item')}>
                                    <div className={cx('icon-wrapper')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                                    </div>
                                    <span className={cx('icon-video-text')}>{data.like}</span>
                                </div>
                                <div className={cx('icon-video-item')}>
                                    <div className={cx('icon-wrapper')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                                    </div>
                                    <span className={cx('icon-video-text')}>{data.like}</span>
                                </div>
                                <div className={cx('icon-video-item')}>
                                    <div className={cx('icon-wrapper')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                                    </div>
                                    <span className={cx('icon-video-text')}>{data.like}</span>
                                </div>
                            </div>
                            <div className={cx('icon-share')}>
                                <div className={cx('icon-share-item')}>
                                    <FontAwesomeIcon icon={faCode} />
                                </div>
                                <div className={cx('icon-share-item')}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </div>
                                <div className={cx('icon-share-item')}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </div>
                                <div className={cx('icon-share-item')}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                                <div className={cx('icon-share-item')}>
                                    <FontAwesomeIcon icon={faTelegram} />
                                </div>
                            </div>
                        </div>

                        <div className={cx('copylink-container')}>
                            <p className={cx('copylink-text')}>{window.location.href}</p>
                            <button className={cx('copylink-button')}>Copy link</button>
                        </div>
                    </div>
                </div>

                <div className={cx('comment-container')}>
                    <div className={cx('comment-list-container')}>
                        <div className={cx('comment-item-container')}>
                            <div className={cx('comment-content-container')}>
                                <Account data={data} />
                                <p className="comment-text">{data.description}</p>
                                <p className="comment-subtext">
                                    <span className={cx('comment-time')}>12h</span>
                                    <span className={cx('comment-reply')}>reply</span>
                                </p>
                            </div>
                        </div>

                        <div className={cx('comment-item-container')}>
                            <div className={cx('comment-content-container')}>
                                <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
                                <div className={cx('info')}>
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
                                                <FontAwesomeIcon
                                                    className={cx('check')}
                                                    icon={faCheckCircle}
                                                />
                                            </Link>
                                        </Tippy>
                                    </div>
                                </div>
                                <p className="comment-text">{data.description}</p>
                                <p className="comment-subtext">
                                    <span className={cx('comment-time')}>12h</span>
                                    <span className={cx('comment-reply')}>reply</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('bottom-comment-container')}>
                    <div className={cx('comment-bar')}>Here to comment</div>
                </div>
            </div>
        </div>
    );
}

export default Watcher;
