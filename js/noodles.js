'use strict';

// Суммирования на странице "Лапша Wok"
(function () {
  var container = document.querySelector('.noodles__form');

  var getTotalPrice = function () {
    var price = container.querySelectorAll('.noodles__form-fieldset-wrapper--more .noodles__form-input:checked');
    var priceMain = container.querySelector('.noodles__form-fieldset-price-value');
    var totalPrice = container.querySelector('.noodles__cart-total-value');
    var totalPriceValue;
    var totalPriceArray = [];

    Array.from(price).forEach(function (item) {
      totalPriceArray.push(parseInt(item.parentNode.querySelector('.label-radio__price-value').textContent, 10));
    });

    if (totalPriceArray.length !== 0) {
      totalPriceValue = totalPriceArray.reduce(function (accumulator, item) {
        return accumulator + item;
      });
    } else {
      totalPriceValue = 0;
    }

    totalPrice.textContent = totalPriceValue + parseInt(priceMain.textContent, 10);
  };

  container.addEventListener('change', function () {
    getTotalPrice();
  });

  window.addEventListener('load', function () {
    getTotalPrice();
  })
})();
