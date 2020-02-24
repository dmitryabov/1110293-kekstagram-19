'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');


  window.util.removeElement(commentsElement);


  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var URL = 'https://js.dump.academy/kekstagram';

  window.backend.load(window.callbackFunction.successLoadHandler, window.callbackFunction.errorHandler, URL_DATA, 'GET');


  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.load(window.callbackFunction.succesSaveHandler, window.callbackFunction.errorHandler, URL, 'POST', new FormData(form));
    evt.preventDefault();
  });


})();
