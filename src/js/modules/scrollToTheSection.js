const scrollToTheSection = () => {
  const anchors = document.querySelectorAll('a[href*="./#"]');
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute('href').substr(3);
      let elem = document.getElementById(blockID),
      elemY = elem.getBoundingClientRect().top,
      elemH = elem.clientHeight,
      wHeight = document.documentElement.clientHeight,
      height = (wHeight - elemH) / 2;
      window.scrollTo({
        top: elemY + window.pageYOffset - 150,
        left: 0,
        behavior: 'smooth'
      });
    });
  };
}

export default scrollToTheSection;
