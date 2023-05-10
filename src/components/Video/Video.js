import Image from '../Image';
import classNames from 'classnames/bind';
import Button from '../Button';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

// import { db } from '~/config/firebase';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import video1 from '~/assets/videos/video1.mp4';
import video2 from '~/assets/videos/video2.mp4';
import video3 from '~/assets/videos/video3.mp4';
import video4 from '~/assets/videos/video4.mp4';
import video5 from '~/assets/videos/video5.mp4';
import VideoItem from './VideoItem';

const cx = classNames.bind(styles);

const videos = [video1, video2, video3, video4, video5];

function Video({ data, index }) {
    // useEffect(() => {
    //     db.collection('videos')
    //         .get()
    //         .then((results) => {
    //             results.docs.forEach((doc) => {
    //                 console.log(doc.data);
    //             });
    //         });
    // });

    const [isInView, setIsInView] = useState(false);

    const ref = useRef(null);
    console.log(isInView, index);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0, rootMargin: '-49.9% 0px -49.9% 0px ' },
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={cx('wrapper')} ref={ref}>
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('user')}>
                        <div className={cx('user-nickname')}>{data.nickname}</div>
                        <div className={cx('user-fullname')}>{data.full_name}</div>
                    </div>
                    <div className={cx('desc')}>{data.bio}</div>
                    <h4 className={cx('music')}>
                        <FontAwesomeIcon icon={faMusic} />
                        <div className={cx('music-name')}>{data.created_at}</div>
                    </h4>
                    <Button outline className={cx('follow-btn')}>
                        Follow
                    </Button>
                </div>
                <div className={cx('video-content')}>
                    <div className={cx('video')}>
                        <VideoItem index={index} videos={videos} isInView={isInView} />
                    </div>
                    <div className={cx('video-icons')}>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </span>
                            <span className={cx('text')}>1.6M</span>
                        </div>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                            </span>

                            <span className={cx('text')}>2467</span>
                        </div>
                        <div className={cx('btn-item')}>
                            <span className={cx('icon-wrapper')}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                            </span>
                            <span className={cx('text')}>1280</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};
export default Video;
