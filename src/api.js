import axios from 'axios';

const url = "http://localhost:3001/users"

let api = axios.create();

function getApiKey() {
  axios.get(url).then( res => {
    api.defaults.headers.common['Client-ID'] = res.data[0].apiKey;
  });
}

// Comment out getApiKey and set Client-ID to your own twitch api key.
getApiKey();
// api.defaults.headers.common['Client-ID'] = <twitch api key>;

export default api;
