import classNames from 'classnames/bind';

import { faCheckCircle, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as showService from '~/services/showService';
import styles from './UserPage.module.scss';
import Button from '~/components/Button';
import UserVideos from '../UserVideos';

const cx = classNames.bind(styles);
function UserPage() {
    const [userData, setUserData] = useState({});
    let location = useLocation().pathname.split('/');
    let id_user = location[2].slice(1);

    //lấy dữ liệu dựa trên nickname
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showUserProfile(id_user);
            setUserData(res.data.data[0]);
        };
        fetchApi();
    }, [id_user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('user-info')}>
                        <Image className={cx('avatar')} src={userData.avatar} />

                        <div className={cx('titleContainer')}>
                            <div className={cx('nickname')}>
                                {userData.nickname}
                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                            </div>

                            <div className={cx('full_name')}> {userData.full_name}</div>
                            <Button
                                primary={userData.follow_user}
                                outline={!userData.follow_user}
                                className={cx('follow-btn')}
                                onClick={setUserData({
                                    ...userData,
                                    follow_user: !userData.follow_user,
                                })}
                            >
                                {userData.follow_user ? 'Following' : 'Follow'}
                            </Button>
                        </div>
                    </div>

                    <div className={cx('count-info')}>
                        <div className={cx('number')}>
                            <strong className={cx('value')}>{userData.following}</strong>
                            <span className={cx('label')}> Following</span>
                        </div>

                        <div className={cx('number')}>
                            <strong className={cx('value')}>{userData.followers}</strong>
                            <span className={cx('label')}> Followers</span>
                        </div>

                        <div className={cx('number')}>
                            <strong className={cx('value')}>{userData.likes}</strong>
                            <span className={cx('label')}> Likes</span>
                        </div>
                    </div>

                    <div className={cx('bio')}>{userData.bio}</div>

                    <div className={cx('share-btn')}>
                        <FontAwesomeIcon icon={faShare} />
                    </div>

                    <div className={cx('user-more')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <UserVideos id_user={userData.id_user} />
        </div>
    );
}

export default UserPage;
