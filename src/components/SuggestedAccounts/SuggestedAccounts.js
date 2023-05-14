import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';

import styles from './SuggestedAccounts.module.scss';
import { db } from '~/config';
import Account from './Account';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [result, setResult] = useState([]);
    const [limited, setLimited] = useState(5);

    //render dữ liệu
    useEffect(() => {
        const fetchApi = async () => {
            const videosRef = collection(db, 'videos');

            const videosQuery = query(videosRef, limit(limited));
            const users = await getDocs(videosQuery);
            const rs = [];
            users.forEach((doc) => {
                rs.push({ ...doc.data(), id: doc.id });
            });

            setResult(rs);
        };
        fetchApi();
    }, [limited]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {result.map((result) => (
                <Account key={result.id} data={result} />
            ))}
            {/* nút bật tắt all list account */}
            {limited === 5 ? (
                <p className={cx('more-btn')} onClick={() => setLimited(20)}>
                    See all
                </p>
            ) : (
                <p className={cx('more-btn')} onClick={() => setLimited(5)}>
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
