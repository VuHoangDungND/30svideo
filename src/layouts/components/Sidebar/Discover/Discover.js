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
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>Âm nhạc</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>Trò chơi</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>Tin tức</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faHashtag} />}>
                        <p>Thế giới tự nhiên</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>Tam Bái Hồng Trần Lương [三拜红尘凉] - Doãn Tích Miên [尹昔眠]</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>PHƯƠNG MỸ CHI x DTAP - VŨ TRỤ CÓ ANH ft. Pháo</p>
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button outline hastag leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                        <p>
                            MỘT NGÀY CHẲNG NẮNG (Official MV) | Pháo Northside x @thobaymauofficial
                        </p>
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Discover;
