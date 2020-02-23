'use strict';

(function () {
  var closeButton = document.querySelector('#picture-cancel');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');


  var openBigPicture = function (evt) {
    if (evt.target.matches('img[data-id]')) {
      var pictureNumber = evt.target.getAttribute('data-id');
      commentsElement.appendChild(window.bigPicture.createComment(window.pictures.add[pictureNumber]));
      window.bigPicture.renderBigPicture(window.pictures.add[pictureNumber]);
      document.querySelector('.big-picture').classList.remove('hidden');
    }
  };


  var closeBigPicture = function () {
    document.querySelector('.big-picture').classList.add('hidden');
    commentsElement.textContent = '';
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
