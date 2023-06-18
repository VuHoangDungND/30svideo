import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function AccountItem({ data, suggested = false, watcher = false }) {
    return (
        <Link
            to={`/user/@${data.id_user}`}
            className={cx('wrapper', suggested ? 'suggested' : '', watcher ? 'watcher' : '')}
        >
            <Image className={cx('avatar')} src={data.avatar} alt={data.username} />
            <div className={cx('info')}>
                <h4 className={cx('nickname')}>
                    <span>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('fullname')}>{data.full_name}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    activeHover: PropTypes.bool,
};

export default AccountItem;
