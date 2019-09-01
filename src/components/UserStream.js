import React, {useEffect} from 'react';

function UserStream(props) {

  const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

  let embed;

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      EMBED_URL
    );
    script.addEventListener('load', () => {
      embed = new window.Twitch.Embed('twitch-embed',
        {
          width: "100%",
          height: "100%",
          channel: props.location.state.channel
        }
      );
    });
    document.body.appendChild(script);
  });

  return (
    <div class='center' id='twitch-embed'></div>
  );
}

export default UserStream;
