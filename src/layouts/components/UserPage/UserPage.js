import classNames from 'classnames/bind';

import { faCheckCircle, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import { useEffect, useState } from 'react';

import * as showService from '~/services/showService';
import styles from './UserPage.module.scss';
import Button from '~/components/Button';
import UserVideos from '../UserVideos';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function UserPage() {
    const [userData, setUserData] = useState({});
    const [isFollowing, setIsFollowing] = useState(userData.follow_user === 1);
    const state = useSelector((state) => state.reducer);

    //lấy dữ liệu dựa trên nickname
    useEffect(() => {
        var fetchApi;
        var id_user = window.location.pathname.split('/')[2].slice(1);
        if (state.currentLogin) {
            fetchApi = async () => {
                const res = await showService.showUserProfileWithLogin(state.token, id_user);
                setUserData(res.data.data);
            };
        } else {
            fetchApi = async () => {
                const res = await showService.showUserProfile(id_user);
                setUserData(res.data.data[0]);
            };
        }

        fetchApi();
    }, [state.currentLogin, state.token]);

    // khi userData thay đổi thì isFollowing thay đổi theo
    useEffect(() => {
        setIsFollowing(userData.follow_user === 1);
    }, [userData.follow_user]);

    const handleFollow = () => {
        if (state.currentLogin) setIsFollowing(!isFollowing);
        else alert('Vui lòng đăng nhập để sử dụng tính năng này');
    };

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
                                primary={isFollowing}
                                outline={!isFollowing}
                                className={cx('follow-btn')}
                                onClick={handleFollow}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
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
