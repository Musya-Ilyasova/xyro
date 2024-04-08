const faq = () => {
   const faqList = document.querySelector('.faq');
   faqList.addEventListener('click', (e) => {
    let target = e.target;
    if(target.classList.contains('faq-item__title') || target.closest('.faq-item__title')) {
      let itemfaq = target.closest('.faq-item');
      if(itemfaq.classList.contains('open')) {
        itemfaq.classList.remove('open');
      } else {
        itemfaq.classList.add('open');
      }
    }
   })
}
export default faq;
