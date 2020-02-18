'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };


  var generateInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };


  var onEnterPress = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };


  var removeElement = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };


  window.util = {
    getRandomElement: getRandomElement,
    generateInteger: generateInteger,
    onEnterPress: onEnterPress,
    removeElement: removeElement
  };

})();
