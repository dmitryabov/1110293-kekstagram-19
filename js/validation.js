'use strict';

(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('#upload-submit');


  var addValidationHashtags = function (hashtag) {
    if (!hashtag) {
      submitButton.submit();
    } else if (hashtag[0] !== '#') {
      var messageText = textHashtags.setCustomValidity('Хэш-тег должен начинатся с символа # (решётка)');
    } else if (hashtag.length === 1) {
      messageText = textHashtags.setCustomValidity('Хэштег должен содержать значение кроме решетки');
    } else if (hashtag.length > 20) {
      messageText = textHashtags.setCustomValidity('Хэштег может быть длиной не более 20 символов');
    } else if (hashtag.indexOf('#', 1) > 0) {
      messageText = textHashtags.setCustomValidity('Хэштег должен разделяться пробелом');
    } else if (hashtag.match(/[^#a-zA-Z0-9а-яА-Я]/g)) {
      messageText = textHashtags.setCustomValidity('Строка после решётки не может содержать пробелы, спецсимволы (#, @, $ и т.п.), ');
    } else {
      messageText = textHashtags.setCustomValidity('');
    }
    return messageText;
  };


  var formSubmitHandler = function () {
    var hashtagArray = textHashtags.value.toLowerCase().split(' ');
    for (var i = 0; i < hashtagArray.length; i++) {
      var isHashtagValid = addValidationHashtags(hashtagArray[i]);
      if (!isHashtagValid) {
        break;
      }
      if (hashtagArray.indexOf(hashtagArray[i], i + 1) > 0) {
        textHashtags.setCustomValidity('Хэштеги не должны повторяться');
        break;
      }
    }
    if (hashtagArray.length > 5) {
      textHashtags.setCustomValidity('Хэштегов может быть максимум 5');
    }

    if (!textHashtags.validationMessage) {
      textHashtags.setCustomValidity('');
    }
  };


  submitButton.addEventListener('click', formSubmitHandler);


  var clearCustomValidity = function () {
    textHashtags.setCustomValidity('');
  };


  textHashtags.addEventListener('input', clearCustomValidity);
})();
