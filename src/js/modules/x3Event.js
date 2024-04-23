import { showModal, closeModal } from "./modals";
import addConfetti from "./addConfetti";
import timer from "./timer"

const x3Banner = (rewards, deadline) => {
  const banner = document.querySelector('.x3-banner'),
        bannerRewards = banner.querySelector('.rewards'),
        modal = document.querySelector('.modal__overlay'),
        modalTitle = modal.querySelector('.modal__title'),
        modalText = modal.querySelector('.modal__text'),
        modalId = modal.querySelector('.modal__ticketId');
  bannerRewards.textContent = rewards;
  timer("#bannerTimer", deadline);
  banner.addEventListener('click', () => {
    modalTitle.textContent = `${rewards} prizes for referring a friend`;
    modalText.textContent = `Get ${rewards} prizes for every friend you invite instead of just 1. Your friend  needs to meet the newcomer conditions for the prize to be valid. Act fast, this bonus is only available for 24 hours!`;
    modalId.style.display = "none";
    showModal(modal);
    closeModal(modal);
  });
  banner.classList.add('show');
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


export const showX3Banner = (data) => {
  const invData = data.filter(item => item.id === "inv_x");
  if(invData.length > 0) {
    const date = invData[0].end * 1000;
    const d = new Date();
    if(Date.parse(d) < date) {
      x3Banner(invData[0].invite_multiplier_value, new Date(date))
    }
  }
}

