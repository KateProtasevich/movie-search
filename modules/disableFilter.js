import { posterChecked, ratingChecked, filterContainer } from './const.js';
import { yearSlider, ratingSlider } from './nouislider-custom.js';


function disableFilter(isDisable) {
  if (isDisable) {
    ratingSlider.setAttribute('disabled', true);
    yearSlider.setAttribute('disabled', true);
    posterChecked.disabled = true;
    ratingChecked.disabled = true;
    filterContainer.style.opacity = '0.5';
  } else {
    yearSlider.removeAttribute('disabled');
    posterChecked.disabled = false;
    ratingChecked.disabled = false;
    if (ratingChecked.checked) {
      ratingSlider.removeAttribute('disabled');
    }
    filterContainer.style.opacity = '1';
  }
}

export default disableFilter;
