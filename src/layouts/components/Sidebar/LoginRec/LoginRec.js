import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Button from '~/components/Button';
import { USER_LOGIN } from '~/store/constants';
import styles from './LoginRec.module.scss';

const cx = classNames.bind(styles);

function LoginRec() {
    const dispatch = useDispatch();
    return (
        <div className={cx('wrapper')}>
            <p className={cx('text')}>Sign in to experience many attractive features.</p>
            <Button
                outline
                large
                className={cx('btn')}
                onClick={() => dispatch({ type: USER_LOGIN })}
            >
                Login
            </Button>
        </div>
    );
}

export default LoginRec;
