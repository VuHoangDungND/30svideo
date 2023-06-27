import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const state = useSelector((state) => state.reducer);
    const [userData, setUserData] = useState({ ...data, follow_user: data.follow_user === 1 });

    const handleFollow = () => {
        if (state.currentLogin) {
            if (userData.follow_user) {
                //     dispatch(
                //         actions.setUnLike({ id_user: videoInfo.id_user, id_video: videoInfo.id_video }),
                //     );
                setUserData({ ...userData, follow_user: false });
            } else {
                //     dispatch(actions.setLike({ id_user: videoInfo.id_user, id_video: videoInfo.id_video }));
                setUserData({ ...userData, follow_user: true });
            }
        } else alert('Đăng nhập để sử dụng tính năng trên');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={userData.avatar} alt="" />
                <Button
                    className={cx('follow-btn')}
                    onClick={handleFollow}
                    primary={userData.follow_user}
                    outline={!userData.follow_user}
                >
                    {userData.follow_user ? 'Following' : 'Follow'}
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('nickname')}>
                    <strong>{userData.nickname}</strong>
                    {userData.tick && (
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    )}
                </div>
                <div className={cx('full_name')}>{userData.full_name}</div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{userData.followed || 0} </strong>
                    <span className={cx('label')}>Followed</span>
                    <strong className={cx('value')}>{userData.total_likes || 0} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
