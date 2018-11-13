'use strict';

(function () {
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var popularList = new Swiper('.popular-list__container', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    navigation: {
      nextEl: '.popular-slider__btn-next',
      prevEl: '.popular-slider__btn-prev',
    },
    breakpoints: {
      1024: {
        allowTouchMove: true,
        spaceBetween: 10,
      },
    }
  });
})();
