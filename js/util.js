'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };


  var generateInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };


  var onEnterPress = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action(evt);
    }
  };

  var onEscPress = function (evt, action) {
    if (evt.key === ESCAPE_KEY) {
      action(evt);
    }
  };


  var removeElement = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };


  var shufflesArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };


  var sortArray = function (array) {
    array.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });
  };


  window.util = {
    onEscPress: onEscPress,
    getRandomElement: getRandomElement,
    generateInteger: generateInteger,
    onEnterPress: onEnterPress,
    removeElement: removeElement,
    shufflesArray: shufflesArray,
    makeElement: makeElement,
    sort: sortArray
  };

})();
