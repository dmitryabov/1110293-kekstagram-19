'use strict';


var PHOTOS_NUMBER = 25;
var COMMENTS_NUMBER = 2;
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


var generateComments = function (numberOfComments) {
  var comments = [];
  for (var i = 0; i < numberOfComments; i++) {
    var photoComments = {
      avatar: 'img/avatar-' + generateInteger(1, 6) + '.svg',
      message: getRandomElement(COMMENTS) + ' ' + getRandomElement(COMMENTS),
      name: getRandomElement(NAMES)
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
      description: getRandomElement(PHOTOS_DESCRIPTIONS),
      likes: generateInteger(15, 200),
      comments: generateComments(6)
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


var renderBigPicture = function (picture) {
  bigPictureElement.querySelector('.big-picture__img').children[0].src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};


var removeElement = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
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


var pictures = generatePictures(PHOTOS_NUMBER);

removeElement(commentsElement);

similarListElement.appendChild(creatureFragmentWithPictures(pictures));

commentsElement.appendChild(createComment(pictures[0]));

renderBigPicture(pictures[0]);


var bodyElement = document.querySelector('body');
var fileUpload = document.querySelector('#upload-file');
var imageEditForm = document.querySelector('.img-upload__overlay');
var buttonForCloseForm = document.querySelector('#upload-cancel');
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';


var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && textHashtags !== document.activeElement) {
    closePopup();
  }
};


var onEnterPress = function (evt, action) {
  if (evt.key === ENTER_KEY) {
    action();
  }
};


var openPopup = function () {
  imageEditForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  bodyElement.classList.add('modal-open');
  scaleControlValue.value = '100%';
};


var closePopup = function () {
  imageEditForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  bodyElement.classList.remove('modal-open');
  textHashtags.value = '';
  imagePreview.className = 'effects__preview--none';
  imagePreview.style['transform'] = 'scale(1)';
};


fileUpload.addEventListener('change', function () {
  openPopup();
});


fileUpload.addEventListener('keydown', function (evt) {
  onEnterPress(evt, openPopup);
});


buttonForCloseForm.addEventListener('click', function () {
  closePopup();
});


fileUpload.addEventListener('keydown', function (evt) {
  onEnterPress(evt, closePopup);
});


var imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
var effectsListForm = document.querySelector('.effects__list');
imagePreview.classList.add('effects__preview--none');
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
imgUploadEffectLevel.classList.add('hidden');


var DEFAULT_EFFECT_LEVEL = '20';
var MAX_ZOOM_VALUE = 100;
var MIN_ZOOM_VALUE = 25;
var MAX_STEP_VALUE = 25;
var FILTRES_VALUE = [
  {
    effect: 'none',
    filter: ''
  },
  {
    effect: 'chrome',
    filter: 'grayscale(0.2)'
  },
  {
    effect: 'sepia',
    filter: 'sepia(0.2)'
  },
  {
    effect: 'marvin',
    filter: 'invert(20%)'
  },
  {
    effect: 'phobos',
    filter: 'blur(0.5px)'
  },
  {
    effect: 'heat',
    filter: 'brightness(0.5)'
  }

];


var addDefaultFilterEffect = function (none, filter) {
  imagePreview.className = 'effects__preview--' + none;
  effectLevelInput.value = DEFAULT_EFFECT_LEVEL;
  effectLevel.style.left = DEFAULT_EFFECT_LEVEL + '%';
  effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
  imagePreview.style = 'filter: ' + filter;
  imgUploadEffectLevel.classList.remove('hidden');
};


var filterChangeHandler = function (evt) {
  if (evt.target.matches('#effect-none')) {
    imagePreview.className = 'effects__preview--' + FILTRES_VALUE[0].effect;
    imagePreview.style = '';
    imgUploadEffectLevel.classList.add('hidden');
  } else if (evt.target.matches('#effect-chrome')) {
    addDefaultFilterEffect(FILTRES_VALUE[1].effect, FILTRES_VALUE[1].filter);
  } else if (evt.target.matches('#effect-sepia')) {
    addDefaultFilterEffect(FILTRES_VALUE[2].effect, FILTRES_VALUE[2].filter);
  } else if (evt.target.matches('#effect-marvin')) {
    addDefaultFilterEffect(FILTRES_VALUE[3].effect, FILTRES_VALUE[3].filter);
  } else if (evt.target.matches('#effect-phobos')) {
    addDefaultFilterEffect(FILTRES_VALUE[4].effect, FILTRES_VALUE[4].filter);
  } else if (evt.target.matches('#effect-heat')) {
    addDefaultFilterEffect(FILTRES_VALUE[5].effect, FILTRES_VALUE[5].filter);
  }
};


var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var scaleControlValues = document.querySelector('.scale__control--value').value = MAX_ZOOM_VALUE + '%';
var effectLevelLine = parseInt(scaleControlValues, 10);


var zoomInHandler = function () {
  if (effectLevelLine < MAX_ZOOM_VALUE) {
    effectLevelLine = effectLevelLine + MAX_STEP_VALUE;
    var transformScale = 'scale(' + effectLevelLine / MAX_ZOOM_VALUE + ')';
    imagePreview.style['transform'] = transformScale;
    scaleControlValue.value = String(effectLevelLine + '%');
  }
};


var zoomOutHandler = function () {
  if (effectLevelLine > MIN_ZOOM_VALUE) {
    effectLevelLine = effectLevelLine - MAX_STEP_VALUE;
    var transformScale = 'scale(' + effectLevelLine / MAX_ZOOM_VALUE + ')';
    imagePreview.style['transform'] = transformScale;
    scaleControlValue.value = String(effectLevelLine + '%');
  }
};


scaleControlSmaller.addEventListener('click', zoomOutHandler);
scaleControlBigger.addEventListener('click', zoomInHandler);

var textHashtags = document.querySelector('.text__hashtags');
var submitButton = document.querySelector('#upload-submit');


var addValidationHashtags = function (hashtag) {
  if (hashtag[0] !== '#') {
    textHashtags.setCustomValidity('Хэш-тег должен начинатся с символа # (решётка)');
    return false;
  } else if (hashtag.length === 1) {
    textHashtags.setCustomValidity('Хэштег должен содержать значение кроме решетки');
    return false;
  } else if (hashtag.length > 20) {
    textHashtags.setCustomValidity('Хэштег может быть длиной не более 20 символов');
    return false;
  } else if (hashtag.indexOf('#', 1) > 0) {
    textHashtags.setCustomValidity('Хэштег должен разделяться пробелом');
    return false;
  } else if (hashtag.match(/[^#a-zA-Z0-9а-яА-Я]/g)) {
    textHashtags.setCustomValidity('Строка после решётки не может содержать пробелы, спецсимволы (#, @, $ и т.п.), ');
    return false;
  }
  return true;
};


var onformSubmit = function () {
  var hashtagArray = textHashtags.value.toLowerCase().split(' ');
  for (var i = 0; i < hashtagArray.length; i++) {
    var isHashtagValid = addValidationHashtags(hashtagArray[i]);
    if (!isHashtagValid) {
      break;
    }
    if (hashtagArray.indexOf(hashtagArray[i], i + 1) > 0) {
      textHashtags.setCustomValidity('Хэштеги не должны повторяться');
      break;
    }
  }
  if (hashtagArray.length > 5) {
    textHashtags.setCustomValidity('Хэштегов может быть максимум 5');
  }

  if (!textHashtags.validationMessage) {
    textHashtags.setCustomValidity('');
  }
};


submitButton.addEventListener('click', onformSubmit);


var clearCustomValidity = function () {
  textHashtags.setCustomValidity('');
};

textHashtags.addEventListener('input', clearCustomValidity);


var effectLine = document.querySelector('.effect-level__line');
var effectLevel = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelInput = document.querySelector('.effect-level__value');
var imguploadeffectlevel = document.querySelector('.img-upload__effect-level');


var changeFilterStyle = function (effectLevelPosition) {
  if (document.querySelector('#effect-none:checked')) {
    imagePreview.style = '';
  } else if (document.querySelector('#effect-chrome:checked')) {
    imagePreview.style = 'filter: ' + 'grayscale(' + effectLevelPosition / 100 + ')';
  } else if (document.querySelector('#effect-sepia:checked')) {
    imagePreview.style = 'filter: sepia(' + effectLevelPosition / 100 + ')';
  } else if (document.querySelector('#effect-marvin:checked')) {
    imagePreview.style = 'filter: invert(' + effectLevelPosition + '%)';
  } else if (document.querySelector('#effect-phobos:checked')) {
    imagePreview.style = 'filter: blur(' + 3 * effectLevelPosition / 100 + 'px)';
  } else if (document.querySelector('#effect-heat:checked')) {
    imagePreview.style = 'filter: brightness(' + ((2 * effectLevelPosition / 100) + 1) + ')';
  }
};


var pinLevelClickHandler = function (evt) {
  var mouseupCoordinate = evt.offsetX;
  var lineWidth = effectLine.offsetWidth;
  var effectLevelPosition = (mouseupCoordinate / lineWidth) * 100;
  effectLevelInput.value = effectLevelPosition;
  effectLevel.style.left = effectLevelPosition + '%';
  effectLevelDepth.style.width = effectLevelPosition + '%';
  changeFilterStyle(effectLevelPosition);
};


imguploadeffectlevel.addEventListener('mouseup', pinLevelClickHandler);


effectsListForm.addEventListener('change', filterChangeHandler);
