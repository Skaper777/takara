'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    escPressHandler: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    }
  };
})();
