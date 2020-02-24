'use strict';

(function () {

  var similarSuccessMessage = document.querySelector('.success');
  var successButton = document.querySelector('.success__button');


  var closeSuccessButton = function () {
    similarSuccessMessage.classList.add('visually-hidden');
  };

  successButton.addEventListener('click', function () {
    closeSuccessButton();
  });


  similarSuccessMessage.addEventListener('click', function (evt) {
    if (evt.target.className !== 'success__inner') {
      closeSuccessButton();
    }
  });

  document.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, closeSuccessButton);
  });


  var similarErrorMessage = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');


  var closeErroButton = function () {
    similarErrorMessage.classList.add('visually-hidden');
  };

  errorButton.addEventListener('click', function () {
    closeErroButton();
  });

  document.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, closeErroButton);
  });


  similarErrorMessage.addEventListener('click', function (evt) {
    if (evt.target.className !== 'error__inner') {
      closeErroButton();
    }
  });
})();
