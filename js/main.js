'use strict';


var PHOTOS_NUMBER = 25;
var PHOTOS_DESCRIPTIONS = ['пляж', 'гора', 'на море', 'любимый город', 'закат'];
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


var similarListElement = document.querySelector('.pictures');

var similarPictureTemplate = document.querySelector('#picture').
content.querySelector('.picture');


var getRandomInt = function (arr) {
  return Math.floor(Math.random() * arr.length);
};


var generateInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};


var getPictures = function (numberOfPictures) {
  var pictures = [];
  for (var i = 0; i < numberOfPictures; i++) {
    var object = {
      url: 'photos/' + (1 + i) + '.jpg',
      description: PHOTOS_DESCRIPTIONS[getRandomInt(PHOTOS_DESCRIPTIONS)],
      likes: generateInteger(15, 200),
      comments: [
        {
          avatar: 'img/avatar-' + generateInteger(15, 200) + '.svg',
          message: COMMENTS[getRandomInt(COMMENTS)] + ' ' + COMMENTS[getRandomInt(COMMENTS)],
          name: NAMES[getRandomInt(NAMES)]
        },
        {
          avatar: 'img/avatar-' + generateInteger(15, 200) + '.svg',
          message: COMMENTS[getRandomInt(COMMENTS)],
          name: NAMES[getRandomInt(NAMES)]
        }
      ]
    };
    pictures.push(object);
  }
  return pictures;
};


var renderPictures = function (arr) {
  var wizardElement = similarPictureTemplate.cloneNode(true);
  wizardElement.querySelector('.picture__img').src = arr.url;
  wizardElement.querySelector('.picture__likes').textContent = arr.likes;
  wizardElement.querySelector('.picture__comments').textContent = arr.comments.length;
  return wizardElement;
};


var addPicturesToFragment = function (int) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < getPictures(int).length; i++) {
    fragment.appendChild(renderPictures(getPictures(int)[i]));
  }
  return fragment;
};


similarListElement.appendChild(addPicturesToFragment(PHOTOS_NUMBER));

