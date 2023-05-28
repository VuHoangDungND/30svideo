import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

import styles from './UploadForm.module.scss';

const cx = classNames.bind(styles);

function UploadForm() {
    const [video, setVideo] = useState(null);
    const filePickerRef = useRef(null);

    useEffect(() => {
        return () => {
            video && URL.revokeObjectURL(video);
        };
    }, [video]);

    const handleUpload = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        console.log(file.preview);

        setVideo(file);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-box')}>
                {/* form upload video từ client lên sever */}
                <form method="post">
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
                            <textarea name="description" id="desc" rows="10" required></textarea>
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
                                />
                                <label htmlFor="public">Công khai</label>
                                <br />
                                <input
                                    type="radio"
                                    id="friendOnly"
                                    name="status"
                                    value="friendOnly"
                                />
                                <label htmlFor="friendOnly">Chỉ bạn bè</label>
                                <br />
                                <input type="radio" id="private" name="status" value="private" />
                                <label htmlFor="private">Riêng tư</label>
                            </div>
                        </div>
                        <br />
                        <input type="submit" name="submit" className={cx('btn')} value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadForm;
