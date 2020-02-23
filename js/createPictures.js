'use strict';

(function () {
  var similarPictureTemplate = document.querySelector('#picture').
  content.querySelector('.picture');


  var createPicture = function (picture, count) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.id = count + '';
    pictureElement.querySelector('.picture__img').setAttribute('tabindex', count + '');
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };


  var creatureFragmentWithPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i < pictures.length; i++) {
      fragment.appendChild(createPicture(pictures[i], i));
    }
    return fragment;
  };


  window.createPictures = {
    fragmentWithPictures: creatureFragmentWithPictures
  };
})();
