const languageSwitcher = () => {
  const currentLang = document.querySelector('html').getAttribute('lang'),
  btn = document.querySelector('.language-switcher__current'),
  location = window.location.href;
  if(currentLang === 'en') {
    btn.href = location.replace("/en", "/es");
  }
  else {
    btn.href = location.replace("/es", "/en");
  }
}

export default languageSwitcher;
