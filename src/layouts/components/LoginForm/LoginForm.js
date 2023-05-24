import classNames from 'classnames/bind';

import Button from '~/components/Button';
import config from '~/config';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LoginForm.module.scss';

const cx = classNames.bind(styles);

function LoginForm() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <Button
                    to={config.routes.home}
                    leftIcon={<FontAwesomeIcon icon={faArrowAltCircleLeft} />}
                    className={cx('btn-back')}
                >
                    Back to home
                </Button>
            </div>
            <div className={cx('login-box')}>
                <div>Wellcome Back! </div>
                <h1>Login</h1>
                <form>
                    <div className={cx('user-box')}>
                        <input type="text" name="username" required />
                        <label>Username</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input type="password" name="password" required />
                        <label>Password</label>
                    </div>

                    <Button to={config.routes.register} className={cx('btn', 'btn-create')}>
                        {' '}
                        Create account ?
                    </Button>

                    <Button type="submit" primary className={cx('btn', 'btn-login')}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
