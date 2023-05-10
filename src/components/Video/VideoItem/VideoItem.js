import ReactPlayer from 'react-player/youtube';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function VideoItem({ video_url, isInView }) {
    const [playing, setPlaying] = useState(isInView);

    useEffect(() => {
        setPlaying(isInView);
    }, [isInView]);

    return (
        <>
            <ReactPlayer
                url={video_url}
                controls
                loop
                width="100%"
                height="calc(450px + ((100vw - 768px) / 1152) * 200)"
                muted={true}
                playing={playing}
            />
        </>
    );
}

VideoItem.propTypes = {
    video_url: PropTypes.string.isRequired,
    isInView: PropTypes.bool,
};
export default VideoItem;
