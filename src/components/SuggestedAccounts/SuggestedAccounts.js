import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import * as searchServices from '~/services/searchService';
import { db } from '~/config';
import { collection, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const users = await getDocs(collection(db, 'videos'));
            const rs = [];
            users.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });

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
