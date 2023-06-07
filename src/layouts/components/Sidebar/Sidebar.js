import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuPage, { MenuItem } from './MenuPage';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    ExploreIcon,
    ExploreActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import LoginRec from './LoginRec';
import Discover from './Discover';
import FooterSB from './FooterSB';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Sidebar() {
    const myState = useSelector((state) => state.reducer);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <MenuPage>
                        <MenuItem
                            title="For You"
                            to={config.routes.home}
                            icon={<HomeIcon />}
                            activeIcon={<HomeActiveIcon />}
                        />
                        <MenuItem
                            title="Following"
                            to={config.routes.following}
                            icon={<UserGroupIcon />}
                            activeIcon={<UserGroupActiveIcon />}
                        />
                        <MenuItem
                            title="Explore"
                            to={config.routes.explore}
                            icon={<ExploreIcon />}
                            activeIcon={<ExploreActiveIcon />}
                        />
                    </MenuPage>
                    {myState.token ? null : <LoginRec />}
                    {myState.token ? <SuggestedAccounts label="Suggested accounts" /> : null}

                    <Discover />
                    <FooterSB />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
