// import { modalData } from "./clickHalfSliderItem";

const getTicketData = (id, name) => {
  const img = document.querySelector(".ticket-img__prize");
  const bannerText = document.querySelector('.bannerhowget .bannerhowget__text');
  img.setAttribute('width', '179');
  img.setAttribute('height', '179');
  img.setAttribute('alt', name);
  // if(id === 'wl') {
  //   img.setAttribute('srcset', './img/characters-ticket2x.webp 2x');
  //   img.setAttribute('src', './img/characters-ticket.webp');
  //   bannerText.textContent = modalData['wl'];
  // } else if(id === 'wl_alpha') {
  //   img.setAttribute('srcset', './img/alpha-ticket2x.webp 2x');
  //   img.setAttribute('src', './img/alpha-ticket.webp');
  //   bannerText.textContent = modalData['wl_alpha'];
  // } else if(id.includes('sf_promo')) {
  //   img.setAttribute('srcset', './img/shadow-fight-ticket2x.webp 2x');
  //   img.setAttribute('src', './img/shadow-fight-ticket.webp');
  //   bannerText.textContent = modalData['sf_promo'];
  // } else if(id.includes('usd')) {
  //   img.setAttribute('srcset', './img/upto50-ticket2x.webp 2x');
  //   img.setAttribute('src', './img/upto50-ticket.webp');
  //   bannerText.textContent = modalData['usd'];
  // } else if(id.includes('netflix')) {
  //   img.setAttribute('srcset', './img/netflix2x.webp 2x');
  //   img.setAttribute('src', './img/netflix.webp');
  //   bannerText.textContent = modalData['netflix'];
  // }
}

export default getTicketData;
