import axios from 'axios';
import fileDownload from 'js-file-download';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Watcher.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as showService from '~/services/showService';
import { actions } from '~/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown,
    faArrowUp,
    faCode,
    faComment,
    faDownload,
    faHeart,
    faMusic,
    faPlay,
    faVolumeHigh,
    faVolumeMute,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Account from '~/components/Account';
import * as watchService from '~/services/watchService';
import config from '~/config';
import Button from '~/components/Button';
import Comment from '../Comment';

const cx = classNames.bind(styles);

function Watcher() {
    const location = useLocation();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.reducer);
    const navigate = useNavigate();
    const [data, setData] = useState({});

    // gọi API
    useEffect(() => {
        const address = location.pathname.split('/');
        let res;
        const loadVideo = async () => {
            if (state.currentLogin)
                res = await watchService.watchWithLogin(
                    state.token,
                    address[1].slice(1),
                    address[3],
                );
            else res = await watchService.watch(address[1].slice(1), address[3]);
            var newData = res.data.data[0];
            setData({
                ...newData,
                follow_user: newData.follow_user === 1,
                like_video: newData.like_video === 1,
            });
        };
        loadVideo();
    }, [location, state.token, state.currentLogin]);

    // goi them du lieu khi den video cuoi
    useEffect(() => {
        let res;
        const loadMoreVideo = async () => {
            if (state.currentLogin) res = await showService.showHomeWithLogin(state.token);
            else res = await showService.showHome();
            dispatch(actions.addVideoList(res.data.data));
        };
        if (state.currentIndex === state.currentLength - 1) loadMoreVideo();
    }, [dispatch, state.currentIndex, state.currentLength, state.currentLogin, state.token]);

    // dữ liệu của video
    const [isPlaying, setIsPlaying] = useState(true);
    const [seekTime, setSeekTime] = useState('0');
    const [playTime, setPlayTime] = useState('0');
    const videoRef = useRef();

    // chuyen doi time
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

    //handle play
    const handlePlay = (e) => {
        setIsPlaying(!isPlaying);
    };

    //handle up
    const handleUp = (e) => {
        e.stopPropagation();
        let nextVideo = state.currentVideoList[state.currentIndex - 1];
        dispatch(actions.setCurrentIndex(state.currentIndex - 1));
        navigate(`/@${nextVideo.id_user}/video/${nextVideo.id_video}`);
    };

    //handle down
    const handleDown = async (e) => {
        e.stopPropagation();
        let nextVideo = state.currentVideoList[state.currentIndex + 1];
        dispatch(actions.setCurrentIndex(state.currentIndex + 1));
        navigate(`/@${nextVideo.id_user}/video/${nextVideo.id_video}`);
    };

    //handle follow
    const handleFollow = () => {
        if (state.currentLogin) {
            if (state.currentLogin) {
                if (data.follow_user) {
                    dispatch(actions.setUnFollow(data.id_user));
                    setData({ ...data, follow_user: false, followed: data.followed - 1 });
                } else {
                    dispatch(actions.setFollow(data.id_user));
                    setData({ ...data, follow_user: true, followed: data.followed + 1 });
                }
            }
        } else alert('Đăng nhập để sử dụng tính năng trên');
    };

    //handle like video
    const handleLikeVideo = () => {
        if (state.currentLogin) {
            if (data.like_video) {
                dispatch(actions.setUnLike({ id_user: data.id_user, id_video: data.id_video }));
                setData({ ...data, like_video: false, likes: data.likes - 1 });
            } else {
                dispatch(actions.setLike({ id_user: data.id_user, id_video: data.id_video }));
                setData({ ...data, like_video: true, likes: data.likes + 1 });
            }
        } else alert('Please login to like video');
    };

    //handle download video
    const handleDownload = () => {
        if (state.currentLogin) {
            axios
                .get(data.video_url, {
                    responseType: 'blob',
                })
                .then((res) => {
                    fileDownload(res.data, `${data.id_video}.mp4`);
                });
            dispatch(actions.setDownload(data.id_video));
            setData({ ...data, download: data.download + 1 });
        } else alert('Please login to download video');
    };

    return (
        <div className={cx('wrapper')}>
            {/* Phần video góc phải */}
            <div className={cx('video-container')}>
                <div className={cx('video-info')}>
                    <ReactPlayer
                        ref={videoRef}
                        url={data.video_url}
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
                            navigate(config.routes.home);
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    {state.currentIndex === 0 ? null : (
                        <button className={cx('icon-up')} onClick={handleUp}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                    )}

                    <button className={cx('icon-down')} onClick={handleDown}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>

                    <div className={cx('icon-play')}>
                        {isPlaying ? null : <FontAwesomeIcon icon={faPlay} />}
                    </div>

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

            {/* Phần video góc trai */}
            <div className={cx('content-container')}>
                <div className={cx('info-container')}>
                    <Account data={data} watcher />
                    {state.currentId === data.id_user ? null : (
                        <Button
                            outline={!data.follow_user}
                            primary={data.follow_user}
                            className={cx('follow-btn')}
                            onClick={handleFollow}
                        >
                            {data.follow_user ? ' Following' : 'Follow'}
                        </Button>
                    )}
                </div>
                <div className={cx('main-content')}>
                    <div className={cx('description')}>{data.description}</div>
                    <div className={cx('music')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <div className={cx('music-name')}>{data.music}</div>
                    </div>

                    {/* list icon */}
                    <div className={cx('contact-container')}>
                        <div className={cx('icon-row')}>
                            <div className={cx('icon-video')}>
                                <div className={cx('icon-video-item')}>
                                    <div className={cx('icon-wrapper')} onClick={handleLikeVideo}>
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className={cx('icon', data.like_video ? 'like' : '')}
                                        />
                                    </div>
                                    <span className={cx('icon-video-text')}>{data.likes}</span>
                                </div>
                                <div className={cx('icon-video-item')}>
                                    <div className={cx('icon-wrapper')}>
                                        <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                                    </div>
                                    <span className={cx('icon-video-text')}>{data.comments}</span>
                                </div>
                                <div className={cx('icon-video-item')}>
                                    <div className={cx('icon-wrapper')} onClick={handleDownload}>
                                        <FontAwesomeIcon icon={faDownload} className={cx('icon')} />
                                    </div>
                                    <span className={cx('icon-video-text')}>{data.download}</span>
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
                            <button
                                className={cx('copylink-button')}
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                            >
                                Copy link
                            </button>
                        </div>
                    </div>
                </div>

                <Comment id_video={data.id_video} />
            </div>
        </div>
    );
}

export default Watcher;
