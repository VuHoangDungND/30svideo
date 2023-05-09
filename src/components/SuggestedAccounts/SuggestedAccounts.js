import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import * as searchServices from '~/services/searchService';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const rs = await searchServices.search('h');

            setResult(rs);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {result.map((result) => (
                <AccountItem key={result.id} data={result} />
            ))}
            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
