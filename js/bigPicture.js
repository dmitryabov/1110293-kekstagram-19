'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentsCount = bigPictureElement.querySelector('.social__comment-count');


  var renderBigPicture = function (picture) {
    bigPictureElement.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  };

  var closeBigPicture = function () {
    commentsElement.textContent = '';
    bigPictureElement.querySelector('.big-picture__img').children[0].src = '';
    bigPictureElement.querySelector('.big-picture__img').children[0].alt = '';
    bigPictureElement.querySelector('.likes-count').textContent = '';
    bigPictureElement.querySelector('.social__comment-count').textContent = '';
    bigPictureElement.querySelector('.social__caption').textContent = '';
    document.querySelector('.big-picture').classList.add('hidden');
  };

  var makeElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };


  var createComment = function (comments, commentsCoun) {
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < comments.length; i++) {
      commentsCount.textContent = comments.length + ' из ' + commentsCoun.length + ' комментариев';

      var comment = makeElement('li', 'social__comment');
      var picture = makeElement('img', 'social__picture');
      picture.alt = comments[i].name;
      picture.src = comments[i].avatar;
      picture.width = '35';
      picture.height = '35';
      comment.appendChild(picture);

      var textComment = makeElement('p', 'social__text', comments[i].message);
      comment.appendChild(textComment);
      fragment.appendChild(comment);
    }

    return fragment;
  };

  var ddd;
  var loadPictures = function (pictureNumber) {
    var successLoadHandler = function (pictures) {
      renderBigPicture(pictures[pictureNumber]);
      ddd = pictures[pictureNumber].comments.slice();
      var vvv = pictures[pictureNumber].comments.slice(0, 5);
      var fragment = createComment(vvv, ddd);
      commentsElement.appendChild(fragment);
    };

    window.backend.load(successLoadHandler, window.callbackFunction.errorHandler, URL_DATA, 'GET');
    document.querySelector('.big-picture').classList.remove('hidden');
  };


  var openBigPicture = function (evt) {
    if (evt.target.matches('img[data-id]')) {
      var pictureNumber = evt.target.getAttribute('data-id');
      closeBigPicture();
      loadPictures(pictureNumber);
    }
  };

  var commentsLoader = bigPictureElement.querySelector('.social__comments-loader');
  var hhh = 5;
  commentsLoader.addEventListener('click', function () {
    commentsElement.innerHTML = '';
    hhh += 5;
    var eee = ddd.slice(0, hhh);
    var fragment = createComment(eee, ddd);
    commentsElement.appendChild(fragment);
  });

  window.bigPicture = {
    createComment: createComment,
    renderBigPicture: renderBigPicture,
    open: openBigPicture,
    close: closeBigPicture

  };
})();
