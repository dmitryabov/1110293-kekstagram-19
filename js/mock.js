'use strict';

(function () {
  var PHOTOS_DESCRIPTIONS = ['пляж', 'гора', 'на море', 'не любимый город'];
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'любимый город',
    'закат',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Катя', 'Даша', 'Маша', 'Ваня', 'Игорь'];


  var generateComments = function (numberOfComments) {
    var comments = [];
    for (var i = 0; i < numberOfComments; i++) {
      var photoComments = {
        avatar: 'img/avatar-' + window.util.generateInteger(1, 6) + '.svg',
        message: window.util.getRandomElement(COMMENTS) + ' ' + window.util.getRandomElement(COMMENTS),
        name: window.util.getRandomElement(NAMES)
      };
      comments.push(photoComments);
    }
    return comments;
  };


  var generatePictures = function (numberOfPictures) {
    var pictures = [];
    for (var i = 0; i < numberOfPictures; i++) {
      var photoContent = {
        url: 'photos/' + (1 + i) + '.jpg',
        description: window.util.getRandomElement(PHOTOS_DESCRIPTIONS),
        likes: window.util.generateInteger(15, 200),
        comments: generateComments(6)
      };
      pictures.push(photoContent);
    }
    return pictures;
  };


  window.mock = {
    generatePictures: generatePictures
  };
})();
