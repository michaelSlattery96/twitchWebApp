import axios from 'axios';

const url = "http://localhost:3001/users"

let helixApi = axios.create();

function getApiKey() {
  axios.get(url).then( res => {
    helixApi.defaults.headers.common['Client-ID'] = res.data[0].apiKey;
  });
}

// Comment out getApiKey and set Client-ID to your own twitch api key.
getApiKey();
// helixApi.defaults.headers.common['Client-ID'] = <twitch api key>;

export default helixApi;
