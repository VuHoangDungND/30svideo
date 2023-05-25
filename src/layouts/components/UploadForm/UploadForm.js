import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

import styles from './UploadForm.module.scss';

const cx = classNames.bind(styles);

function UploadForm() {
    const filePickerRef = useRef(null);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload-box')}>
                <form method="post">
                    <div
                        className={cx('video-preview')}
                        onClick={() => filePickerRef.current.click()}
                    >
                        <input
                            ref={filePickerRef}
                            type="file"
                            name="file"
                            id="file"
                            accept="video/*"
                            hidden
                        />
                        {/* {filePickerRef.current.value ? (
                            <div>Here to drop video</div>
                        ) : (
                            <ReactPlayer ref={filePickerRef} controls />
                        )} */}
                    </div>
                    <br />
                    <input type="submit" name="submit" className={cx('btn')} value="Submit" />
                </form>
                {console.log([filePickerRef.current])}
            </div>
        </div>
    );
}

export default UploadForm;
