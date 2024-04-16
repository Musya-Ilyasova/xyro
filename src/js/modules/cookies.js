const cookies = () => {
  const wrapper = document.querySelector('.cookies');
  if(localStorage.getItem('modalCookies')) {
    wrapper.style.display = 'none';
  }
  const btn = document.querySelector('.cookies__btn');
  btn.addEventListener('click', () => {
    localStorage.setItem('modalCookies', 'true');
    wrapper.style.display = 'none';
  })
}

export default cookies;
