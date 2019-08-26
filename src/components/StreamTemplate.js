import React from 'react';
import {Link} from 'react-router-dom';

function StreamTemplate(streams) {
  return (
    <div className='row'>
      {streams.map(stream => (
        <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
          <div className='card text-center'>
            <img className='card-img-top' src={stream.thumbnail_url}/>
            <div className='card-body'>
              <h5 className='card-title'>{stream.user_name}</h5>
              <h5 className='card-title'>{stream.gameName}</h5>
              <div className='card-text'>
                {stream.viewer_count} live viewers
              </div>
              <button className='btn btn-success'>
                <Link className='link' to={{
                  pathname: "profile/" + stream.user_name,
                  state: { channel: stream.user_name }
                }}>
                watch {stream.user_name}'s channel
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StreamTemplate;
