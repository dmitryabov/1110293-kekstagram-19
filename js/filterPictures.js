'use strict';

(function () {
  var MAX_PICTURE_COUNT = 25;
  var RANDOM_PICTURE_COUNT = 10;
  var filterDefault = document.querySelector('#filter-default');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterRandom = document.querySelector('#filter-random');

  var defaultPicturesHandler = function (pictures, count) {
    window.pictures.remove();
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    window.callbackFunction.copyPictures = pictures.slice();
    window.pictures.render(window.callbackFunction.copyPictures, count);
  };

  var renderRandomPictures = function (pictures, count) {
    window.pictures.remove();
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    window.callbackFunction.copyPictures = pictures.slice();
    window.util.shufflesArray(window.callbackFunction.copyPictures);
    window.pictures.render(window.callbackFunction.copyPictures, count);
  };

  var disscusFilterHandler = function (pictures, count) {
    window.pictures.remove();
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    window.callbackFunction.copyPictures = pictures.slice();
    window.util.sort(window.callbackFunction.copyPictures);
    window.pictures.render(window.callbackFunction.copyPictures, count);

  };

  filterRandom.addEventListener('click', window.debounce(function () {
    window.filterPictures.random(window.callbackFunction.arrayPictures, RANDOM_PICTURE_COUNT);
  }));

  filterDefault.addEventListener('click', window.debounce(function () {
    window.filterPictures.default(window.callbackFunction.arrayPictures, MAX_PICTURE_COUNT);
  }));

  filterDiscussed.addEventListener('click', window.debounce(function () {
    window.filterPictures.disscus(window.callbackFunction.arrayPictures, MAX_PICTURE_COUNT);
  }));

  window.filterPictures = {
    default: defaultPicturesHandler,
    random: renderRandomPictures,
    disscus: disscusFilterHandler
  };

})();
