/* eslint quote-props: ["error", "consistent"] */
/* eslint comma-dangle: ["error", "never"] */
/* eslint func-name-matching: ["error", "never"] */
const yearSlider = document.getElementById('slider-year');
const ratingSlider = document.getElementById('slider-rating');
const date = new Date();
const currentYear = date.getFullYear();

const rangeofYearSlider = {
  'min': [1900],
  '20%': [1960],
  '35%': [1980],
  '65%': [2000],
  'max': [currentYear]
};
document.addEventListener('DOMContentLoaded', () => {
  noUiSlider.create(yearSlider, {
    start: [1900, currentYear],
    tooltips: true,
    pips: null,
    connect: true,
    padding: 0,
    step: 1,
    range: rangeofYearSlider,
    format: {
      to: function (value) {
        return parseInt(value, 10);
      },
      from: function (value) {
        return parseInt(value, 10);
      }
    }
  });

  noUiSlider.create(ratingSlider, {
    start: [0, 10],
    tooltips: true,
    pips: null,
    connect: true,
    padding: 0,
    range: {
      'min': 0,
      'max': 10
    },
    format: {
      to: function (value) {
        return Number(parseFloat(value).toFixed(1));
      },

      from: function (value) {
        return Number(parseFloat(value).toFixed(1));
      }
    }
  });
});

ratingSlider.setAttribute('disabled', true);

function toggleRating(element) {
  if (this.checked) {
    element.removeAttribute('disabled');
  } else {
    element.setAttribute('disabled', true);
  }
}

export { yearSlider, ratingSlider, toggleRating };
