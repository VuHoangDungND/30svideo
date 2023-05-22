import classNames from 'classnames/bind';

import styles from './FooterSB.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <span className={cx('item')}>Website về chia sẻ các video ngắn</span>
            </div>

            <div className={cx('list')}>
                <span className={cx('item')}>Sản phẩm đầu tay mới học</span>
            </div>

            <div className={cx('list')}>
                <span className={cx('item')}>Mong người chia sẻ và đóng góp ý kiến với mình </span>
            </div>
            <span className={cx('item')}>© 2023 30sVideo </span>
            <a className={cx('item')} href={'https://www.facebook.com/vuhoang.dung.54'}>
                Made by vuhoangdungnd
            </a>
            <div className={cx('list')}></div>
            <div className={cx('list')}></div>
        </div>
    );
}

export default Footer;
