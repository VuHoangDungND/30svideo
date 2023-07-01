import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import GetApp from '../components/GetApp';
import { useSelector } from 'react-redux';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const state = useSelector((state) => state.reducer);

    return (
        <div>
            {state.currentLoading ? <Loading isCovered /> : null}
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                    {/* Button bên phải góc màn hình */}
                    <GetApp />
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
