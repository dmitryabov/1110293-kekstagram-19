'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '20';
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var effectsListForm = document.querySelector('.effects__list');
  var effectLevel = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');

  imagePreview.classList.add('effects__preview--none');


  var getPhotoCssEffect = function (evt) {
    if (evt.target.matches('#effect-none')) {
      imagePreview.style.filter = '';
    }
    if (evt.target.matches('#effect-chrome')) {
      imagePreview.style.filter = 'grayscale(0.2)';
    }
    if (evt.target.matches('#effect-sepia')) {
      imagePreview.style.filter = 'sepia(0.2)';
    }
    if (evt.target.matches('#effect-marvin')) {
      imagePreview.style.filter = 'invert(20%)';
    }
    if (evt.target.matches('#effect-phobos')) {
      imagePreview.style.filter = 'blur(0.5px)';
    }
    if (evt.target.matches('#effect-heat')) {
      imagePreview.style.filter = 'brightness(0.5)';
    }
  };


  var addFiltefLine = function (evt) {
    if (evt.target.id === 'effect-none') {
      imgUploadEffectLevel.classList.add('hidden');
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
    }
  };


  var filterChangeHandler = function (evt) {
    getPhotoCssEffect(evt);
    effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
    effectLevel.style.left = DEFAULT_EFFECT_LEVEL + '%';
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
    addFiltefLine(evt);
  };


  effectsListForm.addEventListener('change', filterChangeHandler);


})();
