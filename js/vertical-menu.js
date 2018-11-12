'use strict';

// показать/скрыть меню
(function () {
  var container = document.querySelector('.vertical-menu');
  var button = container.querySelector('.vertical-menu__button-menu');
  var menu = container.querySelector('.vertical-menu__list');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    this.classList.toggle('vertical-menu__button-menu--active');
    menu.classList.toggle('vertical-menu__list--active');
    container.classList.toggle('vertical-menu--active');

    if (this.classList.contains('vertical-menu__button-menu--active')) {
      this.title = 'Закрыть меню';
      document.addEventListener('keydown', modalEscPressHandler);
    } else {
      this.title = 'Открыть меню';
      document.removeEventListener('keydown', modalEscPressHandler);
    }
  });

  var modalEscPressHandler = function (evt) {
    window.utils.escPressHandler(evt, closeModal);
  };

  var closeModal = function () {
    button.title = 'Открыть контакты';
    button.classList.remove('vertical-menu__button-menu--active');
    menu.classList.remove('vertical-menu__list--active');
    container.classList.remove('vertical-menu--active');
    document.removeEventListener('keydown', modalEscPressHandler);
  };
})();
