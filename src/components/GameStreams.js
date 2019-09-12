import React, {useState, useEffect} from 'react';
import krakenApi from '../krakenApi';
import {resize} from './Resize';
import StreamTemplate from './StreamTemplate';

function GameStreams({match, location}) {

  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() =>{
    const fetchData = async () => {
      const result = await krakenApi.get(
        `https://api.twitch.tv/kraken/streams/?game=${location.state.gameName}`
      );
      let dataArray = result.data.streams;
      let finalArray = dataArray.map(stream => {
        stream.preview.template = resize(stream.preview.template);
        return stream;
      }, []);
      let totalViewers = finalArray.reduce((accum, value) => {
        return accum + value.viewers;
      }, 0) ;

      setViewers(totalViewers);
      setStreamData(finalArray);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-center'>{match.params.name} Streams</h1>
      <h3 className='text-center'>
        <strong className='text-primary'>{viewers}</strong> people currently
        watching {match.params.name}
      </h3>
      {StreamTemplate(streamData)}
    </div>
  );
}

export default GameStreams;
