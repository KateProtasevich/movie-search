import { searchResultField } from './const.js';
import disableFilter from './disableFilter.js';

function showSearchResults(name, arrOrError) {
  disableFilter(false);
  if (Array.isArray(arrOrError)) {
    searchResultField.style.color = 'black';
    const number = arrOrError.flat().length;
    if (number === 1) {
      searchResultField.innerText = `${number} result for "${name}"`;
    } else {
      searchResultField.innerText = `${number} results for "${name}"`;
    }
  } else {
    searchResultField.style.color = 'red';
    if (arrOrError === 'Movie not found!') {
      searchResultField.innerText = `No results for "${name}"`;
    } else if (arrOrError === 'Too many results.') {
      searchResultField.innerText = `Too many results for "${name}"`;
    } else {
      searchResultField.innerText = `Error for "${name}": ${arrOrError}`;
    }
  }
}

export default showSearchResults;
