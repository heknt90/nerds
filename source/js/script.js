'use strict';

// >> Slider

var slider = {
  checkboxes: document.querySelectorAll('.promo-slider__checkbox'),
  currentSlide: 0,
  timeWait: 4000
};

if (slider.checkboxes.length > 0) {
  var autoplayPromoSlider = setInterval(function() {
    setSlide(slider.currentSlide + 1);
  }, slider.timeWait);

  for (var i = 0; i < slider.checkboxes.length; i++) {
    slider.checkboxes[i].addEventListener('change', function() {
      clearInterval(autoplayPromoSlider);
    });
  }
}

function setSlide(slideNumber) {
  var nextSlide = Math.abs((slideNumber + slider.checkboxes.length) % slider.checkboxes.length);
  slider.checkboxes[nextSlide].checked = true;
  slider.currentSlide = nextSlide;
}

// Slider <<

// >> Yandex map

if (document.getElementById('map')) {
  ymaps.ready(init);
}

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.939811, 30.319855],
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark([59.938652, 30.323185], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-marker.png',
    iconImageSize: [231, 190],
    iconImageOffset: [-47, -190]
  });

  myMap.geoObjects.add(myPlacemark);
}

// Yandex <<

// >> Modals

var modals = {
  wrapper: document.querySelector('.modal'),
  writeUs: document.querySelector('.write-us'),
  buttons: {
    close: document.querySelectorAll('.button-close')
  }
}

if (modals.buttons.close.length > 0 && modals.writeUs) {
  for (var i = 0; i < modals.buttons.close.length; i++) {
    modals.buttons.close[i].addEventListener('click', function() {
      console.log(1);
      toggleShowWriteUs();
    });
  }
}

function toggleShowWriteUs() {
  modals.wrapper.classList.toggle('modal_hide');
  modals.writeUs.classList.toggle('modal_hide');
}

// Modals <<

// >> Forms Validation

var myForms = {
  writeUs: {
    modal: document.querySelector('.write-us'),
    form: document.querySelector('.write-us__form'),
    username: document.getElementById('write-us__username'),
    email: document.getElementById('write-us__email'),
    message: document.getElementById('write-us__message')
  }
}

// TODO: Можно сделать работу не скаждым элементом в отдельности,
// а в цикле проходя по всем элементам формы через свойство form.elements
// В этом случае желательно проверять, есть ли у поля атрибут required
//
// for (var i = 0; i < myForms.writeUs.form.elements.length; i++) {
//   console.log(myForms.writeUs.form.elements[i]);
// }
//
// Тогда и объект myForms станет лишним. Перебирать можно все формы,
// в которые есть в документе через свойство document.forms
// У полей просто проверять тип и выбирать действие
//
// На странице могут быть и другие формы, вроде формы фильтра
// для которых нужен другой алгоритм валидации
// Определить назначение формы можно через data- атрибуты

validateInput(myForms.writeUs.username);
validateInput(myForms.writeUs.email);
validateInput(myForms.writeUs.message);

if (myForms.writeUs.form) {
    myForms.writeUs.form.elements.buttonWriteUs.addEventListener('click', function(evt) {
    evt.preventDefault();
    validateFormWriteUs();
    if (!checkFormWriteUs()) {
      myForms.writeUs.form.submit();
    }
  });
}

function validateFormWriteUs() {
  if (checkFormWriteUs()) {
    myForms.writeUs.modal.classList.add('site__form_invalid');
    setTimeout(function() {
      myForms.writeUs.modal.classList.remove('site__form_invalid');
    }, 1000);
  }
  else {
    if (myForms.writeUs.modal.classList.contains('site__form_invalid')) {
      myForms.writeUs.modal.classList.remove('site__form_invalid');
    }
  }
}

function checkFormWriteUs() {
  if (myForms.writeUs.username.classList.contains('site__input_invalid') || myForms.writeUs.email.classList.contains('site__input_invalid') || myForms.writeUs.message.classList.contains('site__input_invalid')) {
    return true;
  }
  return false;
}

