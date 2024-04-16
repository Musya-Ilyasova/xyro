const isError = false;

const ticketLoadingVideo = (isError) => {

  const loading = document.querySelector('.ticket-loading'),
        afterContent = document.querySelector('.ticket__container'),
        afterError = document.querySelector('.ticket__container_error');

  if(isError) {
    setTimeout(()=> {
      loading.classList.add('hide');
      afterError.classList.remove('hide');
    }, 4000);
  } else {
    setTimeout(()=> {
      loading.classList.add('hide');
      afterContent.classList.remove('hide');
    }, 4000);
  }
}

export default ticketLoadingVideo;
