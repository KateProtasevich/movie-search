
import createSlide from './createSlide.js';
import mySwiper from './slider.js';
import updateSlider from './updateSlider.js';

function appendMovieSlides(searchArr, n) {
  const arrSlides10 = [];
  searchArr[n].forEach((item, i) => {
    arrSlides10.push(createSlide(item));
    mySwiper.appendSlide(arrSlides10[i]);
    updateSlider(mySwiper);
  });
}
export default appendMovieSlides;
