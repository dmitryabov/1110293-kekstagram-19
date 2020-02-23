'use strict';

(function () {
  var PHOTOS_NUMBER = 25;
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var similarListElement = document.querySelector('.pictures');


  var pictures = window.mock.generatePictures(PHOTOS_NUMBER);

  window.util.removeElement(commentsElement);

  similarListElement.appendChild(window.createPictures.fragmentWithPictures(pictures));


  window.pictures = {
    add: pictures
  };

})();
