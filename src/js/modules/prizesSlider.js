import KeenSlider from 'keen-slider';

const addSlider = () => {
  const arrowLeft = document.querySelector(".gifts .slider__left");
  const arrowRight = document.querySelector(".gifts .slider__right");
  var slider = new KeenSlider (
    '#slider',
    {
      loop: false,
      mode: "free-snap",
      slides: {
        perView: "auto",
        spacing: 12
      },
      range: {
        max: 4,
        align: false
      }
    }
  )
  slider.on("optionsChanged", () => {
    updateClasses()
  })
  slider.on("slideChanged", () => {
    updateClasses()
  })

  function updateClasses() {
    var slide = slider.track.details.rel;
    slide === 0
      ? arrowLeft.classList.add("slider__arrow_disabled")
      : arrowLeft.classList.remove("slider__arrow_disabled")
    slide > 3
      ? arrowRight.classList.add("slider__arrow_disabled")
      : arrowRight.classList.remove("slider__arrow_disabled")
  }
  arrowLeft.addEventListener("click", () => slider.prev());
  arrowRight.addEventListener("click", () => slider.next());
}


export default addSlider;
