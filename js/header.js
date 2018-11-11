'use strict';

// корзина в шапке
(function () {
  var container = document.querySelector('.page-header__cart-wrapper');
  var button = container.querySelector('.page-header__cart-top-item');
  var menu = container.querySelector('.page-header__cart-form');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    this.classList.toggle('page-header__cart-top-item--active');
    menu.classList.toggle('page-header__cart-form--active');
    container.classList.toggle('page-header__cart-wrapper--active');

    if (this.classList.contains('page-header__cart-top-item--active')) {
      this.title = 'Закрыть корзину';
      document.addEventListener('keydown', modalEscPressHandler);
    } else {
      this.title = 'Открыть корзину';
      document.removeEventListener('keydown', modalEscPressHandler);
    }
  });

  var modalEscPressHandler = function (evt) {
    window.utils.escPressHandler(evt, closeModal);
  };

  var closeModal = function () {
    button.title = 'Открыть меню';
    button.classList.remove('page-header__cart-top-item--active');
    menu.classList.remove('page-header__cart-form--active');
    container.classList.remove('page-header__cart-wrapper--active');
    document.removeEventListener('keydown', modalEscPressHandler);
  };
})();

// изменения количества товаров
(function () {
  var body = document.querySelector('body');
  var form = body.querySelector('.goods-form');
  var itemGoods = body.querySelector('.page-header__cart-top-item-goods');
  var containers = form.querySelectorAll('.goods-container');
  var totalPrice = body.querySelectorAll('.goods-total-price-value');
  var MIN_COUNT = 1;
  var MAX_COUNT = 100;


  var getTotalPrice = function () {
    var price = document.querySelectorAll('.goods-price-value');
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
    var goods = document.querySelectorAll('.goods-input');
    var totalValue;
    var totalValueArray = [];

    Array.from(goods).forEach(function (item) {
      totalValueArray.push(parseInt(item.value, 10));
    });

    if (totalValueArray.length !== 0) {
      totalValue = totalValueArray.reduce(function (accumulator, item) {
        return accumulator + item;
      });
    } else {
      totalValue = 0;
    }
    itemGoods.textContent = totalValue;
  };

  var getChangePriceValue = function (element, value, price) {
    element.textContent = value * price
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

  Array.from(containers).forEach(function (item) {
    item.addEventListener('click', function (evt) {
      getChangePrice(evt, item);
      getTotalPrice();
      getTotalGoods();
    });


    item.addEventListener('input', function (evt) {
      getChangePrice(evt, item);
      getTotalPrice();
      getTotalGoods();
    });
  });

  window.addEventListener('load', function () {
    getTotalPrice();
    getTotalGoods();
  })
})();
