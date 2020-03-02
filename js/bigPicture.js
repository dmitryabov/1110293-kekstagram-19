'use strict';

(function () {
  var STEP_COMMENTS = 5;
  var COUNT_COMMENTS = 5;
  var fileUploadd = document.querySelector('.comments-loader');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
  var commentsCount = bigPictureElement.querySelector('.social__comment-count');

  var createComment = function (comments, count) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      commentsCount.textContent = comments.length + ' из ' + count.length + ' комментариев';
      var comment = window.util.makeElement('li', 'social__comment');
      var picture = window.util.makeElement('img', 'social__picture');
      picture.alt = comments[i].name;
      picture.src = comments[i].avatar;
      picture.width = '35';
      picture.height = '35';
      comment.appendChild(picture);
      var textComment = window.util.makeElement('p', 'social__text', comments[i].message);
      comment.appendChild(textComment);
      fragment.appendChild(comment);
    }
    return fragment;
  };

  var copyPicture;
  var comments;
  var loadPictures = function (pictureNumber, pictures) {
    window.bigPicture.renderBigPicture(pictures[pictureNumber]);
    copyPicture = pictures[pictureNumber].comments.slice();
    comments = pictures[pictureNumber].comments.slice();
    var commen = pictures[pictureNumber].comments.slice(0, STEP_COMMENTS);
    var fragment = window.bigPicture.createComment(commen, copyPicture);
    commentsElement.appendChild(fragment);
    document.querySelector('.big-picture').classList.remove('hidden');
  };

  var loadComments = function () {
    window.util.removeElement(commentsElement);
    COUNT_COMMENTS += STEP_COMMENTS;
    var comment = comments.slice(0, COUNT_COMMENTS);
    var fragment = window.bigPicture.createComment(comment, copyPicture);
    commentsElement.appendChild(fragment);
    if (comment.length === copyPicture.length) {
      fileUploadd.classList.add('hidden');
    }
  };

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
    COUNT_COMMENTS = 5;
  };

  var openBigPicture = function (evt) {
    if (evt.target.matches('img[data-id]')) {
      fileUploadd.classList.remove('hidden');
      var pictureNumber = evt.target.getAttribute('data-id');
      window.bigPicture.close();
      loadPictures(pictureNumber, window.callbackFunction.copyPictures);
    }
  };

  window.bigPicture = {
    createComment: createComment,
    renderBigPicture: renderBigPicture,
    open: openBigPicture,
    close: closeBigPicture,
    loadComments: loadComments
  };
})();
