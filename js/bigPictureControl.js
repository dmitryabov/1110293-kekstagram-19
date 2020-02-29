'use strict';

(function () {
  var closeButton = document.querySelector('#picture-cancel');


  var closeBigPicture = function () {
    window.bigPicture.close();
  };


  document.addEventListener('click', function (evt) {
    window.bigPicture.open(evt);

  });


  document.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, window.bigPicture.open(evt));
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
