import Image from '../Image';
import classNames from 'classnames/bind';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faCheckCircle,
    faComment,
    faHeart,
    faMusic,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import VideoItem from './VideoItem';
import AccountPreview from '~/components/AccountPreview';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Video({ data, callback, index }) {
    const [isInView, setIsInView] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const viewRef = useRef(null);

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

    return (
        <div className={cx('wrapper')} ref={viewRef}>
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
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
                                <Link to={`/@${data.full_name}`} className={cx('user-nickname')}>
                                    {data.username}
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                </Link>
                            </Tippy>
                        </div>
                        <div className={cx('user-fullname')}>{data.full_name}</div>
                    </div>

                    {/* Thông tin video */}
                    <div className={cx('desc')}>{data.desc}</div>
                    <h4 className={cx('music')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <div className={cx('music-name')}>{data.music}</div>
                    </h4>
                    <Button
                        outline
                        className={cx('follow-btn', isFollowing ? 'active' : '')}
                        onClick={() => setIsFollowing(!isFollowing)}
                    >
                        {!isFollowing ? ' Follow' : 'Following'}
                    </Button>
                </div>

                {/* phần video */}
                <div className={cx('video-content')}>
                    <div className={cx('video')}>
                        <VideoItem video_url={data.video_url} isInView={isInView} />
                    </div>

                    {/* icon bên phải video */}
                    <div className={cx('video-icons')}>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </span>
                            <span className={cx('text')}>{data.like}</span>
                        </div>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                            </span>

                            <span className={cx('text')}>{data.comments}</span>
                        </div>

                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
                            </span>

                            <span className={cx('text')}>{data.bookmark}</span>
                        </div>

                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                            </span>
                            <span className={cx('text')}>{data.share}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};
export default Video;
