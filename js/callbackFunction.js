'use strict';

(function () {
  var MAX_PICTURE_COUNT = 25;
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var similarListElement = document.querySelector('.pictures');
  var filtersInactive = document.querySelector('.img-filters');
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

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  var render = function (arrayPictures, hh) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < hh; i++) {
      fragment.appendChild(createPicture(arrayPictures[i], i));
    }
    similarListElement.appendChild(fragment);
  };

  var renderRanom = function (arrayPictures, hh) {
    var fragment = document.createDocumentFragment();
    var fff = arrayPictures.slice();
    shuffleArray(fff);
    for (var i = 0; i < hh; i++) {
      fragment.appendChild(createPicture(fff[i], i));
    }
    similarListElement.appendChild(fragment);
  };


  var renderDisscus = function (arrayPictures, hh) {
    var fragment = document.createDocumentFragment();
    var fff = arrayPictures.slice();
    fff.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });

    for (var i = 0; i < hh; i++) {
      fragment.appendChild(createPicture(fff[i], i));
    }
    similarListElement.appendChild(fragment);
  };


  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');


  var arrayPictures;
  var successLoadHandler = function (picture) {
    arrayPictures = picture;
    render(arrayPictures, MAX_PICTURE_COUNT);
    filtersInactive.classList.remove('img-filters--inactive');
  };


  filterRandom.addEventListener('click', window.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (it) {

      it.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    renderRanom(arrayPictures, 11);
  }));


  filterDefault.addEventListener('click', window.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (it) {

      it.remove();
    });
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    render(arrayPictures, 25);
  }));

  filterDiscussed.addEventListener('click', window.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (it) {

      it.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    renderDisscus(arrayPictures, 25);
  }));


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
    succesSaveHandler: succesSaveHandler,
    arrayPictures: arrayPictures,
    render: render
  };
})();
