// Часы

function update() {
  var clock = document.getElementById('clock');

  var date = new Date();

  var hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  var minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  var seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;

  clock.children[3].innerHTML = getWeekDay(date); 
  clock.children[4].innerHTML = formatDate(date);
}

(function() {
  let timerId;

  function clockStart() {
    timerId = setInterval(update, 1000);
    update();
  }

  function clockStop() {
    clearInterval(timerId);
    timerId = null;
  }
  clockStart();
}());


function getWeekDay(date) {
  var days = ['Воскресенье,', 'Понедельник,', 'Вторник,', 'Среда,', 'Четверг,', 'Пятница,', 'Суббота,'];

  return days[date.getDay()];
}

function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}




// Валидация

function showError(container, errorMessage) {
  container.classList.add('error');
  var msgElem = document.createElement('span');
  msgElem.className = "error-message";
  msgElem.innerHTML = errorMessage;
  container.appendChild(msgElem);
}

function resetError(container) {
  container.classList.remove('error');
  if (container.lastChild.className == "error-message") {
    container.removeChild(container.lastChild);
  }
}

function validate(form) {
  var elems = form.elements;

  resetError(elems.login.parentNode);
  if (!elems.login.value) {
    showError(elems.login.parentNode, 'Укажите ваш email.');
  }

  else if (!(elems.login.value).match(/^[a-zA-Z]/)) {
    showError(elems.login.parentNode, 'Email-адрес должен начинаться с символа латинского алфавита.');
  }

  else if ((elems.login.value).match(/^[а-яА-ЯёЁ]{1,}@/)) {
    showError(elems.login.parentNode, 'Email-адрес не может содержать символы кириллицы.');
  }

  else if (!(elems.login.value).match(/@{1}[a-zа-яё]{1,}\.{1}[a-zа-яё]{2,6}$/)) {
    showError(elems.login.parentNode, 'Поле должно содержать email-адрес в формате name@domain.com.');
  }

  resetError(elems.password.parentNode);
  if (!elems.password.value) {
    showError(elems.password.parentNode, 'Укажите ваш пароль.');
  }

  else if (!(elems.password.value).match(/[^]{6,}/)) {
    showError(elems.password.parentNode, 'Пароль должен состоять минимум из 6 символов.');
  }

  else if (!(elems.password.value).match(/[A-ZА-ЯЁ]{1,}[^]{0,}[a-zа-яё]{1,}|[a-zа-яё]{1,}[^]{0,}[A-ZА-ЯЁ]{1,}/)) {
    showError(elems.password.parentNode, 'Пароль должен содержать символы обоих регистров.');
  }

  else if (!(elems.password.value).match(/[0-9]{1,}/)) {
    showError(elems.password.parentNode, 'Пароль должен содержать числа.');
  }

  else if (!(elems.password.value).match(/[^a-zA-Z0-9а-яА-ЯёЁ]{1,}/)) {
    showError(elems.password.parentNode, 'Пароль должен содержать спецсимволы.');
  }
}

// Не тот браузер

var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "Other";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },

  dataBrowser: [
    { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
    { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
  ]
};


(function () {
  BrowserDetect.init();

  if (BrowserDetect.browser == 'Explorer') {
    document.querySelector('#page').innerHTML = '';
    document.write("Вы пользуетесь не тем браузером!");

  };
}());