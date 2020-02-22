'use strict';

(function () {
  var COMMENTS_NUMBER = 2;
  var bigPictureElement = document.querySelector('.big-picture');


  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  };


  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };


  var createComment = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COMMENTS_NUMBER; i++) {
      var comment = makeElement('li', 'social__comment');
      var picture = makeElement('img', 'social__picture');
      picture.alt = pictures.comments[i].name;
      picture.src = pictures.comments[i].avatar;
      picture.width = '35';
      picture.height = '35';
      comment.appendChild(picture);

      var textComment = makeElement('p', 'social__text', pictures.comments[i].message);
      comment.appendChild(textComment);
      fragment.appendChild(comment);
    }
    return fragment;
  };


  window.bigPicture = {
    createComment: createComment,
    renderBigPicture: renderBigPicture
  };
})();
