'use strict';

(function () {
  var closeButton = document.querySelector('#picture-cancel');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  // var commentsLoader = bigPictureElement.querySelector('.social__comments-loader');


  var openBigPicture = function (evt) {
    commentsElement.textContent = '';
    bigPictureElement.querySelector('.big-picture__img').children[0].src = '';
    bigPictureElement.querySelector('.big-picture__img').children[0].alt = '';
    bigPictureElement.querySelector('.likes-count').textContent = '';
    bigPictureElement.querySelector('.social__comment-count').textContent = '';
    bigPictureElement.querySelector('.social__caption').textContent = '';
    window.bigPicture.successLoadHandler(evt);
  };


  var closeBigPicture = function () {
    document.querySelector('.big-picture').classList.add('hidden');

  };


  document.addEventListener('click', function (evt) {
    openBigPicture(evt);
  });


  document.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, openBigPicture);
  });


  closeButton.addEventListener('click', function (evt) {
    closeBigPicture(evt);
  });


  document.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, closeBigPicture);
  });


  closeButton.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, closeBigPicture);
  });


})();
