import { faHashtag, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

import styles from './Discover.module.scss';

const cx = classNames.bind(styles);
function Discover() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Discover</h2>
            <ul className={cx('list')}>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>suthatla</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>mackedoi</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>sansangthaydoi</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>Thiên Thần Tình Yêu - RICKYSTAR and T.R.I</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>Anh Yêu Vội Thế (Mee Remix) - LaLa Trần, Mee</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>7749hieuung</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>genzlife</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>Vui Lắm Nha (TikTok Remix 1) - Hương Ly & Jombie</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button text outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>Con Bướm Xuân (Remix) - Cukak & H2K & BHMedia</p>
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Discover;
