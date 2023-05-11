import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { UpIcon } from '~/components/Icons';

import styles from './GetApp.module.scss';

const cx = classNames.bind(styles);

function GetApp() {
    const [upIcon, setUpIcon] = useState(false);
    const handleScrollUp = () => {
        if (window.scrollY >= 640) setUpIcon(true);
        else setUpIcon(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollUp);

        return () => {
            window.removeEventListener('scroll', handleScrollUp);
        };
    }, []);

    return (
        <div className={cx('wrapper', upIcon ? 'active' : '')}>
            <Button hastag outline text>
                GetApp
            </Button>

            <Button
                primary
                className={cx('icon')}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
            >
                <UpIcon />
            </Button>
        </div>
    );
}

export default GetApp;
