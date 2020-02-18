'use strict';

(function () {
  var PHOTOS_NUMBER = 25;
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var similarListElement = document.querySelector('.pictures');


  var pictures = window.mock.generatePictures(PHOTOS_NUMBER);

  window.util.removeElement(commentsElement);

  similarListElement.appendChild(window.pictures.creatureFragmentWithPictures(pictures));

  commentsElement.appendChild(window.bigPicture.createComment(pictures[0]));

  window.bigPicture.renderBigPicture(pictures[0]);
  // document.querySelector('.big-picture').classList.remove('hidden');

})();
