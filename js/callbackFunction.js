'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL = 'https://js.dump.academy/kekstagram';
  var MAX_PICTURE_COUNT = 25;
  var form = document.querySelector('.img-upload__form');
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var filtersInactive = document.querySelector('.img-filters');
  var copyPictures;
  var arrayPictures;

  var successLoadHandler = function (picture) {
    window.callbackFunction.arrayPictures = picture;
    window.filterPictures.default(window.callbackFunction.arrayPictures, MAX_PICTURE_COUNT);
    filtersInactive.classList.remove('img-filters--inactive');
  };

  var succesSaveHandler = function () {
    document.querySelector('.success').classList.remove('visually-hidden');
    window.dialogControl.close();
  };

  var errorHandler = function (errorMessage) {
    imgOverlay.classList.add('hidden');
    document.querySelector('.error__title').textContent = errorMessage;
    document.querySelector('.error').classList.remove('visually-hidden');
  };

  var copyPicture;
  window.backend.load(successLoadHandler, errorHandler, URL_DATA, 'GET');

  form.addEventListener('submit', function (evt) {
    window.backend.load(succesSaveHandler, errorHandler, URL, 'POST', new FormData(form));
    evt.preventDefault();
  });


  window.callbackFunction = {
    arrayPictures: arrayPictures,
    copyPictures: copyPictures,
    copyPicture: copyPicture
  };
})();
