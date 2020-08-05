function createSlide(movie) {
  const DEFAULT_POSTER = 'assets/no_poster.jpg';
  const poster = (movie.Poster === 'N/A') ? DEFAULT_POSTER : movie.Poster;
  const movieSlide = document.createElement('div');
  const ratingClass = (movie.rating === 'N/A') ? 'without-rating' : 'with-rating';
  const rating = (movie.rating === 'N/A') ? ' ' : movie.rating;
  movieSlide.classList.add('swiper-slide');
  movieSlide.innerHTML = `<div><h2><a href = "https://www.imdb.com/title/${movie.imdbID}/?ref_=hm_fanfav_tt_3_pd_fp1">${movie.Title}</a></h2><div class = "poster-container" ><img  src = ${poster} alt = ''></div><p>${movie.Year}</p><p class = "movie-rating ${ratingClass}">${rating}</p></div>`;
  return movieSlide;
}

export default createSlide;
