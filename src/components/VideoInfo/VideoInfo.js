import Image from '../Image';
import classNames from 'classnames/bind';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './VideoInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faComment,
    faDownload,
    faHeart,
    faMusic,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import VideoItem from '../VideoItem';
import AccountPreview from '~/components/AccountPreview';
import { Link, useNavigate } from 'react-router-dom';
import {
    faEmber,
    faFacebook,
    faInstagram,
    faTelegram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Menu from '../Popper/Menu';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function VideoInfo({ data, callback, index }) {
    const state = useSelector((state) => state.reducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isInView, setIsInView] = useState(false);
    const [videoInfo, setVideoInfo] = useState({
        ...data,
        follow_user: data.follow_user === 1,
        like_video: data.like_video === 1,
    });

    useEffect(() => {
        setVideoInfo({
            ...data,
            follow_user: data.follow_user === 1,
            like_video: data.like_video === 1,
        });
    }, [data]);

    const viewRef = useRef(null);

    const shareMenu = [
        {
            icon: <FontAwesomeIcon icon={faEmber} />,
            title: 'Embedded',
        },
        {
            icon: <FontAwesomeIcon icon={faFacebook} />,
            title: 'Share to Facebook',
            to: 'https://www.facebook.com/',
        },
        {
            icon: <FontAwesomeIcon icon={faInstagram} />,
            title: 'Share to Instagram',
            to: 'https://instagram.com/',
        },
        {
            icon: <FontAwesomeIcon icon={faTwitter} />,
            title: 'Share to Twitter',
            to: 'https://twitter.com/',
        },
        {
            icon: <FontAwesomeIcon icon={faTelegram} />,
            title: 'Share to Telegram',
            to: 'https://web.telegram.org/',
        },
    ];

    // tạo biến để xem xét một object có nằm trong viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                callback(
                    viewRef.current.offsetTop +
                        viewRef.current.offsetHeight -
                        window.visualViewport.height,
                    entry.isIntersecting,
                    index,
                );
            },
            { threshold: 0, rootMargin: '-49.9% 0px -49.9% 0px ' },
        );

        observer.observe(viewRef.current);

        return () => {
            observer.disconnect();
        };
    }, [callback, index]);

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

    //handle follow
    const handleFollow = () => {
        if (state.currentLogin) {
            if (state.currentLogin) {
                if (videoInfo.follow_user) {
                    //     dispatch(
                    //         actions.setUnLike({ id_user: videoInfo.id_user, id_video: videoInfo.id_video }),
                    //     );
                    setVideoInfo({ ...videoInfo, follow_user: false });
                } else {
                    //     dispatch(actions.setLike({ id_user: videoInfo.id_user, id_video: videoInfo.id_video }));
                    setVideoInfo({ ...videoInfo, follow_user: true });
                }
            }
        } else alert('Đăng nhập để sử dụng tính năng trên');
    };

    // handle comment
    const handleComment = () => {
        navigate(`/@${videoInfo.id_user}/video/${videoInfo.id_video}`);
    };

    //handle like video
    const handleLikeVideo = () => {
        if (videoInfo.like_video) {
            dispatch(
                actions.setUnLike({ id_user: videoInfo.id_user, id_video: videoInfo.id_video }),
            );
            setVideoInfo({ ...videoInfo, like_video: false, likes: videoInfo.likes - 1 });
        } else {
            dispatch(actions.setLike({ id_user: videoInfo.id_user, id_video: videoInfo.id_video }));
            setVideoInfo({ ...videoInfo, like_video: true, likes: videoInfo.likes + 1 });
        }
    };

    //handle download video
    const handleDownload = () => {
        dispatch(actions.setDownload({ id_video: videoInfo.id_video }));
        setVideoInfo({ ...videoInfo, download: videoInfo.download + 1 });
    };

    //handle share video
    const handleShare = () => {
        dispatch(actions.setShare({ id_video: videoInfo.id_video }));
        setVideoInfo({ ...videoInfo, share: videoInfo.share + 1 });
    };

    return (
        <div className={cx('wrapper')} ref={viewRef}>
            <Image className={cx('avatar')} src={videoInfo.avatar} alt="avatar" />
            <div className={cx('content')}>
                <div className={cx('header')}>
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
                                <Link
                                    to={`/user/@${videoInfo.id_user}`}
                                    className={cx('user-nickname')}
                                >
                                    {videoInfo.nickname}
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                </Link>
                            </Tippy>
                        </div>
                        <div className={cx('user-fullname')}>{videoInfo.full_name}</div>
                    </div>

                    {/* Thông tin video */}
                    <div className={cx('desc')}>{videoInfo.description}</div>
                    <h4 className={cx('music')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <div className={cx('music-name')}>{videoInfo.music}</div>
                    </h4>
                    <Button
                        outline={!videoInfo.follow_user}
                        primary={videoInfo.follow_user}
                        className={cx('follow-btn')}
                        onClick={handleFollow}
                    >
                        {videoInfo.follow_user ? ' Following' : 'Follow'}
                    </Button>
                </div>

                {/* phần video */}
                <div className={cx('video-content')}>
                    <div className={cx('video')}>
                        <VideoItem data={videoInfo} isInView={isInView} />
                    </div>

                    {/* icon bên phải video */}
                    <div className={cx('video-icons')}>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')} onClick={handleLikeVideo}>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={cx('icon', videoInfo.like_video ? 'like' : '')}
                                />
                            </span>
                            <span className={cx('text')}>{videoInfo.likes}</span>
                        </div>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon
                                    icon={faComment}
                                    className={cx('icon')}
                                    onClick={handleComment}
                                />
                            </span>

                            <span className={cx('text')}>{videoInfo.comments}</span>
                        </div>

                        <div className={cx('btn-item')}>
                            <a
                                className={cx('icon-wrapper')}
                                href={videoInfo.video_url}
                                download
                                onClick={handleDownload}
                            >
                                <FontAwesomeIcon icon={faDownload} className={cx('icon')} />
                            </a>

                            <span className={cx('text')}>{videoInfo.download}</span>
                        </div>

                        <div className={cx('btn-item')}>
                            <Menu items={shareMenu} placement="right-start">
                                <span className={cx('icon-wrapper')} onClick={handleShare}>
                                    <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                                </span>
                            </Menu>

                            <span className={cx('text')}>{videoInfo.share}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

VideoInfo.propTypes = {
    data: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default VideoInfo;
