import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './LoginRec.module.scss';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginRec() {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <p className={cx('text')}>Sign in to experience many attractive features.</p>
            <Button
                outline
                large
                className={cx('btn')}
                onClick={() => navigate(config.routes.login)}
            >
                Login
            </Button>
        </div>
    );
}

export default LoginRec;
