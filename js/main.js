'use strict';


var PHOTOS_NUMBER = 25;
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
var bigPictureElement = document.querySelector('.big-picture');
var similarListElement = document.querySelector('.pictures');
var commentsElement = bigPictureElement.querySelector('.social__comments');


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
          avatar: 'img/avatar-' + generateInteger(1, 6) + '.svg',
          message: getRandomElement(COMMENTS),
          name: getRandomElement(NAMES)
        }
      ]
    };
    pictures.push(photoContent);
  }
  return pictures;
};


var createPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};


var creatureFragmentWithPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
  return fragment;
};


bigPictureElement.classList.remove('hidden');


var renderBigPicture = function (pictures) {
  bigPictureElement.querySelector('.big-picture__img').children[0].src = pictures.url;
  bigPictureElement.querySelector('.likes-count').textContent = pictures.likes;
  bigPictureElement.querySelector('.comments-count').textContent = pictures.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = pictures.description;
};


while (commentsElement.firstChild) {
  commentsElement.removeChild(commentsElement.firstChild);
}


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
  for (var i = 0; i < 2; i++) {
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


var pictures = generatePictures(PHOTOS_NUMBER);

similarListElement.appendChild(creatureFragmentWithPictures(pictures));

commentsElement.appendChild(createComment(pictures[0]));

renderBigPicture(pictures[0]);


document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
document.querySelector('body').classList.add('modal-open');
