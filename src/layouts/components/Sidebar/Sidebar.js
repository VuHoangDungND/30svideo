import { useSelector } from 'react-redux';
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

const cx = classNames.bind(styles);

function Sidebar() {
    const state = useSelector((state) => state.reducer);
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
                    {state.currentLogin ? null : <LoginRec />}
                    {state.currentLogin ? <SuggestedAccounts label="Suggested accounts" /> : null}

                    <Discover />
                    <FooterSB />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
