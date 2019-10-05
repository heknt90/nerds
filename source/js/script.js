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
    center: [59.937311, 30.319355],
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark([59.938652, 30.323185], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-marker.png',
    iconImageSize: [231, 190],
    iconImageOffset: [-47, -1]
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

console.log(modals.buttons.close);

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
