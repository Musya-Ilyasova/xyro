const modalsContent = {
  'welcome': {
    title: 'Welcome prize',
    descrb: 'To claim your prize, simply meet the requirements: follow our social  media accounts. Once completed, you\'ll get 1 prize to draw.',
  },
  'reward': {
    title: 'A prize for a friend',
    descrb: 'Once your friend fulfils the conditions, you both get a prize! More friends - more prizes.',
  },
  'points': {
    title: 'Extra Points',
    descrb: 'You\'ll need them for our upcoming Airdrop, announced on our social media channels. Stay  tuned!',
  },
  'usdt': {
    title: 'USDT',
    descrb: 'Collect USDT rewards and we will send this amount at the end of the referral promo. The total amount of USDT rewards must be higher than 5 USDT.',
  },
  'ps5': {
    title: 'PlayStation 5 Card',
    descrb: 'To claim this reward collect 10 same cards. For example, if you collect three yellow cards, you\'ll receive a PlayStation 5.',
  },
  'nft': {
    title: 'How do I mint my NFT?',
    descrb: 'Beyond owning a digital asset, each Whitelist NFT is your key to exclusive privileges such as early Beta Test access to preview new features and eligibility for the Competitive Airdrop, rewarding your loyalty with perks that increase in value with your NFT\'s rarity.',
  }
}


const addModalContent = (title, content, id) => {
  const modal = document.querySelector('.modal'),
  modalTitle = modal.querySelector('.modal__title'),
  modalText = modal.querySelector('.modal__text'),
  modalId = modal.querySelector('.modal__ticketId'),
  modalBtn = modal.querySelector('.btn_grey');
  if(title.includes('NFT')) {
    modalTitle.textContent = content['nft'].title;
    modalText.textContent = content['nft'].descrb;
    modalBtn.href = "/eng/cabinet#nft";
  } else {
    modalTitle.textContent = content[title].title;
    modalText.textContent = content[title].descrb;
    modalBtn.href = "";
  }
  modalId.textContent = `id ${id}`;
}

const showModal = (modal) => {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

const toggleCloseModal = (modal) => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

const closeModal = (modal) => {
  modal.addEventListener('click', (e) => {
    let target = e.target;
    if(target.classList.contains('modal__close') || target.classList.contains('btn_grey')|| target.classList.contains('modal__overlay')) {
      if(target.classList.contains('btn_grey') && target.getAttribute("href") === "") {
        e.preventDefault();
      }
      toggleCloseModal(modal);
    }
  })
}

const toggleHistoryList = () => {
  const list = document.querySelector('.history-list');
  const modal = document.querySelector('.modal__overlay');
  list.addEventListener('click', (e) => {
    const target = e.target;
    let modalName = "", modalId = "";
    if(target.classList.contains('history-list-item')) {
      if(target.getAttribute('data-modal')) {
        modalName = target.getAttribute('data-modal');
        modalId = target.getAttribute('data-id');
        addModalContent(modalName, modalsContent, modalId);
        showModal(modal);
        closeModal(modal);
      } else {
        target.querySelector('a').click();
      }
    }
  })
}

export default toggleHistoryList;



