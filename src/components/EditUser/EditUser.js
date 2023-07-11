import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Image from '../Image';
import styles from './EditUser.module.scss';
import * as uploadService from '~/services/uploadService';
import { actions } from '~/store';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function EditUser({ data, handleCancel }) {
    const [editData, setEditData] = useState({
        avatar: data.avatar,
        nickname: data.nickname,
        full_name: data.full_name,
    });
    const [image, setImage] = useState();
    const filePickerRef = useRef(null);
    const state = useSelector((state) => state.reducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('info', JSON.stringify(editData));
        formData.append('file', image);

        const fetchApi = async () => {
            dispatch(actions.setLoading(true));
            const res = await uploadService.uploadImage(state.token, formData);
            alert(res.data.message);
            dispatch(actions.setLoading(false));
            navigate(0);
        };
        fetchApi();
    };
    //handle edit
    const handleEdit = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setImage(file);
    };

    //handle change
    const handleChange = (e) => {
        const value = e.target.value;

        setEditData({
            ...editData,
            [e.target.name]: value,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('box-container-wrapper')}>
                <div className={cx('box-container')}>
                    <form method="post" onSubmit={handleSubmit}>
                        <div
                            className={cx('box-avatar')}
                            onClick={() => filePickerRef.current.click()}
                            onChange={handleEdit}
                        >
                            <input
                                ref={filePickerRef}
                                type="file"
                                name="image"
                                id="file"
                                accept="image/*"
                                required
                                hidden
                            />
                            {image ? (
                                <Image className={cx('avatar')} src={image.preview} />
                            ) : (
                                <Image className={cx('avatar')} src={editData.avatar} />
                            )}
                        </div>

                        <div className={cx('box-content')}>
                            <div className={cx('box-content-user')}>
                                <label htmlFor="nickname">Nickname</label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    required
                                    value={editData.nickname}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className={cx('box-content-user')}>
                                <label htmlFor="full_name">Fullname</label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    required
                                    value={editData.full_name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className={cx('box-btn')}>
                            <Button
                                disabled={
                                    !image &&
                                    data.nickname === editData.nickname &&
                                    data.full_name === editData.full_name
                                }
                            >
                                <input type="submit" className={cx('btn-submit')} value="Submit" />
                            </Button>

                            <Button
                                className={cx('btn-cancel')}
                                onClick={() => handleCancel(false)}
                            >
                                {' '}
                                Cancel{' '}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
