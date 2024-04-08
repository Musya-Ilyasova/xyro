import faq from "./modules/faq";
import wow from "./modules/animated";
import scrollToTheSection from "./modules/scrollToTheSection"

document.addEventListener('DOMContentLoaded', () => {
  faq();
  wow.init();
  scrollToTheSection();
})
