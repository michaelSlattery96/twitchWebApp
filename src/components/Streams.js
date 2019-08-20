import React, {useState, useEffect} from 'react';
import api from '../api';

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

        let newURL = stream.thumbnail_url
          .replace("{width}", "300")
          .replace("{height}", "300")
        stream.thumbnail_url = newURL;
        return stream;
      });
      setChannels(result.data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className='text-center'>Top Live Streams</h1>
      <div className='row'>
        {channels.map(channel => (
          <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
            <div className='card text-center'>
              <img className='card-img-top' src={channel.thumbnail_url}/>
              <div className='card-body'>
                <h5 className='card-title'>{channel.user_name}<  /h5>
                <h5 className='card-title'>{channel.gameName}<  /h5>
                <div className='card-text'>
                  {channel.viewer_count} live viewers
                </div>
                <button className='btn btn-success'>
                  <a
                    className='link'
                    href={'https://twitch.tv/' + channel.user_name}
                    target='_blank'>
                    watch {channel.user_name}'s channel
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streams;
