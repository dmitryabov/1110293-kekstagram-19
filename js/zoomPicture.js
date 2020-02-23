'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
  var MAX_ZOOM_VALUE = 100;
  var MIN_ZOOM_VALUE = 25;
  var MAX_STEP_VALUE = 25;
  var scaleControlValues = document.querySelector('.scale__control--value').value = MAX_ZOOM_VALUE + '%';
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var effectLevelLine = parseInt(scaleControlValues, 10);


  var zoomInHandler = function () {
    if (effectLevelLine < MAX_ZOOM_VALUE) {
      effectLevelLine = effectLevelLine + MAX_STEP_VALUE;
      var transformScale = 'scale(' + effectLevelLine / MAX_ZOOM_VALUE + ')';
      imagePreview.style['transform'] = transformScale;
      scaleControlValue.value = String(effectLevelLine + '%');
    }
  };


  var zoomOutHandler = function () {
    if (effectLevelLine > MIN_ZOOM_VALUE) {
      effectLevelLine = effectLevelLine - MAX_STEP_VALUE;
      var transformScale = 'scale(' + effectLevelLine / MAX_ZOOM_VALUE + ')';
      imagePreview.style['transform'] = transformScale;
      scaleControlValue.value = String(effectLevelLine + '%');
    }
  };


  scaleControlSmaller.addEventListener('click', zoomOutHandler);
  scaleControlBigger.addEventListener('click', zoomInHandler);
})();
