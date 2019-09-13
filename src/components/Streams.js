import React, {useState, useEffect} from 'react';
import krakenApi from '../krakenApi';
import {resize} from './Resize';
import StreamTemplate from './StreamTemplate';

function Streams() {

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await krakenApi.get("https://api.twitch.tv/kraken/streams/");
      let dataArray = result.data.streams;

      let finalArray = dataArray.map(stream => {
        stream.preview.template = resize(stream.preview.template);
        return stream;
      }, []);

      setChannels(finalArray);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className='text-center'>Top Live Streams</h1>
      {StreamTemplate(channels)}
    </div>
  );
}

export default Streams;
