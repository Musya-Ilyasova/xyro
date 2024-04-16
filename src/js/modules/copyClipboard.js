const copyClipboard = () => {
  const copyMsg = document.createElement('div');
  copyMsg.classList.add('copy-message');
  const linkBlock = document.querySelector('.copyInput__wrapper');
  linkBlock.append(copyMsg);
  document.querySelector('.btn_copy').onclick = function() {
    var text = document.querySelector('.copyInput').dataset.text;
    copyMsg.classList.add('show');
    navigator.clipboard.writeText(text)
    .then(() => {
      copyMsg.textContent = 'Copied!'
    })
    .catch(err => {
      copyMsg.textContent = 'Error'
    });
    setTimeout(()=> {
      copyMsg.classList.remove('show')
    }, 2000)
  }
}
export default copyClipboard;
