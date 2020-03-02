'use strict';

(function () {
  var similarErrorMessageTemplate = document.querySelector('#error').
  content.querySelector('.error');
  var similarSuccessMessageTemplate = document.querySelector('#success').
  content.querySelector('.success');
  var main = document.querySelector('main');


  var createErrorMessage = function (errorMessage) {
    var errorMessageElement = similarErrorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    errorMessageElement.style.zIndex = '100';
    errorMessageElement.style.position = 'absolute';
    return errorMessageElement;
  };


  var addErrorMessage = function (message) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createErrorMessage(message));
    main.appendChild(fragment);
    document.querySelector('.error').classList.add('visually-hidden');
  };

  addErrorMessage();

  var createSuccessMessage = function () {
    var successMessageElement = similarSuccessMessageTemplate.cloneNode(true);
    return successMessageElement;
  };

  var addSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createSuccessMessage());
    main.appendChild(fragment);
    document.querySelector('.success').classList.add('visually-hidden');
  };

  addSuccessMessage();

})();
