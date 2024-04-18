const ticketLoadingVideo = (isError, count = 0) => {
  const loading = document.querySelector('.ticket-loading'),
        afterContent = document.querySelector('.ticket__container'),
        afterError = document.querySelector('.ticket__container_error'),
        getTicket = document.querySelector('.getticket');

  if(isError) {
    setTimeout(()=> {
      loading.classList.add('hide');
      afterError.classList.remove('hide');
      getTicket.addEventListener('click', (e) => {
        e.preventDefault();
        location.reload();
      })
    }, 4000);
  } else {
    setTimeout(()=> {
      loading.classList.add('hide');
      afterContent.classList.remove('hide');
    }, 4000);
  }
}

export default ticketLoadingVideo;
