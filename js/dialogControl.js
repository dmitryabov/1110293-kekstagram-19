'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var textВescription = document.querySelector('.text__description');
  var textHashtags = document.querySelector('.text__hashtags');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var bodyElement = document.querySelector('body');
  var fileUpload = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var buttonForCloseForm = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');


  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY && textHashtags !== document.activeElement && textВescription !== document.activeElement) {
      closePopup();
    }
  };


  var openPopup = function () {
    imageEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    bodyElement.classList.add('modal-open');
    scaleControlValue.value = '100%';
    imgUploadEffectLevel.classList.add('hidden');
  };


  var closePopup = function () {
    imageEditForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    bodyElement.classList.remove('modal-open');
    textHashtags.value = '';
    imagePreview.className = 'effects__preview--none';
    imagePreview.style['transform'] = 'scale(1)';
  };


  fileUpload.addEventListener('change', function () {
    openPopup();
  });


  fileUpload.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, openPopup);
  });


  buttonForCloseForm.addEventListener('click', function () {
    closePopup();
  });


  fileUpload.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, closePopup);
  });


})();
