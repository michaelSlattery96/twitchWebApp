import React from 'react';
import {Link} from 'react-router-dom';

function StreamTemplate(streams) {
  return (
    <div className='row'>
      {streams.map(stream => (
        <div className='col-lg-2 col-md-4 col-sm-6 mt-5'>
          <div className='card text-center'>
            <img className='card-img-top' src={stream.preview.template}/>
            <div className='card-body'>
              <h5 className='card-title'>{stream.channel.display_name}</h5>
              <h5 className='card-title'>{stream.channel.game}</h5>
              <div className='card-text'>
                {stream.viewers} live viewers
              </div>
              <button className='btn btn-success'>
                <Link className='link' to={{
                  pathname: "profile/" + stream.channel.name,
                  state: { channel: stream.channel.name }
                }}>
                watch now
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