function enableHightlightInputOnError(inputElement) {
  if (inputElement.type === 'email') {
    if (!validateEmail(inputElement.value)) {
      inputElement.classList.add('site__input_invalid');
    }
  }
  else {
    if (!inputElement.value.trim()) {
      inputElement.classList.add('site__input_invalid');
    }
  }
}

function disableHightlightInputOnError(inputElement) {
  inputElement.classList.remove('site__input_invalid');
}

function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

function validateInput(inputElement) {
  if (inputElement) {
    inputElement.addEventListener('blur', function() {
      enableHightlightInputOnError(inputElement);
    });

    inputElement.addEventListener('keydown', function() {
      disableHightlightInputOnError(inputElement);
    });
  }
}

// Forms Validation <<


// >> Range

var range = {
  range: document.querySelector('.range'),
  selected: document.querySelector('.range__selected'),
  handle: {
    min: document.querySelector('.range__handle_min'),
    max: document.querySelector('.range__handle_max')
  },
  input: {
    min: document.querySelector('.range__input_min'),
    max: document.querySelector('.range__input_max')
  },
  config: {
    minValue: 0,
    maxValue: 20000,
    defaultMin: 0,
    defaultMax: 15000
  }
}

var rangeWidth = range.range.offsetWidth;
var rangeCoords = getCoords(range.range);
var distance = range.config.maxValue - range.config.minValue;

setRangeDefaultValues();

range.handle.min.addEventListener('mousedown', function(evt) {
  var shiftX = evt.pageX - getCoords(range.selected).left;
  var coordsRight = getCoords(range.selected).right - rangeCoords.left;

  document.onmousemove = function(evt) {
    var newLeft = evt.pageX - shiftX - rangeCoords.left;
    setRangeMinValue(convertPixelsToValue(newLeft));
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  }

  range.handle.min.ondragstart = function() {
    return false;
  }
});


range.handle.max.addEventListener('mousedown', function(evt) {
  var shiftX = evt.pageX - getCoords(range.selected).right;
  var coordsLeft = getCoords(range.selected).left - rangeCoords.left;

  document.onmousemove = function(evt) {
    var newLeft = evt.pageX - shiftX - rangeCoords.left;
    setRangeMaxValue(convertPixelsToValue(newLeft));
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  }

  range.handle.max.ondragstart = function() {
    return false;
  }
});

range.input.min.onchange = function() {
  setRangeMinValue(range.input.min.value);
}

range.input.max.onchange = function() {
  setRangeMaxValue(range.input.max.value);
}

function setRangeDefaultValues() {
  setRangeMinValue(range.config.defaultMin);
  setRangeMaxValue(range.config.defaultMax);
}

function setRangeMinValue(value) {
  var newLeft = convertValueToPixels(value);
  if (newLeft > 0) {
    var coordsRight = convertValueToPixels(range.input.max.value);
    // console.log(convertPixelsToValue(coordsRight));
    if (newLeft > coordsRight) {
      newLeft = coordsRight;
    }
    if (value > convertPixelsToValue(coordsRight)) {
      value = convertPixelsToValue(coordsRight)
    }
    range.selected.style.left = newLeft + 'px';
    range.input.min.value = value;
  }
  else {
    range.selected.style.left = '0px';
    range.input.min.value = 0;
  }
}

function setRangeMaxValue(value) {
  var newLeft = convertValueToPixels(value);
  var coordsLeft = convertValueToPixels(range.input.min.value);
  if (newLeft < coordsLeft) {
    newLeft = coordsLeft;
    range.input.max.value = range.input.min.value;
  }
  else if (newLeft > rangeWidth) {
    newLeft = rangeWidth;
    range.input.max.value = range.config.maxValue;
  }
  else {
    range.input.max.value = value;
  }
  range.selected.style.right = rangeWidth - newLeft + 'px';
}

function convertValueToPixels(value) {
  return Math.floor(value * rangeWidth / distance);
}

function convertPixelsToValue(pixels) {
  return Math.floor(pixels * distance / rangeWidth);
}

function getCoords(element) {
  var coords = element.getBoundingClientRect();
  return {
    left: coords.left,
    right: coords.right
  }
}

// Range <<
