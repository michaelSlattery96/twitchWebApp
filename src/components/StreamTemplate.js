import React from 'react';

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
                <a
                  className='link'
                  href={'https://twitch.tv/' + stream.user_name}
                  target='_blank'>
                  watch {stream.user_name}'s channel
                </a>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StreamTemplate;
