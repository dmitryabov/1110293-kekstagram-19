'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').
  content.querySelector('.picture');

  var createPicture = function (picture, count) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').dataset.id = count + '';
    pictureElement.querySelector('.picture__img').dataset.tabindex = count + '';
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var renderPictures = function (pictures, count) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      fragment.appendChild(createPicture(pictures[i], i));
    }
    similarListElement.appendChild(fragment);
  };

  var removePictures = function () {
    document.querySelectorAll('.picture').forEach(function (it) {
      it.remove();
    });
  };

  window.pictures = {
    render: renderPictures,
    remove: removePictures
  };

})();
