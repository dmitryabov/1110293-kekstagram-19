'use strict';

(function () {
  var MAX_PICTURE_COUNT = 25;
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').
  content.querySelector('.picture');
  var similarErrorMessageTemplate = document.querySelector('#error').
  content.querySelector('.error');
  var similarSuccessMessageTemplate = document.querySelector('#success').
  content.querySelector('.success');


  var createErrorMessage = function (errorMessage) {
    var errorMessageElement = similarErrorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    errorMessageElement.style.zIndex = '100';
    errorMessageElement.style.position = 'absolute';
    return errorMessageElement;
  };


  var createSuccessMessage = function () {
    var successMessageElement = similarSuccessMessageTemplate.cloneNode(true);
    return successMessageElement;
  };


  var createPicture = function (picture, count) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.id = count + '';
    pictureElement.querySelector('.picture__img').setAttribute('tabindex', count + '');
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };


  var successLoadHandler = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_PICTURE_COUNT; i++) {
      fragment.appendChild(createPicture(pictures[i], i));
    }
    similarListElement.appendChild(fragment);

  };


  var main = document.querySelector('main');

  var addSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createSuccessMessage());
    main.appendChild(fragment);
    document.querySelector('.success').classList.add('visually-hidden');
  };


  addSuccessMessage();


  var succesSaveHandler = function () {
    imgOverlay.classList.add('hidden');
    document.querySelector('.success').classList.remove('visually-hidden');

  };


  var addErrorMessage = function (message) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createErrorMessage(message));
    main.appendChild(fragment);
    document.querySelector('.error').classList.add('visually-hidden');
  };


  addErrorMessage();


  var errorHandler = function (errorMessage) {
    imgOverlay.classList.add('hidden');
    document.querySelector('.error__title').textContent = errorMessage;
    document.querySelector('.error').classList.remove('visually-hidden');
  };


  window.callbackFunction = {
    successLoadHandler: successLoadHandler,
    errorHandler: errorHandler,
    succesSaveHandler: succesSaveHandler
  };

})();
