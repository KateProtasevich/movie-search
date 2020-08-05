import { posterChecked, ratingChecked } from './const.js';
import { yearSlider, ratingSlider } from './nouislider-custom.js';

function filterMovie(array) {
  let filteredArrayOfMovies = [];
  const yearFrom = yearSlider.noUiSlider.get()[0];
  const yearTo = yearSlider.noUiSlider.get()[1];
  const ratingFrom = ratingSlider.noUiSlider.get()[0];
  const ratingTo = ratingSlider.noUiSlider.get()[1];

  function filterFunc(value) {
    if (value.Type === 'game') {
      return false;
    } else {
      if (posterChecked.checked) {
        if (value.Poster === 'N/A' || value.Poster === 'Not found') {
          return false;
        }
      }
      if (parseInt(value.Year, 10) < yearFrom || parseInt(value.Year, 10) > yearTo) {
        return false;
      }
      if (ratingChecked.checked) {
        if (window.isNaN(value.rating)) {
          return false;
        } else if (parseFloat(value.rating) < ratingFrom || parseFloat(value.rating) > ratingTo) {
          return false;
        }
      }
    }
    return true;
  }


  function sliceArray(arr) {
    let start = 0;
    let end = 0;
    const newArr = [];

    while (end <= arr.length - 1) {
      end += 10;
      newArr.push(arr.slice(start, end));
      start = end;
    }

    return newArr;
  }
  filteredArrayOfMovies = array.flat().filter(filterFunc);
  return sliceArray(filteredArrayOfMovies);
}

export default filterMovie;
