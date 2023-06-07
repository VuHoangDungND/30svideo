import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as registerService from '~/services/registerService';
import Button from '~/components/Button';
import config from '~/config';
import styles from './RegisterForm.module.scss';
import {
    faArrowAltCircleLeft,
    faCheck,
    faInfoCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function RegisterForm() {
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const navigate = useNavigate();

    //button register
    const handleRegister = (e) => {
        e.preventDefault();
        const userData = {
            username: user,
            password: pwd,
        };

        const fetchApi = async () => {
            const res = await registerService.register(userData);
            if (res.data.data === null) alert(res.data.message);
            else {
                navigate(config.routes.login);
                alert(res.data.message);
            }
        };

        fetchApi();
    };

    // check name match with REGEX
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //check password match with matchPwd and REGEX
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

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

            <div className={cx('register-box')}>
                <p className={cx('title')}>Register</p>

                <form onSubmit={handleRegister}>
                    {/* username */}
                    <div className={cx('user-box')}>
                        <input
                            type="text"
                            id="username"
                            required
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                        />
                        <label>Username</label>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={cx(validName ? 'valid' : 'hide')}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={cx(validName || !user ? 'hide' : 'invalid')}
                        />
                        <p
                            id="uidnote"
                            className={cx(userFocus && user && !validName ? 'hint' : 'hide')}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>

                    {/* password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            id="password"
                            required
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby="pwdnote"
                        />
                        <label>Password</label>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={cx(validPwd ? 'valid' : 'hide')}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={cx(validPwd || !pwd ? 'hide' : 'invalid')}
                        />
                        <p id="pwdnote" className={cx(pwdFocus && !validPwd ? 'hint' : 'hide')}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a number and a special
                            character.
                            <br />
                            Allowed special characters:
                            <span aria-label="exclamation mark">!</span>{' '}
                            <span aria-label="at symbol">@</span>{' '}
                            <span aria-label="hashtag">#</span>{' '}
                            <span aria-label="dollar sign">$</span>{' '}
                            <span aria-label="percent">%</span>
                        </p>
                    </div>

                    {/* confirm_password */}
                    <div className={cx('user-box')}>
                        <input
                            type="password"
                            id="confirm_password"
                            required
                            autoComplete="off"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby="confirmnote"
                        />
                        <label htmlFor="">Confirm Password</label>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={cx(validMatch && matchPwd ? 'valid' : 'hide')}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={cx(validMatch || !matchPwd ? 'hide' : 'invalid')}
                        />
                        <p
                            id="confirmnote"
                            className={cx(matchFocus && !validMatch ? 'hint' : 'hide')}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        primary
                        className={cx('btn')}
                        disabled={!validName || !validPwd || !validMatch ? true : false}
                    >
                        Register
                    </Button>
                </form>

                <p className={cx('signin')}>
                    {' '}
                    Already have an account?
                    <Link to={config.routes.login} className={cx('btn-signin')}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
