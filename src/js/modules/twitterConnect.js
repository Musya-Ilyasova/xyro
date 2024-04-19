const twitterConnect = (token) => {
  const btn = document.querySelector('.tw .connect-list-btn');
  btn.addEventListener('click', (e) => {
    if(btn.classList.contains('twConnect')) {
      e.preventDefault();
      fetch(`${window.apiUrl}v1/oauth/get-link?campaign_id=${window.campaignID}&type=twitter`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
      })
      .then(res => res.json())
      .then(result => {
        window.location.href = result.data.link
      })
      .catch((res) => {
          console.error("failed to get participant", res);
      });
    }
  })
}

export default twitterConnect;
