import {WOW} from 'wowjs';

const wow = new WOW(
  {
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       0,
    mobile:       true,
    live:         false,
    callback:     function(box) {
    },
    scrollContainer: null
  }
);

export default wow;
