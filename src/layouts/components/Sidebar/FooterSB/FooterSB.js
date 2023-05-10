import classNames from 'classnames/bind';

import styles from './FooterSB.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                <a className={cx('item')} href={'https://www.tiktok.com/about?lang=en'}>
                    About
                </a>
                <a className={cx('item')} href={'https://newsroom.tiktok.com/'}>
                    Newsroom
                </a>
                <a className={cx('item')} href={'https://www.tiktok.com/about/contact?lang=en'}>
                    Contact
                </a>
                <a className={cx('item')} href={'https://careers.tiktok.com/'}>
                    Careers
                </a>
                <a className={cx('item')} href={'https://www.bytedance.com/'}>
                    ByteDance
                </a>
            </div>

            <div className={cx('list')}>
                <a className={cx('item')} href={'https://www.tiktok.com/forgood'}>
                    TikTok for Good
                </a>
                <a
                    className={cx('item')}
                    href={
                        'https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&refer=tiktok_web'
                    }
                >
                    Advertise
                </a>
                <a className={cx('item')} href={'https://developers.tiktok.com/?refer=tiktok_web'}>
                    Developers
                </a>
                <a className={cx('item')} href={'https://www.tiktok.com/transparency?lang=en'}>
                    Transparency
                </a>
                <a className={cx('item')} href={'https://www.tiktok.com/embed'}>
                    TikTok Rewards
                </a>
                <a className={cx('item')} href={'https://www.tiktok.com/tiktok-rewards/en'}>
                    TikTok Embeds
                </a>
            </div>

            <div className={cx('list')}>
                <a className={cx('item')} href={'https://support.tiktok.com/en'}>
                    Help
                </a>
                <a className={cx('item')} href={'https://www.tiktok.com/safety?lang=en'}>
                    Safety
                </a>
                <a
                    className={cx('item')}
                    href={'https://www.tiktok.com/legal/terms-of-service?lang=en'}
                >
                    Terms
                </a>
                <a
                    className={cx('item')}
                    href={'https://www.tiktok.com/legal/privacy-policy-row?lang=en'}
                >
                    Privacy
                </a>
                <a
                    className={cx('item')}
                    href={'https://www.tiktok.com/creators/creator-portal/en-us/n'}
                >
                    Creator Portal
                </a>
                <a
                    className={cx('item')}
                    href={'https://www.tiktok.com/community-guidelines?lang=en'}
                >
                    Community Guidelines
                </a>
            </div>
            <span className={cx('item')}>© 2023 TikTok </span>
            <a className={cx('item')} href={'https://www.facebook.com/vuhoang.dung.54'}>
                Made by vuhoangdungnd
            </a>
            <div className={cx('list')}></div>
            <div className={cx('list')}></div>
        </div>
    );
}

export default Footer;
