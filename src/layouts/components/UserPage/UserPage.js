import classNames from 'classnames/bind';

import { faCheckCircle, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as showService from '~/services/showService';
import styles from './UserPage.module.scss';
import Button from '~/components/Button';
import UserVideos from '../UserVideos';
import { actions } from '~/store';

const cx = classNames.bind(styles);
function UserPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const location = useLocation();
    const state = useSelector((state) => state.reducer);

    //lấy dữ liệu dựa trên nickname
    useEffect(() => {
        var id_user = location.pathname.split('/')[2].slice(1);
        var fetchApi;
        if (state.currentLogin) {
            fetchApi = async () => {
                const res = await showService.showUserProfileWithLogin(state.token, id_user);
                setData({ ...res.data.data, follow_user: res.data.data.follow_user === 1 });
            };
        } else {
            fetchApi = async () => {
                const res = await showService.showUserProfile(id_user);
                setData({ ...res.data.data, follow_user: res.data.data.follow_user === 1 });
            };
        }

        fetchApi();
    }, [state.currentLogin, state.token, location]);

    //handle Follow
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
        } else alert('Vui lòng đăng nhập để sử dụng tính năng này');
    };

    const handleEdit = () => {
        alert('Tinh nang dang trong qua trinh bao tri');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('user-info')}>
                        <Image className={cx('avatar')} src={data.avatar} />

                        <div className={cx('titleContainer')}>
                            <div className={cx('nickname')}>
                                {data.nickname}
                                <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                            </div>

                            <div className={cx('full_name')}> {data.full_name}</div>
                            {state.currentId === data.id_user ? (
                                <Button outline className={cx('follow-btn')} onClick={handleEdit}>
                                    {' '}
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    primary={data.follow_user}
                                    outline={!data.follow_user}
                                    className={cx('follow-btn')}
                                    onClick={handleFollow}
                                >
                                    {data.follow_user ? 'Following' : 'Follow'}
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className={cx('count-info')}>
                        <div className={cx('number')}>
                            <strong className={cx('value')}>{data.following}</strong>
                            <span className={cx('label')}> Following</span>
                        </div>

                        <div className={cx('number')}>
                            <strong className={cx('value')}>{data.followed}</strong>
                            <span className={cx('label')}> Followed</span>
                        </div>

                        <div className={cx('number')}>
                            <strong className={cx('value')}>{data.total_likes}</strong>
                            <span className={cx('label')}> Likes</span>
                        </div>
                    </div>

                    <div className={cx('bio')}>{data.bio}</div>

                    <div className={cx('share-btn')}>
                        <FontAwesomeIcon icon={faShare} />
                    </div>

                    <div className={cx('user-more')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <UserVideos id_user={data.id_user} />
        </div>
    );
}

export default UserPage;
