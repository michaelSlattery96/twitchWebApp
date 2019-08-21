import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from '../api';
import {resize} from './Resize';

function Games() {

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/games/top");
      let dataArray = result.data.data;
      let finalArray = dataArray.map(game => {
        game.box_art_url = resize(game.box_art_url);
        return game;
      })
      setGames(result.data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Most Popular Games</h1>
      <div className='row'>
        {games.map(topGame => (
          <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
            <div className='card text-center'>
              <img className='card-img-top' src={topGame.box_art_url}/>
              <div className='card-body'>
                <h5 className='card-title'>{topGame.name}</h5>
                <button className='btn btn-success'>
                  <Link className='link' to={{
                    pathname: 'game/' + topGame.name,
                    state:  {gameID: topGame.id}
                  }}>
                  {topGame.name} streams{" "}
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
