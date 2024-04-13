import faq from "./modules/faq";
import wow from "./modules/animated";
import scrollToTheSection from "./modules/scrollToTheSection";
import cookies from "./modules/cookies";
import timer from "./modules/timer";
import languageSwitcher from "./modules/languageSwitcher"

document.addEventListener('DOMContentLoaded', () => {
  faq();
  wow.init();
  cookies();
  languageSwitcher();
  if(document.body.classList.contains('index')) {
    scrollToTheSection();
    if(!document.body.classList.contains('winddown')) {
      timer('#mainTimer');
    }
  }
})
