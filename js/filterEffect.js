'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '20';
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var effectsListForm = document.querySelector('.effects__list');
  var effectLevel = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');
  var filterListMap = {
    'effect-none': '',
    'effect-chrome': 'grayscale(0.2)',
    'effect-sepia': 'sepia(0.2)',
    'effect-marvin': 'invert(20%)',
    'effect-phobos': 'blur(0.5px)',
    'effect-heat': 'brightness(0.5)'
  };

  imagePreview.classList.add('effects__preview--none');


  var getPhotoCssEffect = function (evt) {
    imagePreview.style.filter = filterListMap[evt.target.id];
  };


  var addFilterLine = function (evt) {
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
    addFilterLine(evt);
  };


  effectsListForm.addEventListener('change', filterChangeHandler);

})();
