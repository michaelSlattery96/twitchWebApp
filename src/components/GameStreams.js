import React, {useState, useEffect} from 'react';
import api from '../api';
import {resize} from './Resize';
import StreamTemplate from './StreamTemplate';

function GameStreams({match, location}) {

  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() =>{
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`
      );
      let dataArray = result.data.data;
      let finalArray = dataArray.map(stream => {
        stream.thumbnail_url = resize(stream.thumbnail_url);
        return stream;
      }, []);
      let totalViewers = finalArray.reduce((accum, value) => {
        return accum + value.viewer_count;
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
