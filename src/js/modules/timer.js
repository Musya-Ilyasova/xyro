//Timer
const timer = (selectorTimer) => {
  const deadline = '2023-10-14 23:59';
  function getTimeRemaining(endtime) {
    let hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if(t <= 0) {
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      hours = Math.floor((t / (1000*60*60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if(num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          hours = timer.querySelector('.hour'),
          minutes = timer.querySelector('.min'),
          seconds = timer.querySelector('.sec'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };
  setClock(selectorTimer, deadline);
}

export default timer;
