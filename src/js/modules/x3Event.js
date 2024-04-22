import { showModal, closeModal } from "./modals";
import addConfetti from "./addConfetti";
import timer from "./timer"

const x3Banner = (rewards = 3) => {
  const banner = document.querySelector('.x3-banner'),
        bannerRewards = banner.querySelector('.rewards'),
        modal = document.querySelector('.modal__overlay'),
        modalTitle = modal.querySelector('.modal__title'),
        modalText = modal.querySelector('.modal__text'),
        modalId = modal.querySelector('.modal__ticketId');
  bannerRewards.textContent = rewards;
  banner.addEventListener('click', () => {
    modalTitle.textContent = `${rewards} prizes for referring a friend`;
    modalText.textContent = `Get ${rewards} prizes for every friend you invite instead of just 1. Your friend  needs to meet the newcomer conditions for the prize to be valid. Act fast, this bonus is only available for 24 hours!`;
    modalId.style.display = "none";
    showModal(modal);
    closeModal(modal);
  });
  banner.classList.add('show');
}


export const showX3Modal = (rewards = 3) => {
  const modal = document.querySelector('.x3-modal__overlay');
  const date = Date.parse(new Date()) + 86400000;
  const deadline = date;
  // timer()
  modal.querySelector('.rewards').textContent = rewards;
  showModal(modal);
  addConfetti();
  closeModal(modal);
  x3Banner();
}


