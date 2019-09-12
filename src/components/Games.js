import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import helixApi from '../helixApi';
import {resize} from './Resize';

function Games() {

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await helixApi.get("https://api.twitch.tv/helix/games/top");
      let dataArray = result.data.data;
      let finalArray = dataArray.map(game => {
        game.box_art_url = resize(game.box_art_url);
        return game;
      })
      setGames(finalArray);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Most Popular Games</h1>
      <div className='row'>
        {games.map(topGame => (
          <div className='col-lg-2 col-md-4 col-sm-6 mt-5'>
            <div className='card text-center'>
              <img className='card-img-top' src={topGame.box_art_url}/>
              <div className='card-body'>
                <h5 className='card-title'>{topGame.name}</h5>
                <button className='btn btn-success'>
                  <Link className='link' to={{
                    pathname: 'game/' + topGame.name,
                    state:  {gameName: topGame.name}
                  }}>
                  watch now
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
