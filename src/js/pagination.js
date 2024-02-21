import axios from 'axios';
import { BASE_URL, API_KEY } from '../movies-api.js';

//exports:
// selectedPage
// paginate()

// ###############################################################
// Variable Declarations and Assignments
// ###############################################################
const movieList = document.querySelector('#movie-list'); // to change to data from API
const paginationContainer = document.querySelector('#pagination');
let gSelectedPage = 1;
let gItemsPerPage = 3;
let testItems = Array.from(movieList.getElementsByTagName('li'));

async function fetchTrending() {
  const trending = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return trending.data;
}

//
//
// ###############################################################
// Functions
// ###############################################################
// export function paginate(data) {}

function showMovies(data, resultContainer, perPage, pageSelected) {
  // ################################
  // data: array of movies
  // resultContainer: container of results to show
  // perPage: items to show per page
  // pageSelected: the page number selected
  // ################################

  resultContainer.innerHTML = '';

  const dataToShow = data.slice(
    (pageSelected - 1) * perPage,
    (pageSelected - 1) * perPage + perPage
  );

  for (let i = 0; i < dataToShow.length; i++) {
    resultContainer.appendChild(dataToShow[i]);
  }

  refreshPagination(
    testItems,
    paginationContainer,
    gItemsPerPage,
    gSelectedPage
  );
}

function refreshPagination(data, pagination, perPage, pageSelected) {
  // ################################
  // data: array of movies
  // pagination: container of pagination
  // perPage: items to show per page
  // pageSelected: the page number selected
  // ################################

  const totalPages = Math.ceil(data.length / perPage);

  pagination.innerHTML = '';

  let pagesToDisplay = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesToDisplay.push(i);
  }

  pagesToDisplay.forEach(page => {
    let liElement = document.createElement('li');
    let linkElement = document.createElement('a');
    linkElement.href = '#';
    linkElement.textContent = page;
    linkElement.className = 'page-choice';

    if (pageSelected === page) {
      linkElement.classList.add('active');
    }

    liElement.appendChild(linkElement);
    pagination.appendChild(liElement);

    linkElement.addEventListener('click', clickedPage);
  });
}

function clickedPage(event) {
  const selected = event.target.innerHTML;
  gSelectedPage = selected;
  showMovies(testItems, movieList, gItemsPerPage, selected);

  // const activeButton = document.querySelector('#pagination li a.active');
  // activeButton.classList.remove('active');
  // event.target.classList.add('active');
}

showMovies(testItems, movieList, gItemsPerPage, gSelectedPage);
refreshPagination(testItems, paginationContainer, gItemsPerPage, gSelectedPage);

//
//
// ###############################################################
// Initialization
// ###############################################################
fetchTrending().then(data => {
  console.log(data);
  console.log(data.results);
  // movieList = data.results;
});

// sample fetch of trending movies of the day
// `https://api.themoviedb.org/3/trending/movie/day?api_key=501e1ebdba2c876248a4362c6a52c018`
