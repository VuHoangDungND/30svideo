import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';

import styles from './SuggestedAccounts.module.scss';
import Account from '~/components/Account';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const [result, setResult] = useState([]);
    const [type, setType] = useState(true);
    const state = useSelector((state) => state.reducer);

    //render dữ liệu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showSuggestAccount(state.token, type ? 'less' : 'more');
            setResult(res.data.data);
        };
        fetchApi();
    }, [type, state.token]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {result.map((result, index) => (
                <Account key={index} data={result} suggested />
            ))}
            {/* nút bật tắt all list account */}
            {type ? (
                <p className={cx('more-btn')} onClick={() => setType(false)}>
                    See more
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={() => setType(true)}>
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
