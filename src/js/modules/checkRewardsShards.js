const checkRewardsShards = (list, num, isSlider = false) => {
  const listCount = list.querySelector(".count");
  const listItems = list.querySelectorAll(".playstation-list__item");
  num <= 10 ? num : num = 10;
  listCount.textContent = num;
  if(isSlider && num === 10) {
    list.parentNode.classList.add('full');
  } else {
    listItems.forEach((item, index) => {
      if(index < (+num)) {
        item.classList.add('fill');
      }
    })
  }
}

export default checkRewardsShards;
