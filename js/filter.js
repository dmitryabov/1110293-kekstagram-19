'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '20';
  var MAX_ZOOM_VALUE = 100;
  var LINE_WIDTH = 490;
  var MIN_ZOOM_VALUE = 25;
  var MAX_STEP_VALUE = 25;
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var effectsListForm = document.querySelector('.effects__list');
  var effectLevel = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');
  var imguploadeffectlevel = document.querySelector('.img-upload__effect-level');

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


  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlValues = document.querySelector('.scale__control--value').value = MAX_ZOOM_VALUE + '%';
  var effectLevelLine = parseInt(scaleControlValues, 10);


  var zoomInHandler = function () {
    if (effectLevelLine < MAX_ZOOM_VALUE) {
      effectLevelLine = effectLevelLine + MAX_STEP_VALUE;
      var transformScale = 'scale(' + effectLevelLine / MAX_ZOOM_VALUE + ')';
      imagePreview.style.transform = transformScale;
      scaleControlValue.value = String(effectLevelLine + '%');
    }
  };


  var zoomOutHandler = function () {
    if (effectLevelLine > MIN_ZOOM_VALUE) {
      effectLevelLine = effectLevelLine - MAX_STEP_VALUE;
      var transformScale = 'scale(' + effectLevelLine / MAX_ZOOM_VALUE + ')';
      imagePreview.style.transform = transformScale;
      scaleControlValue.value = String(effectLevelLine + '%');
    }
  };


  scaleControlSmaller.addEventListener('click', zoomOutHandler);
  scaleControlBigger.addEventListener('click', zoomInHandler);
  effectsListForm.addEventListener('change', filterChangeHandler);

  var changeFilterStyle = function (effectLevelPosition) {
    if (document.querySelector('#effect-none:checked')) {
      imagePreview.style = '';
    } else if (document.querySelector('#effect-chrome:checked')) {
      imagePreview.style = 'filter: ' + 'grayscale(' + effectLevelPosition / 100 + ')';
    } else if (document.querySelector('#effect-sepia:checked')) {
      imagePreview.style = 'filter: sepia(' + effectLevelPosition / 100 + ')';
    } else if (document.querySelector('#effect-marvin:checked')) {
      imagePreview.style = 'filter: invert(' + effectLevelPosition + '%)';
    } else if (document.querySelector('#effect-phobos:checked')) {
      imagePreview.style = 'filter: blur(' + 3 * effectLevelPosition / 100 + 'px)';
    } else if (document.querySelector('#effect-heat:checked')) {
      imagePreview.style = 'filter: brightness(' + ((2 * effectLevelPosition / 100) + 1) + ')';
    }
  };


  var pinLevelClickHandler = function (evt) {
    var mouseupCoordinate = evt.offsetX;
    var effectLevelPosition = (mouseupCoordinate / LINE_WIDTH) * 100;
    effectLevelInput.value = effectLevelPosition;
    effectLevel.style.left = effectLevelPosition + '%';
    effectLevelDepth.style.width = effectLevelPosition + '%';
    changeFilterStyle(effectLevelPosition);
  };


  imguploadeffectlevel.addEventListener('mouseup', pinLevelClickHandler);
})();
