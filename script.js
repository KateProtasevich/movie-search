/* eslint-disable import/no-cycle */
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
/* eslint-disable import/prefer-default-export */
import mySwiper from './modules/slider.js';
import loading from './modules/loading.js';
import filterMovie from './modules/filterMovie.js';

import appendMovieSlides from './modules/appendMovieSlides.js';
import showSearchResults from './modules/showSearchResults.js';
import updateSlider from './modules/updateSlider.js';
import { createKeyboard, keyboardWorking, closeKeyboard } from './modules/keyboardFunc.js';
import { yearSlider, ratingSlider, toggleRating } from './modules/nouislider-custom.js';
import disableFilter from './modules/disableFilter.js';
import testImage from './modules/testImage.js';
import {
  inputText, buttonSearch, reset,
  formSearch, sliderChildren, keyboardIcon,
  keyboardContainer, ratingChecked, posterChecked,
} from './modules/const.js';


let copyArray;
let copySearchValue;
function getMovieRating(elem) {
  const movie = elem;
  const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=6e5b1054`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      movie.rating = data.imdbRating;
    });
}

function getFullMovie(arr) {
  arr[arr.length - 1].forEach((item) => {
    getMovieRating(item);
    if (item.Poster !== 'N/A') {
      testImage(item.Poster).then(
        function fulfilled() {
          // console.log('That image is found and loaded', img );
        },
        function rejected() {
          item.Poster = 'Not found';
        },
      );
    }
  });
}

function getArraySearch(param, isSearch) {
  const textForSearch = param;
  const titleOfMovie = param;
  let i = 1;
  const arrayOfMovies = [];
  let filteredArrayOfMovies = [];

  function loadingSlider(array, className) {
    let click = 1;
    mySwiper.off('reachEnd');
    mySwiper.removeAllSlides();
    updateSlider(mySwiper);
    appendMovieSlides(array, 0);
    [...sliderChildren].forEach((item) => {
      item.classList.add(className);
    });
    mySwiper.on('reachEnd', () => {
      if (click <= array.length - 1) {
        appendMovieSlides(array, click);
        [...sliderChildren].forEach((item) => {
          item.classList.add('middle');
        });
        click++;
      }
    });
  }
  function checkedFilter(array, text) {
    [...sliderChildren].forEach((item) => {
      item.classList.remove('middle');
      item.classList.add('hide');
      sliderChildren[0].addEventListener('transitionend', () => {
        loadingSlider(array, 'show');
        loading(false);
        disableFilter(false);
        showSearchResults(text, array);
      });
    });
  }

  async function getMovieFromTitle(title, page) {
    const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=6e5b1054`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.Response === 'True') {
          arrayOfMovies.push(data.Search);
          getFullMovie(arrayOfMovies);
          i++;
          getMovieFromTitle(title, i);
        } else if (arrayOfMovies.length > 0) {
          copyArray = arrayOfMovies;
          copySearchValue = textForSearch;

          filteredArrayOfMovies = filterMovie(arrayOfMovies);
          if (filteredArrayOfMovies.length === 0) {
            showSearchResults(textForSearch, 'Movie not found!');
            return false;
          }

          mySwiper.off('reachEnd');
          if (isSearch) {
            checkedFilter(filteredArrayOfMovies, textForSearch);
          } else {
            loadingSlider(filteredArrayOfMovies, 'middle');
          }
        } else if (isSearch) {
          showSearchResults(textForSearch, data.Error);
          return false;
        }
      } else {
        showSearchResults(textForSearch, `HTTP ${res.status}`);
      }
    } catch (error) {
      showSearchResults(textForSearch, error);
    }
  }
  getMovieFromTitle(titleOfMovie, i);

  function applyFilter() {
    loading(true);
    disableFilter(true);
    const newFilteredArrayOfMovies = filterMovie(copyArray);
    if (newFilteredArrayOfMovies.length > 0) {
      checkedFilter(newFilteredArrayOfMovies, copySearchValue);
    } else {
      loading(false);
      showSearchResults(copySearchValue, 'Movie not found!');
    }
  }
  ratingChecked.addEventListener('click', () => {
    applyFilter();
  });
  posterChecked.addEventListener('change', () => {
    applyFilter();
  });
  yearSlider.addEventListener('click', () => {
    applyFilter();
  });
  ratingSlider.addEventListener('click', () => {
    if (ratingChecked.checked) {
      applyFilter();
    }
  });
}

async function getMovieTranslate(value) {
  try {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200427T125844Z.752a221bde11786a.f52a0a9c541483d29ca933b09cd7f0989348035c&text=${value}&lang=ru-en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      getArraySearch(data.text[0], true);
    } else {
      showSearchResults(value, `HTTP ${res.status}`);
    }
  } catch (error) {
    showSearchResults(value, error);
  }
}

function searchValue(value) {
  loading(true);
  disableFilter(true);
  const valueForSearch = value.trim();
  const pattern = /[А-Яа-я]/;
  if (valueForSearch.match(pattern)) {
    getMovieTranslate(valueForSearch);
  } else {
    getArraySearch(valueForSearch, true);
  }
}

function defaultMovieSlider(title) {
  getArraySearch(title, false);
}


defaultMovieSlider('the avengers');
document.addEventListener('DOMContentLoaded', () => {
  inputText.focus();
  createKeyboard();
});

buttonSearch.addEventListener('click', (event) => {
  event.preventDefault();
  closeKeyboard();
  searchValue(inputText.value);
});

formSearch.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    closeKeyboard();
    searchValue(inputText.value);
  }
});

reset.addEventListener('click', () => {
  inputText.value = '';
  inputText.focus();
});

keyboardIcon.addEventListener('click', () => {
  if (keyboardContainer.style.display !== 'flex') {
    keyboardContainer.style.display = 'flex';
    keyboardWorking();
  }
});


ratingChecked.addEventListener('change', function () {
  toggleRating.call(this, ratingSlider);
});


export { searchValue };
