'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');


  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;


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


  var createComment = function (pictures, f, g) {
    var fragment = document.createDocumentFragment();
    var commentsCount = pictures.comments.slice(f, g);
    for (var i = 0; i < commentsCount.length; i++) {
      bigPictureElement.querySelector('.social__comment-count').textContent = commentsCount.length + ' из ' + pictures.comments.length + ' комментариев';

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


  var URL_DATA = 'https://js.dump.academy/kekstagram/data';

  var openBigPicture = function (evt) {
    if (evt.target.matches('img[data-id]')) {
      var pictureNumber = evt.target.getAttribute('data-id');
      var successLoadHandler = function (pictures) {
        renderBigPicture(pictures[pictureNumber]);
        var fragment = createComment(pictures[pictureNumber], 0, 5);
        commentsElement.appendChild(fragment);
      };
      window.backend.load(successLoadHandler, window.callbackFunction.errorHandler, URL_DATA, 'GET');
      document.querySelector('.big-picture').classList.remove('hidden');

    }
  };


  window.bigPicture = {
    createComment: createComment,
    renderBigPicture: renderBigPicture,
    successLoadHandler: openBigPicture

  };
})();
