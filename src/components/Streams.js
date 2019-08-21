import React, {useState, useEffect} from 'react';
import api from '../api';
import {resize} from './Resize';
import StreamTemplate from './StreamTemplate';

function Streams() {

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/streams");
      let dataArray = result.data.data;

      let gameIds = dataArray.map(stream => {
        return stream.game_id;
      });

      let uniqueGameIds = gameIds.filter((id, pos) => {
        return gameIds.indexOf(id) == pos;
      })

      let baseUrl = "https://api.twitch.tv/helix/games?";
      let queryParameters = "";

      uniqueGameIds.map(id => {
        return queryParameters = queryParameters + `id=${id}&`;
      })

      let finalUrl = baseUrl + queryParameters;
      let gameNames = await api.get(finalUrl);
      let gamesArray = gameNames.data.data;

      let finalArray = dataArray.map(stream => {
        stream.gameName = ""
        gamesArray.map(game => {
          if (stream.game_id === game.id) {
            return stream.gameName = game.name;
          }
        });

        stream.thumbnail_url = resize(stream.thumbnail_url);
        return stream;
      });
      setChannels(result.data.data);
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
