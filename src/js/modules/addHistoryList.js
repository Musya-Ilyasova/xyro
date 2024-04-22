const getZero = (num) => {
  if(num < 10) {
    return `0${num}`
  } else {
    return num;
  }
}

const setDataTime = (date) => {
  const giftDate = new Date(date*1000),
        day = giftDate.getDate(),
        month = giftDate.getMonth(),
        hours = giftDate.getHours(),
        minutes = giftDate.getMinutes();
  return `collected ${day}.${getZero(+month)} at ${getZero(hours)}:${getZero(minutes)}`
}

export const setName = (title, itemData) => {
  if(itemData.item_id.includes('usdt')) {
    let amount = +itemData.amount / 100;
    title.textContent = `${amount} USDT`
  } else if(itemData.item_id==="points") {
    title.textContent = `${itemData.amount} Extra Points`
  } else {
    title.textContent = itemData.name;
  }
}

const createImgPrize = (img, id, name) => {
  img.setAttribute('type', 'image/svg+xml');
  img.setAttribute('alt', name);
  if(id === 'ps5') {
    img.setAttribute('src', '../img/history/ps5.svg');
  } else if(id === 'legendaryNFT') {
    img.setAttribute('src', '../img/history/nftLegend.svg');
  } else if(id === 'epicNFT') {
    img.setAttribute('src', '../img/history/nftEpic.svg');
  } else if(id === 'rareNFT') {
    img.setAttribute('src', '../img/history/nftRare.svg');
  } else if(id === 'commonNFT') {
    img.setAttribute('src', '../img/history/nftCommon.svg');
  } else if(id === 'points') {
    img.setAttribute('src', '../img/history/extra.svg');
  } else if(id.includes('usdt')) {
    img.setAttribute('src', '../img/history/usdt.svg');
  }
  return img
}

const addHistoryList = (data) => {
  data.forEach(item => {
    const itemData = item.rewards[0];
    const li = document.createElement('li');
    li.classList.add('history-list-item');
    const img = document.createElement('img');
    img.classList.add('history-list-item__img');
    const content = document.createElement('div');
    content.classList.add('history-list-item__content');
    const icon = document.createElement('span');
    icon.classList.add('icon-chevron');
    const title = document.createElement('span');
    title.classList.add('history-list-item__title');
    const status = document.createElement('span');
    status.classList.add('history-list-item__status');
    li.setAttribute('data-id', item.id);

    if(item.status === "ready" && item.type === "inviter") {
      const a = document.createElement('a');
      a.href = "/eng/cabinet#openAGift";
      a.textContent = 'linkToGift';
      li.append(a);
      title.textContent= "Your referral reward";
      img.setAttribute('src', '../img/history/gift.svg');
      status.textContent = "Claim now";

    } else if(item.status === "ready" && item.type === "referral") {
      const a = document.createElement('a');
      a.href = "/eng/cabinet#openAGift";
      a.textContent = 'linkToGift';
      li.append(a);
      title.textContent= "Welcome gift";
      img.setAttribute('src', '../img/history/gift.svg');
      status.textContent = "Claim now";

    } else if(item.status === "pending" && item.type === "referral") {
      li.setAttribute('data-modal', "welcome");
      img.setAttribute('src', '../img/history/clock.svg');
      status.textContent = "pending";
      title.textContent= "Welcome gift";

    } else if(item.status === "pending" && item.type === "inviter") {
      li.setAttribute('data-modal', "reward");
      img.setAttribute('src', '../img/history/clock.svg');
      status.textContent = "pending";
      title.textContent= "Your referral reward";

    } else {
      setName(title, itemData);
      li.setAttribute('data-modal', itemData.item_id);
      status.textContent = setDataTime(item.created);
      createImgPrize(img, itemData.item_id, itemData.name);
    }

    content.append(title);
    content.append(status);
    li.append(img);
    li.append(content);
    li.append(icon);
    document.querySelector('.history-list').append(li);
  })
}


export default addHistoryList;
