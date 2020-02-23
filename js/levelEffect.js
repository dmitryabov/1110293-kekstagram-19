'use strict';

(function () {
  var LINE_WIDTH = 490;
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var effectLevel = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');


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


  var pinLevelMousemoveHandler = function (evt) {
    var mouseupCoordinate = evt.offsetX;
    var effectLevelPosition = (mouseupCoordinate / LINE_WIDTH) * 100;
    effectLevel.style.left = effectLevelPosition + '%';
    effectLevelDepth.style.width = effectLevelPosition + '%';
    effectLevelInput.value = effectLevelPosition;
    changeFilterStyle(effectLevelPosition);

  };


  var pinLevelMouseUpHandler = function () {
    imgUploadEffectLevel.removeEventListener('mousemove', pinLevelMousemoveHandler);
  };


  var pinLevelMouseDownHandler = function () {
    imgUploadEffectLevel.addEventListener('mousemove', pinLevelMousemoveHandler);
    document.addEventListener('mouseup', pinLevelMouseUpHandler);
  };


  effectLevel.addEventListener('mousedown', pinLevelMouseDownHandler);
})();
