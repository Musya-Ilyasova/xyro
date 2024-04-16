const modalsContent = {
  'Welcome prize': 'To get the prize, fulfil the conditions: subscribe to the project\'s social networks. As soon as the conditions are fulfilled, we will credit you with 1 gift',
  'A prize for a friend': 'Once your friend fulfils the conditions, you both get a prize! More friends - more prizes.',
  'Extra Points': 'We\'ve secured ExtraPoints for your wallet. You will need them in our Airdrop, which we will announce on our socials. Stay tuned!',
  'USDT': 'We will contact you in Discord to clarify the wallet to send the prize to. If this does not happen, write to support at the contacts at the bottom of the site.',
  'PlayStation 5 Card': 'Соберите 3 карточки одного цвета, чтобы получить приз. Например, собрав 3 карточки желтого цвета, вы получите PlayStation 5'
}


const addModalContent = (title, descrb) => {
  const modal = document.querySelector('.modal'),
  modalTitle = modal.querySelector('.modal__title'),
  modalText = modal.querySelector('.modal__text');
  modalTitle.textContent = title;
  modalText.textContent = descrb;
}
const toggleHistoryList = () => {
  const list = document.querySelector('.history-list');
  list.addEventListener('click', (e) => {
    const target = e.target;
    let modalTitle = "";
    if(target.classList.contains('history-list-item')) {
      if(target.getAttribute('data-modal')) {
        modalTitle = target.getAttribute('data-modal');
        addModalContent(modalTitle, modalsContent[modalTitle]);
      } else {
        target.querySelector('a').click();
      }
    }
  })
}

export default toggleHistoryList;



