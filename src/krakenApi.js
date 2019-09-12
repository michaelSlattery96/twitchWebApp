import axios from 'axios';

const url = "http://localhost:3001/users"

let krakenApi = axios.create();

function getApiKey() {
  axios.get(url).then( res => {
    krakenApi.defaults.headers.common['Client-ID'] = res.data[0].apiKey;
  });
}

krakenApi.defaults.headers.common['Accept'] = "application/vnd.twitchtv.v5+json";

// Comment out getApiKey and set Client-ID to your own twitch api key.
getApiKey();
// krakenApi.defaults.headers.common['Client-ID'] = <twitch api key>;

export default krakenApi;
