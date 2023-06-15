import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as showService from '~/services/showService';

import styles from './SuggestedAccounts.module.scss';
import Account from '~/components/Account';

const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const [result, setResult] = useState([]);
    const [limited, setLimited] = useState(true);

    //render dữ liệu
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.showSuggestAccount(limited ? 'less' : 'more');
            setResult(res.data.data);
        };
        fetchApi();
    }, [limited]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {result.map((result, index) => (
                <Account key={index} data={result} activeHover />
            ))}
            {/* nút bật tắt all list account */}
            {limited ? (
                <p className={cx('more-btn')} onClick={() => setLimited(false)}>
                    See more
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={() => setLimited(true)}>
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
