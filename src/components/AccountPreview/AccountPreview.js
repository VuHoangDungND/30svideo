import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt="" />
                <Button
                    className={cx('follow-btn')}
                    primary={data.follow_user === 1}
                    outline={!data.follow_user === 1}
                >
                    {data.follow_user ? 'Following' : 'Follow'}
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </div>
                <div className={cx('full_name')}>{data.full_name}</div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followed || 0} </strong>
                    <span className={cx('label')}>Followed</span>
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
