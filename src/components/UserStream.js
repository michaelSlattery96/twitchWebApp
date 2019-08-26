import React from 'react';
import ReactDOM from 'react-dom';

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

class UserStream extends React.Component {
  componentDidMount() {
    let embed;
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      EMBED_URL
    );
    script.addEventListener('load', () => {
      embed = new window.Twitch.Embed("twitch-embed",
        {
          width: '1600',
          height: '800',
          channel: this.props.location.state.channel
        }
      );
    });
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        Hello {this.props.location.state.channel}
        <div id={this.props.targetID}>test</div>
      </div>
    )
  }
}

UserStream.defaultProps = {
  targetID: 'twitch-embed',
  width: '1600',
  height: '800',
}

export default UserStream;
