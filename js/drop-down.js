'use strict';

// дроп меню
(function () {
  var body = document.querySelector('body');
  var dropMenu = body.querySelectorAll('.drop-down');
  var dropMenuContainer = body.querySelectorAll('.drop-down__list-wrapper');
  var dropMenuButton = body.querySelectorAll('.drop-down__button');


  Array.from(dropMenu).forEach(function (item, index) {
    item.addEventListener('click', function (evt) {
      if (evt.target.closest('.drop-down__button')) {
        dropMenuContainer[index].classList.toggle('drop-down__list-wrapper--active');
        dropMenuButton[index].classList.toggle('drop-down__button--active');
        document.addEventListener('keydown', modalEscPressHandler);
      }
      if (evt.target.closest('.drop-down__link')) {
        evt.preventDefault();
        dropMenuContainer[index].classList.remove('drop-down__list-wrapper--active');
        dropMenuButton[index].classList.remove('drop-down__button--active');
        dropMenuButton[index].textContent = evt.target.textContent;

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
      item.nextSibling.nextSibling.classList.remove('drop-down__list-wrapper--active');
      document.removeEventListener('keydown', modalEscPressHandler);
    });
  };
})();
