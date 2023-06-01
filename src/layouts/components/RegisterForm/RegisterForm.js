import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RegisterForm.module.scss';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RegisterForm() {
    const [data, setData] = useState({
        username: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (e) => {
        const value = e.target.value;

        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faArrowAltCircleLeft} />}
                    className={cx('btn-back')}
                    to={config.routes.home}
                >
                    Back to home
                </Button>
            </div>
            <div className={cx('login-box')}>
                <div>Wellcome , New Friend! </div>
                <h1>Register</h1>
                <form>
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            autoComplete="username"
                            onChange={handleChange}
                            value={data.username}
                        />
                        <label>Username</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            name="password"
                            id="new-password"
                            required
                            autoComplete="new-password"
                            onChange={handleChange}
                            value={data.password}
                        />
                        <label>Password</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input type="password" name="confirm_password" required />
                        <label>Confirm Password</label>
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
