import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';

import * as uploadService from '~/services/uploadService';
import styles from './UploadForm.module.scss';

const cx = classNames.bind(styles);

function UploadForm() {
    const [video, setVideo] = useState();
    const [videoInfo, setVideoInfo] = useState({
        description: '',
        status: '',
    });
    const filePickerRef = useRef(null);
    const state = useSelector((state) => state.reducer);

    useEffect(() => {
        return () => {
            video && URL.revokeObjectURL(video);
        };
    }, [video]);

    const handleUpload = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setVideo(file);
    };

    //change videoInfo
    const handleChange = (e) => {
        const value = e.target.value;

        setVideoInfo({
            ...videoInfo,
            [e.target.name]: value,
        });
    };

    //upload form video
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', video);
        formData.append('info', JSON.stringify(videoInfo));

        const fetchApi = async () => {
            const res = await uploadService.uploadVideo(state.token, formData);
            console.log(res);
        };
        fetchApi();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-box')}>
                {/* form upload video từ client lên sever */}
                <form method="post" onSubmit={handleSubmit}>
                    <div
                        className={cx('video-preview')}
                        onClick={() => filePickerRef.current.click()}
                        onChange={handleUpload}
                    >
                        <input
                            ref={filePickerRef}
                            type="file"
                            name="file"
                            id="file"
                            accept="video/*"
                            required
                            hidden
                        />

                        {video ? (
                            <ReactPlayer
                                url={video.preview}
                                width="100%"
                                height="calc(450px + ((100vw - 768px) / 1152) * 200)"
                                controls
                            />
                        ) : (
                            <div className={cx('empty-box')}>Click to upload video</div>
                        )}
                    </div>
                    <br />

                    <div className={cx('video-info')}>
                        <div className={cx('desc')}>
                            {/* đoạn text giới thiệu video */}
                            <label htmlFor="desc"> Description </label>
                            <br />
                            <textarea
                                name="description"
                                id="desc"
                                rows="10"
                                required
                                value={videoInfo.description}
                                onChange={handleChange}
                            ></textarea>
                            <br />

                            {/* hỏi trạng thái video khi up lên  */}
                            <div className={cx('stauts')}>
                                Ai có thể xem video này?
                                <br />
                                <input
                                    type="radio"
                                    id="public"
                                    name="status"
                                    value="public"
                                    required
                                    onChange={handleChange}
                                />
                                <label htmlFor="public">Công khai</label>
                                <br />
                                <input
                                    type="radio"
                                    id="friendOnly"
                                    name="status"
                                    value="friendOnly"
                                    onChange={handleChange}
                                />
                                <label htmlFor="friendOnly">Chỉ bạn bè</label>
                                <br />
                                <input
                                    type="radio"
                                    id="private"
                                    name="status"
                                    value="private"
                                    onChange={handleChange}
                                />
                                <label htmlFor="private">Riêng tư</label>
                            </div>
                        </div>
                        <br />
                    </div>
                    <input type="submit" name="submit" className={cx('btn')} value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default UploadForm;
