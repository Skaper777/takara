'use strict';

// дроп меню
(function () {
  var body = document.querySelector('body');
  var dropMenu = body.querySelectorAll('.drop-down');
  var dropMenuButton = body.querySelectorAll('.drop-down__button');


  Array.from(dropMenu).forEach(function (item, index) {
    item.addEventListener('click', function (evt) {
      var list = item.querySelector('.drop-down__list');
      var search = item.querySelector('.drop-down__label-search');
      var isButton = evt.target.closest('.drop-down__button');
      var isLink = evt.target.closest('.drop-down__link');
      var isSearch = evt.target.closest('.drop-down__link--search');

      list.classList.remove('drop-down__list--hidden');

      if (isButton) {
        list.classList.toggle('drop-down__list--active');
        dropMenuButton[index].classList.toggle('drop-down__button--active');
        document.addEventListener('keydown', modalEscPressHandler);
      }
      if (isLink && !isSearch) {
        evt.preventDefault();
        list.classList.remove('drop-down__list--active');
        dropMenuButton[index].classList.remove('drop-down__button--active');
        search.classList.remove('drop-down__label-search--active');
        dropMenuButton[index].textContent = evt.target.textContent;
        document.removeEventListener('keydown', modalEscPressHandler);
      }
      if (isSearch) {
        evt.preventDefault();
        list.classList.remove('drop-down__list--active');
        dropMenuButton[index].classList.remove('drop-down__button--active');
        dropMenuButton[index].textContent = evt.target.textContent;
        search.classList.add('drop-down__label-search--active');
        search.focus();
        document.removeEventListener('keydown', modalEscPressHandler);
      }
    })
  });

  var modalEscPressHandler = function (evt) {
    window.utils.escPressHandler(evt, closeModal);
  };
  document.addEventListener('keydown', modalEscPressHandler);

  var closeModal = function () {
    var addActiveButton = body.querySelectorAll('.drop-down__button--active');

    Array.from(addActiveButton).forEach(function (item) {
      item.classList.remove('drop-down__button--active');
      item.nextSibling.nextSibling.querySelector('.drop-down__list--active').classList.remove('drop-down__list--active');
      document.removeEventListener('keydown', modalEscPressHandler);
    });
  };
})();
