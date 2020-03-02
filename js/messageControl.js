'use strict';

(function () {
  var similarSuccessMessage = document.querySelector('.success');
  var successButton = document.querySelector('.success__button');
  var similarErrorMessage = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');

  var closeSuccessButton = function () {
    similarSuccessMessage.classList.add('visually-hidden');
    document.querySelector('body').classList.remove('modal-open');
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

  var closeErrorButton = function () {
    similarErrorMessage.classList.add('visually-hidden');
  };

  errorButton.addEventListener('click', function () {
    closeErrorButton();
  });

  document.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, closeErrorButton);
  });

  similarErrorMessage.addEventListener('click', function (evt) {
    if (evt.target.className !== 'error__inner') {
      closeErrorButton();
    }
  });

})();
