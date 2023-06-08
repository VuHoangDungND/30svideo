import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
import * as showService from '~/services/showService';

const cx = classNames.bind(styles);

function Sidebar() {
    const [myState, setMyState] = useState();

    const state = useSelector((state) => state.reducer);

    useEffect(() => {
        if (state.token) {
            const fetchApi = async () => {
                const res = await showService.showMyUser(state.token);
                setMyState(res.data.data);
            };
            fetchApi();
        } else {
            setMyState();
        }
    }, [state.token]);
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
                    {myState ? null : <LoginRec />}
                    {myState ? <SuggestedAccounts label="Suggested accounts" /> : null}

                    <Discover />
                    <FooterSB />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
