import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const state = useSelector((state) => state.reducer);
    const [isFollowing, setIsFollowing] = useState(data.follow_user === 1);

    const handleFollow = () => {
        if (state.currentLogin) setIsFollowing(!isFollowing);
        else alert('Đăng nhập để sử dụng tính năng trên');
    };
    useEffect(() => {
        setIsFollowing(data.follow_user === 1);
    }, [data.follow_user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt="" />
                <Button
                    className={cx('follow-btn')}
                    onClick={handleFollow}
                    primary={isFollowing}
                    outline={!isFollowing}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </div>
                <div className={cx('full_name')}>{data.full_name}</div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers || 0} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.total_likes || 0} </strong>
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
