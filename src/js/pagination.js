import axios from 'axios';
import { BASE_URL, API_KEY } from '../movies-api.js';

async function fetchTrending() {
  const trending = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );

  return trending.data;
}

console.log(`test`);
console.log(BASE_URL);
console.log(API_KEY);

fetchTrending().then(data => {
  console.log(data);
  console.log(data.total_pages);
});

// sample fetch of trending movies of the day
// `https://api.themoviedb.org/3/trending/movie/day?api_key=501e1ebdba2c876248a4362c6a52c018`
