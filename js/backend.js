'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var showsErrorMessage = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      window.errorMessege.get(xhr, onSuccess, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };


  var handlesMethod = function (xhr, method, url, data) {
    if (method.toLowerCase() === 'get') {
      xhr.open(method, url);
      xhr.send();
    } else if (method.toLowerCase() === 'post') {
      xhr.open(method, url);
      xhr.send(data);
    }
  };


  var createRequest = function (onSuccess, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    showsErrorMessage(xhr, onSuccess, onError);

    handlesMethod(xhr, method, url, data);
  };

  window.backend = {
    load: createRequest
  };

})();
