const mySwiper = new Swiper('.swiper-container', {
  autoHeight: true,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  centerInsufficientSlides: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    901: {
      slidesPerView: 2,
      spaceBetween: 70,
    },
    1281: {
      slidesPerView: 3,
      spaceBetween: 70,
    },
    1601: {
      slidesPerView: 4,
      spaceBetween: 70,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 10,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

export default mySwiper;
