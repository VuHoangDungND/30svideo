import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import styles from './Comment.module.scss';
import * as showService from '~/services/showService';
import Account from '~/components/Account';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const host = 'http://localhost:5000';

function Comment({ id_video }) {
    const [oldMsgs, setOldMsgs] = useState([]);
    const [message, setMessage] = useState('');
    const state = useSelector((state) => state.reducer);
    const socket = useRef();

    //get all old messages
    useEffect(() => {
        const loadComment = async () => {
            const res = await showService.showComments(id_video);
            setOldMsgs(res.data.data);
        };
        loadComment();
    }, [id_video]);

    // connect to socket
    useEffect(() => {
        socket.current = io(host);

        socket.current.on('sendDataServer', (dataGot) => {
            console.log([...oldMsgs, dataGot.newData]);
            setOldMsgs((oldMsgs) => [...oldMsgs, dataGot.newData]);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [oldMsgs]);
    //handleSend
    const handleSend = () => {
        if (message !== null) {
            const msg = {
                comment: message,
                id_user: state.currentId,
                id_video: id_video,
            };
            socket.current.emit('sendDataClient', msg);

            setMessage('');
        }
    };

    return (
        <div className={cx('wrapper')} key={id_video}>
            <div className={cx('comment-container')}>
                <div className={cx('comment-list-container')}>
                    {oldMsgs.map((data) => {
                        return (
                            <div className={cx('comment-item-container')}>
                                <div className={cx('comment-content-container')}>
                                    <Account data={data} watcher comment />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={cx('bottom-comment-container')}>
                <div className={cx('comment-bar')}>
                    {state.currentLogin ? (
                        <div className={cx('comment-bar-chat')}>
                            <div className={cx('comment-bar-text')}>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn ..."
                                />
                            </div>
                            <button onClick={handleSend}>Send</button>
                        </div>
                    ) : (
                        <div className={cx('comment-bar-warn')}>Login to comment</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Comment;
