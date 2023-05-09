import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { ReactDOM } from 'react';

function VideoItem({ index, videos }) {
    const [isInView, setIsInView] = useState(false);

    const ref = useRef(null);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             setIsInView(entry.isIntersecting);
    //             console.log(ref.current.offsetWidth, index);
    //         },
    //         { rootMargin: '-400px' },
    //     );
    //     observer.observe(ref.current);
    //     return () => observer.disconnect();
    // }, []);

    useEffect(() => {
        // const handleScroll = (ref) => {
        //     if (!ref) return;
        //     console.log(ref.getBoundingClientRect().top, index);
        //     console.log(ref, index);
        // };

        console.log(ref, index);

        // window.addEventListener('scroll', handleScroll);

        // console.log(ref.currrent.getBoundingClientRect().top, index);

        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    });

    const show = (ref) => {
        console.log(ref);
    };

    return (
        <div ref={(ref) => show(ref)}>
            <ReactPlayer
                url={videos[index]}
                controls
                loop
                width="100%"
                height="calc(450px + ((100vw - 768px) / 1152) * 200)"
                playing={isInView}
            />
        </div>
    );
}

export default VideoItem;
