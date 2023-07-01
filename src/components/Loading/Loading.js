import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ isCovered = false }) {
    return (
        <div className={cx('wrapper', isCovered ? 'covered' : null)}>
            <div className={cx('spinner')}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
