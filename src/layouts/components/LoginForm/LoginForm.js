import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as loginService from '~/services/loginService';
import Button from '~/components/Button';
import config from '~/config';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LoginForm.module.scss';
import { USER_LOGIN } from '~/store/constants';

const cx = classNames.bind(styles);

function LoginForm() {
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            username: data.username,
            password: data.password,
        };

        const fetchApi = async () => {
            const res = await loginService.login(userData);
            if (res.data === null) alert(res.message);
            else {
                dispatch({ type: USER_LOGIN, data: res.data[0] });
                navigate(config.routes.home);
                alert(res.message);
            }
        };

        fetchApi();
    };

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
                <div>Wellcome Back! </div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            value={data.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        <label>Username</label>
                    </div>

                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            name="password"
                            id="current-password"
                            required
                            value={data.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
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
