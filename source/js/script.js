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
