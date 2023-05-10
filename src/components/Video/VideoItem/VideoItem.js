import ReactPlayer from 'react-player/lazy';
import { useEffect, useState } from 'react';

function VideoItem({ index, videos, isInView }) {
    const [playing, setPlaying] = useState(isInView);

    useEffect(() => {
        setPlaying(isInView);
    }, [isInView]);

    return (
        <>
            <ReactPlayer
                url={videos[index]}
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

export default VideoItem;
