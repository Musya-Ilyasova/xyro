import timer from './timer';

const idxBanner = (data, deadline) => {
  const banner = document.querySelector('.idx-banner')
  const rewards = banner.querySelector('.rewards');
  rewards.textContent = data.referral_multiplier_value;
  timer('#idxBanner', new Date(deadline));
  banner.style.display = 'block';
}

export default idxBanner;
