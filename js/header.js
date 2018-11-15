'use strict';

// показать/скрыть меню корзины в шапке
(function () {
  var container = document.querySelector('.page-header__cart-wrapper');
  var button = container.querySelector('.page-header__cart-top-item');
  var buttonIcon = container.querySelector('.page-header__cart-button');
  var menu = container.querySelector('.page-header__cart-form');

  container.addEventListener('click', function (evt) {
    evt.preventDefault();
    var isButton = evt.target.closest('.page-header__cart-top-item') || evt.target.closest('.page-header__cart-button');
    if (isButton) {
      button.classList.toggle('page-header__cart-top-item--active');
      buttonIcon.classList.toggle('page-header__cart-top-item--active');
      menu.classList.toggle('page-header__cart-form--active');
      container.classList.toggle('page-header__cart-wrapper--active');

      if (button.classList.contains('page-header__cart-top-item--active')) {
        button.title = 'Закрыть корзину';
        buttonIcon.title = 'Закрыть корзину';
        document.addEventListener('keydown', modalEscPressHandler);
      } else {
        button.title = 'Открыть корзину';
        buttonIcon.title = 'Открыть корзину';
        document.removeEventListener('keydown', modalEscPressHandler);
      }
    }
  });

  var modalEscPressHandler = function (evt) {
    window.utils.escPressHandler(evt, closeModal);
  };

  var closeModal = function () {
    button.title = 'Открыть меню';
    buttonIcon.title = 'Открыть меню';
    button.classList.remove('page-header__cart-top-item--active');
    buttonIcon.classList.remove('page-header__cart-top-item--active');
    menu.classList.remove('page-header__cart-form--active');
    container.classList.remove('page-header__cart-wrapper--active');
    document.removeEventListener('keydown', modalEscPressHandler);
  };
})();

// изменения количества товаров
(function () {
  var body = document.querySelector('body');
  var containers = body.querySelectorAll('.goods-container');
  var buttonRemoveAll = body.querySelectorAll('.goods-delete-all');
  var MIN_COUNT = 1;
  var MAX_COUNT = 100;

  var getTotalPrice = function () {
    var price = body.querySelectorAll('.goods-price-value');
    var totalPrice = body.querySelectorAll('.goods-total-price-value');
    var totalPriceValue;
    var totalPriceArray = [];

    Array.from(price).forEach(function (item) {
      totalPriceArray.push(parseInt(item.textContent, 10));
    });

    if (totalPriceArray.length !== 0) {
      totalPriceValue = totalPriceArray.reduce(function (accumulator, item) {
        return accumulator + item;
      });
    } else {
      totalPriceValue = 0;
    }

    Array.from(totalPrice).forEach(function (item) {
      item.textContent = totalPriceValue;
    });
  };

  var getTotalGoods = function () {
    var goods = body.querySelectorAll('.goods-input');
    var itemGoods = body.querySelectorAll('.goods-item');
    var totalValue;
    var totalValueArray = [];

    Array.from(goods).forEach(function (item) {
      if (!isNaN(parseInt(item.value, 10))) {
        totalValueArray.push(parseInt(item.value, 10));
      }
    });

    if (totalValueArray.length !== 0) {
      totalValue = totalValueArray.reduce(function (accumulator, item) {
        return accumulator + item;
      });
    } else {
      totalValue = 0;
    }

    Array.from(itemGoods).forEach(function (item) {
      item.textContent = totalValue;
    });
  };

  var getChangePriceValue = function (element, value, price) {
    element.textContent = value * price
  };

  var removeAllItem = function () {
    Array.from(containers).forEach(function (item) {
      item.remove();
    });
  };

  var getChangePrice = function (evt, item) {
    var input = item.querySelector('.goods-input');
    var currentValue = input.value;
    var price = item.querySelector('.goods-price-value');
    var priceValue = price.dataset.price;
    var target = evt.target;
    var subtraction = target.closest('.goods-subtraction');
    var addition = target.closest('.goods-addition');
    var remove = target.closest('.goods-delete');

    if (subtraction && currentValue > MIN_COUNT) {
      input.value--;
      price.textContent = parseInt(price.textContent, 10) - parseInt(priceValue, 10);
    }
    if (addition && currentValue < MAX_COUNT) {
      input.value++;
      price.textContent = parseInt(price.textContent, 10) + parseInt(priceValue, 10);
    }
    if (evt.type === 'input') {
      getChangePriceValue(price, currentValue, priceValue);
    }

    if (remove) {
      item.remove();
    }
  };

  var getControllButton = function (item) {
    var input = item.querySelector('.goods-input');
    var subtraction = item.querySelector('.goods-subtraction');
    var addition = item.querySelector('.goods-addition');
    var inputValue = parseInt(input.value, 10);
    var minCount = inputValue <= MIN_COUNT;
    var maxCount = inputValue >= MAX_COUNT;

    subtraction.disabled = minCount ? minCount : false;
    addition.disabled = maxCount ? maxCount : false;
  };

  Array.from(containers).forEach(function (item) {
    item.addEventListener('click', function (evt) {
      getChangePrice(evt, item);
      getTotalPrice();
      getTotalGoods();
      getControllButton(item);
    });


    item.addEventListener('input', function (evt) {
      getChangePrice(evt, item);
      getTotalPrice();
      getTotalGoods();
      getControllButton(item);
    });

    getControllButton(item);
  });

  window.addEventListener('load', function () {
    getTotalPrice();
    getTotalGoods();
  });

  Array.from(buttonRemoveAll).forEach(function (item) {
    item.addEventListener('click', function () {
      removeAllItem();
      getTotalPrice();
      getTotalGoods();
    });
  });
})();

// показать/скрыть контакты
(function () {
  var container = document.querySelector('.page-header__right-container');
  var button = container.querySelector('.page-header__right-button');
  var menu = container.querySelector('.page-header__right-list');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    this.classList.toggle('page-header__right-button--active');
    menu.classList.toggle('page-header__right-list--active');

    if (this.classList.contains('page-header__right-button--active')) {
      this.title = 'Закрыть контакты';
      document.addEventListener('keydown', modalEscPressHandler);
    } else {
      this.title = 'Открыть контакты';
      document.removeEventListener('keydown', modalEscPressHandler);
    }
  });

  var modalEscPressHandler = function (evt) {
    window.utils.escPressHandler(evt, closeModal);
  };

  var closeModal = function () {
    button.title = 'Открыть контакты';
    button.classList.remove('page-header__right-button--active');
    menu.classList.remove('page-header__right-list--active');
    document.removeEventListener('keydown', modalEscPressHandler);
  };
})();

// показать/скрыть меню
(function () {
  var container = document.querySelector('.page-header__vertical-menu');
  var button = container.querySelector('.page-header__vertical-button');
  var menu = container.querySelector('.page-header__vertical-menu-content');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    this.classList.toggle('page-header__vertical-button--active');
    menu.classList.toggle('page-header__vertical-menu-content--active');

    if (this.classList.contains('page-header__vertical-button--active')) {
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
    button.classList.remove('page-header__vertical-button--active');
    menu.classList.remove('page-header__vertical-menu-content--active');
    document.removeEventListener('keydown', modalEscPressHandler);
  };
})();
