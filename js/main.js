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


var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


var generateInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};


var generatePictures = function (numberOfPictures) {
  var pictures = [];
  for (var i = 0; i < numberOfPictures; i++) {
    var photoContent = {
      url: 'photos/' + (1 + i) + '.jpg',
      description: getRandomElement(PHOTOS_DESCRIPTIONS),
      likes: generateInteger(15, 200),
      comments: [
        {
          avatar: 'img/avatar-' + generateInteger(1, 6) + '.svg',
          message: getRandomElement(COMMENTS) + ' ' + getRandomElement(COMMENTS),
          name: getRandomElement(NAMES)
        },
        {
          avatar: 'img/avatar-' + generateInteger(15, 200) + '.svg',
          message: getRandomElement(COMMENTS),
          name: getRandomElement(NAMES)
        }
      ]
    };
    pictures.push(photoContent);
  }
  return pictures;
};


var createPictures = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};


var pictures = generatePictures(PHOTOS_NUMBER);

var creatureFragmentWithPictures = function (arrayOfPictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayOfPictures.length; i++) {
    fragment.appendChild(createPictures(arrayOfPictures[i]));
  }
  return fragment;
};


similarListElement.appendChild(creatureFragmentWithPictures(pictures));


var bigPictureElement = document.querySelector('.big-picture');
bigPictureElement.classList.remove('hidden');

var qwer = generatePictures(25);

var socialCommentsElement = bigPictureElement.querySelector('.social__comments');

bigPictureElement.querySelector('.big-picture__img').children[0].src = qwer[0].url;
bigPictureElement.querySelector('.likes-count').textContent = qwer[1].likes;
bigPictureElement.querySelector('.comments-count').textContent = qwer[1].comments.length;
socialCommentsElement.children[0].querySelector('.social__picture').src = qwer[1].comments[0].avatar;
socialCommentsElement.children[0].querySelector('.social__picture').textContent = qwer[1].comments[0].name;
socialCommentsElement.children[0].querySelector('.social__text').textContent = qwer[1].comments[0].message;

