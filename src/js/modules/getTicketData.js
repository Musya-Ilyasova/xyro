import checkRewardsShards from "./checkRewardsShards"

const getTicketData = (itemData) => {
  const id = itemData.item_id;
  const name = itemData.name;

  const descrbTickets = {
    nft: 'We\'ll send you a guide on minting NFTs via DM on Discord',
    usdt: 'We\'ll contact you on Discord for prize distribution',
    points: 'We\'ll contact you on Discord for prize distribution'
  }
  const img = document.querySelector(".ticket-img__current");
  const list = document.querySelector(".playstation-list__wrapper");
  const text = document.querySelector('.ticket__text');
  const title = document.querySelector('.ticket__title')

  if(itemData.shard_number) {
    list.style.display = "flex";
    checkRewardsShards(list, itemData.shard_number);
    text.style.display='none';
  }
  img.setAttribute('alt', name);
  if(id === 'ps5') {
    img.setAttribute('src', '../img/tickets/ps5.png');
  } else if(id === 'legendaryNFT') {
    img.setAttribute('src', '../img/tickets/nftLegend.png');
    text.textContent = descrbTickets.nft;
  } else if(id === 'epicNFT') {
    img.setAttribute('src', '../img/tickets/nftEpic.png');
    text.textContent = descrbTickets.nft;
  } else if(id === 'rareNFT') {
    img.setAttribute('src', '../img/tickets/nftRare.png');
    text.textContent = descrbTickets.nft;
  } else if(id === 'commonNFT') {
    img.setAttribute('src', '../img/tickets/nftCommon.png');
    text.textContent = descrbTickets.nft;
  } else if(id === 'points') {
    img.setAttribute('src', '../img/tickets/extra.png');
    text.textContent = descrbTickets.points;
    title.textContent = `${itemData.amount} Extra Points`
  } else if(id === 'usdt') {
    img.setAttribute('src', '../img/tickets/usdt.png');
    text.textContent = descrbTickets.usdt;
    title.textContent = `${+itemData.amount / 100} USDT`
  }
}

export default getTicketData;
