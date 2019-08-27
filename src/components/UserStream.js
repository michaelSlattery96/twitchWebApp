import React from 'react';

function UserStream(props) {

  const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

  const script = document.createElement('script');
  script.setAttribute(
    'src',
    EMBED_URL
  );
  script.addEventListener('load', () => {
    new window.Twitch.Embed("twitch-embed",
      {
        width: '1600',
        height: '800',
        channel: props.location.state.channel
      }
    );
  });
  document.body.appendChild(script);

  return (
    <div id={props.targetID}></div>
  );
}

UserStream.defaultProps = {
  targetID: 'twitch-embed',
  width: '1600',
  height: '800',
}

export default UserStream;
