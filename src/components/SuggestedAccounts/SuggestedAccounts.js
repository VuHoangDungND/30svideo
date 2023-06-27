import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';
import { useSelector } from 'react-redux';

import styles from './SuggestedAccounts.module.scss';
import Account from '~/components/Account';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const [result, setResult] = useState([]);
    const [type, setType] = useState(5);
    const state = useSelector((state) => state.reducer);

    //render dữ liệu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showSuggestAccount(state.token);
            setResult(res.data.data);
        };
        fetchApi();
    }, [state.token]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {result.map((result, index) =>
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
