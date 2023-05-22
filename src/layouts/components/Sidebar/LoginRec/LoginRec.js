import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './LoginRec.module.scss';

const cx = classNames.bind(styles);

function LoginRec() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('text')}>Log in to follow creators, like videos, and view comments.</p>
            <Button outline large className={cx('btn')}>
                Login
            </Button>
        </div>
    );
}

export default LoginRec;
