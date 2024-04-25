//Timer
const timer = (selectorTimer, deadline) => {
  function getTimeRemaining(endtime) {
    let days, hours, hoursFull, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if(t <= 0) {
      days = 0;
      hours = 0;
      hoursFull = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor((t / (1000*60*60*24)));
      hours = Math.floor((t / (1000*60*60)) % 24);
      hoursFull = Math.floor(t / (1000*60*60));
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      'total': t,
      'days' : days,
      'hours': hours,
      'hoursFull': hoursFull,
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
          days = timer.querySelector('.days .count'),
          hours = timer.querySelector('.hours .count'),
          minutes = timer.querySelector('.min .count'),
          seconds = timer.querySelector('.sec .count'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);

      if(selector === "#mainTimer") {
        days.textContent = `${getZero(t.days)}d`;
        hours.textContent = `${getZero(t.hours)}h`;
        minutes.textContent = `${getZero(t.minutes)}m`;
      } else {
        hours.textContent = getZero(t.hoursFull);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);
      }

      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };
  setClock(selectorTimer, deadline);
}

export default timer;
