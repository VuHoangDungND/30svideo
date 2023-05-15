import classNames from 'classnames/bind';

import { faCheckCircle, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';

import styles from './UserPage.module.scss';
import Button from '~/components/Button';
import UserVideos from '../UserVideos';

const cx = classNames.bind(styles);
function UserPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('user-info')}>
                        <Image
                            className={cx('avatar')}
                            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c0e5acb353efad347ae0ba5a87574f1d~c5_100x100.jpeg?x-expires=1684332000&x-signature=d1WRoB94hOfvU6T8M0R5ebDHf8o%3D"
                        />

                        <div className={cx('titleContainer')}>
                            <div className={cx('username')}>
                                videosmeme07
                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                            </div>

                            <div className={cx('full_name')}> Độc lạ MEME</div>
                            <Button primary className={cx('follow-btn')}>
                                Follow
                            </Button>
                        </div>
                    </div>

                    <div className={cx('count-info')}>
                        <div className={cx('number')}>
                            <strong className={cx('value')}>29</strong>
                            <span className={cx('label')}> Following</span>
                        </div>

                        <div className={cx('number')}>
                            <strong className={cx('value')}>68.7K</strong>
                            <span className={cx('label')}> Followers</span>
                        </div>

                        <div className={cx('number')}>
                            <strong className={cx('value')}>1.6M</strong>
                            <span className={cx('label')}>Likes</span>
                        </div>
                    </div>

                    <div className={cx('bio')}>No bio yet.</div>

                    <div className={cx('share-btn')}>
                        <FontAwesomeIcon icon={faShare} />
                    </div>

                    <div className={cx('user-more')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <UserVideos />
        </div>
    );
}

export default UserPage;
