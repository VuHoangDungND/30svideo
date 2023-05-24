import classNames from 'classnames/bind';

import Button from '~/components/Button';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RegisterForm.module.scss';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RegisterForm() {
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
                <div>Wellcome , New Friend! </div>
                <h1>Register</h1>
                <form>
                    <div className={cx('user-box')}>
                        <input type="text" name="username" required />
                        <label>Username</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input type="password" name="password" required />
                        <label>Password</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input type="password-repeat" name="password-repeat" required />
                        <label>Repeat Password</label>
                    </div>

                    <Button to={config.routes.login} className={cx('btn', 'btn-have')}>
                        {' '}
                        Have a account ?
                    </Button>

                    <Button type="submit" primary className={cx('btn', 'btn-register')}>
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
