import { showModal, closeModal } from "./modals";
import addConfetti from "./addConfetti";
import timer from "./timer";

const addModalContent = (type, rewards) => {
  const modal = document.querySelector('.modal__overlay'),
  modalTitle = modal.querySelector('.modal__title'),
  modalText = modal.querySelector('.modal__text'),
  modalId = modal.querySelector('.modal__ticketId');
  modalId.style.display = "none";
  if(type === "Inv") {
    modalTitle.textContent = `${rewards} prizes for referring a friend`;
    modalText.textContent = `Get ${rewards} prizes for every friend you invite instead of just 1. Your friend  needs to meet the newcomer conditions for the prize to be valid.`;
  } else if(type === "Ref") {
    modalTitle.textContent = `${rewards} prizes for your friends`;
    modalText.textContent = `Friends you invite will get ${rewards} prizes, not 1. Do more good deeds - invite more friends! `;
  };
  showModal(modal);
  closeModal(modal);
}

const x3Banner = (rewards, deadline, type, selectorBanner, selectorTimer) => {
  const banner = document.querySelector(selectorBanner),
        bannerRewards = banner.querySelector('.rewards');
  bannerRewards.textContent = rewards;
  timer(selectorTimer, deadline);
  banner.addEventListener('click', () => {
    addModalContent(type, rewards);
  });
  banner.classList.add('show');
}


export const showX3Banner = (data) => {
  const invData = data.filter(item => item.type === 'invite_multiplier');
  const refData = data.filter(item => item.type === 'referral_multiplier');
  if(invData.length > 0) {
    const date = invData[0].end * 1000;
    const d = new Date();
    if(Date.parse(d) < date) {
      x3Banner(invData[0].invite_multiplier_value, new Date(date), "Inv", "#x3BannerInv", "#bannerInvTimer")
    }
  }
  if(refData.length > 0) {
    const date = refData[0].end * 1000;
    const d = new Date();
    if(Date.parse(d) < date) {
      x3Banner(refData[0].referral_multiplier_value, new Date(date), "Ref", "#x3BannerRef", "#bannerRefTimer")
    }
  }
}



// export const showX3Modal = (rewards = 3) => {
//   const modal = document.querySelector('.x3-modal__overlay');
//   const date = Date.parse(new Date()) + 86400000;
//   const deadline = new Date(date);
//   timer("#modalTimer", deadline);
//   modal.querySelector('.rewards').textContent = rewards;
//   showModal(modal);
//   addConfetti();
//   closeModal(modal);
//   modal.addEventListener('click', () => {
//     // if()
//   })
//   x3Banner(rewards, deadline);
// }
