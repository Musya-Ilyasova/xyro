import checkRewardsShards from "./checkRewardsShards"

const descrbTickets = {
  nft: 'We\'ll send you a guide on minting NFTs via DM on Discord',
  usdt: 'We\'ll contact you on Discord for prize distribution',
  points: 'We\'ll contact you on Discord for prize distribution'
}

export const makeTgUrl = (isSlider = false) => {
  const urlTg = 'https://t.me/share/url?';
  const urlVideo = 'https://invite.xyro.io/WPIZ/video/ps5.mp4';
  const ref = localStorage.getItem('ref_code');
  const text1 = `Hey%21%20I%27m%20one%20of%20the%20winners%20of%20a%20Sony%20PlayStation%205%20in%20XYRO%20Referral%20Program%21%20Register%20with%20my%20lucky-link:%20invite.xyro.io%3Fr%3D${ref}%20`;
  const text2 = `Hey%21%20I%27m%20one%20of%20the%20winners%20of%20a%20Sony%20PlayStation%205%20in%20XYRO%20Referral%20Program%21%20Register%20with%20my%20lucky-link%20next%2024h%20and%20get%203%20Welcome%20Rewards%20instead%20of%201%21%20https%3A%2F%2Finvite.xyro.io%3Fr%3D${ref}%20`;
  if(isSlider) {
    return `${urlTg}url=${urlVideo}&text=${text1}`;
  } else {
    return `${urlTg}url=${urlVideo}&text=${text2}`;
  }
}

const getTicketData = (itemData) => {
  const id = itemData.item_id;
  const name = itemData.name;
  const img = document.querySelector('.ticket-img__current');
  const list = document.querySelector('.playstation-list__wrapper');
  const text = document.querySelector('.ticket__text');
  const congrats = document.querySelector('.ticket__congrats');
  const title = document.querySelector('.ticket__title');
  const btn = document.querySelector('.ticket__btn');
  const btnContinue = document.querySelector('.btn_continue');
  const namePerson = document.querySelector('.ticket .name');
  const btnUrl = btn.href;

  if(itemData.shard_number) {
    checkRewardsShards(list, itemData.shard_number);
    text.style.display='none';
    list.style.display = 'flex';
  }
  img.setAttribute('alt', name);
  title.textContent = name;
  if(id === 'ps5') {
    img.setAttribute('src', '../img/tickets/ps5.png');
    if(itemData.shard_number >= 10) {
      btn.setAttribute('href', `${makeTgUrl()}`);
      btn.setAttribute('target', '_blank')
      btn.innerHTML = '<img class="icon-telegram" src="../img/telegram.svg"> Share the Winning Video';
      btn.classList.remove('btn_grey');
      btn.classList.add('btn');
      btn.classList.add('btn_share');
      congrats.style.display = 'block';
      namePerson.textContent = localStorage.getItem('grokth_name');
      btnContinue.style.display = "block";
    }
  } else if(id === 'legendaryNFT') {
    img.setAttribute('src', '../img/tickets/nftLegend.png');
    text.textContent = descrbTickets.nft;
    btn.textContent = "How to mint?";
    btn.setAttribute('href', `${btnUrl}#nft`);
  } else if(id === 'epicNFT') {
    img.setAttribute('src', '../img/tickets/nftEpic.png');
    text.textContent = descrbTickets.nft;
    btn.textContent = "How to mint?";
    btn.setAttribute('href', `${btnUrl}#nft`);
  } else if(id === 'rareNFT') {
    img.setAttribute('src', '../img/tickets/nftRare.png');
    text.textContent = descrbTickets.nft;
    btn.textContent = "How to mint?";
    btn.setAttribute('href', `${btnUrl}#nft`);
  } else if(id === 'commonNFT') {
    img.setAttribute('src', '../img/tickets/nftCommon.png');
    text.textContent = descrbTickets.nft;
    btn.textContent = "How to mint?";
    btn.setAttribute('href', `${btnUrl}#nft`);
  } else if(id === 'points') {
    img.setAttribute('src', '../img/tickets/extra.png');
    text.textContent = descrbTickets.points;
    title.textContent = `${itemData.amount} Extra Points`
  } else if(id.includes('usdt')) {
    img.setAttribute('src', '../img/tickets/usdt.png');
    text.textContent = descrbTickets.usdt;
    title.textContent = `${+itemData.amount / 100} USDT`
  }
}

export default getTicketData;
