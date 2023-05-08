import Image from '../Image';
import classNames from 'classnames/bind';
import Button from '../Button';
import ReactPlayer from 'react-player';

import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { db } from '~/config/firebase';
import video1 from '~/assets/videos/video1.mp4';
import video2 from '~/assets/videos/video2.mp4';
import video3 from '~/assets/videos/video3.mp4';
import video4 from '~/assets/videos/video4.mp4';
import video5 from '~/assets/videos/video5.mp4';

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

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <div className={cx('user')}>{data.nickname}</div>
                        <p>{data.bio}</p>
                    </div>
                    <Button outline className={cx('follow-btn')}>
                        Follow
                    </Button>
                </div>
                <div className={cx('video-content')}>
                    <div className={cx('video')}>
                        <ReactPlayer
                            url={videos[index]}
                            controls
                            loop
                            playIcon={<FontAwesomeIcon icon={faHeart} />}
                        />
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

export default Video;
