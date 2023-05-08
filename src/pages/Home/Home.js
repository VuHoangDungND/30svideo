import { useEffect, useState } from 'react';
import Video from '~/components/Video';
import * as searchServices from '~/services/searchService';

function Home() {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const rs = await searchServices.search('so');

            setVideoList(rs);
        };
        fetchApi();
    }, []);
    return (
        <>
            {videoList.map((result, index) => (
                <Video key={result.id} data={result} index={index} />
            ))}
        </>
    );
}

export default Home;
