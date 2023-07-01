import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '~/store';
import styles from './SuggestedAccounts.module.scss';
import Account from '~/components/Account';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const [type, setType] = useState(5);
    const state = useSelector((state) => state.reducer);
    const dispatch = useDispatch();

    //render dữ liệu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showSuggestAccount(state.token);
            dispatch(actions.setSuggestAccount(res.data.data));
        };
        fetchApi();
    }, [state.token, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {state.currentSuggestAccount.map((result, index) =>
                type > index ? <Account key={index} data={result} suggested /> : null,
            )}

            {/* nút bật tắt all list account */}
            {type <= 5 ? (
                <p className={cx('more-btn')} onClick={() => setType(10)}>
                    See more
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={() => setType(5)}>
                    See less
                </p>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
