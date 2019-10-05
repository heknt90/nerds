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

// var map = document.getElementById('map');
// console.log(map);


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
