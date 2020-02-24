'use strict';

(function () {

  var createRequest = function (onSuccess, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    window.errorMessege.get(xhr, onSuccess, onError);

    if (method.toLowerCase() === 'get') {
      xhr.open(method, url);
      xhr.send();
    } else if (method.toLowerCase() === 'post') {
      xhr.open(method, url);
      xhr.send(data);
    }
  };

  window.backend = {
    load: createRequest
  };

})();
