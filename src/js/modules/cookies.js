const cookies = () => {
  const wrapper = document.querySelector('.cookies');
  const btn = document.querySelector('.cookies__btn');
  btn.addEventListener('click', () => {
    wrapper.style.display = 'none';
  })
}

export default cookies;
