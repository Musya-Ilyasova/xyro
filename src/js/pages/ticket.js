import getTicketData from '../modules/getTicketData';
import ticketLoadingVideo from '../modules/ticketLoadingVideo';

export default function ticketPage() {
    const token = window.localStorage.getItem("grokth_token")
    if (!token) {
        window.location.href = "../"
    }

    const url = new URL(window.location)
    const ticketID = url.searchParams.get("id");

    if (!ticketID) {
        window.location.href = "../en/cabinet"
    }
    let isError, player = document.querySelector('#player');
    fetch(window.apiUrl+`v1/tickets/${ticketID}/collect`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "POST",
    }).then(res => {
        if (res.status === 200) {
            res.json().then((response => {
                document.querySelectorAll(".ticket__title").forEach(e => {
                    isError = false;
                    getTicketData(response.data.rewards[0]);
                    e.innerHTML = response.data.rewards[0].name;
                    player.addEventListener('canplay', ticketLoadingVideo(isError))
                })
            }));
        } else {
            isError = true;
            player.addEventListener('canplay', ticketLoadingVideo(isError))
            console.error("failed to collect ticket", res);
        }
    }).catch((res) => {
        isError = true;
        console.error("failed to collect ticket", res);
        player.addEventListener('canplay', ticketLoadingVideo(isError))
    });

}
