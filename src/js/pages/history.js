import addHistoryList from "../modules/addHistoryList"
import logout from "../modules/logout";

export default function accountPage() {
    const token = window.localStorage.getItem("grokth_token")
    if (!token) {
        window.location.href = "../en"
    }
    // get participant
    fetch(window.apiUrl+"v1/participant", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
    }).then(res => {
        if (res.status === 200) {
            res.json().then((response => {
                return response
            }));
        } else if (res.status == 401 || res.status == 404) {
            logout();
        } else {
            console.error("failed to get participant", res);
        }
    }).catch((res) => {
        console.error("failed to get participant", res);
    });
    // tickets data
    setCollectedTicketsData(token);
}

function getTicketsData(token, status, limit, callback) {
  const ticketsUrl = new URL(window.apiUrl+ "v1/tickets");
  ticketsUrl.searchParams.set("limit", limit);
  ticketsUrl.searchParams.set("status", status);

  fetch(ticketsUrl, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (res.status !== 200) {
      console.error("failed to load tickets", res);
      return
    }
    res.json().then((response => {callback(response.data);}));
  })
  .catch((res) => {
    console.error("failed to fetch tickets", res);
  });
}


function setCollectedTicketsData(token) {
	getTicketsData(token, "collected", 100, (d) => {
		if (d.items.length === 0 && !document.body.classList.contains('account-page_ticket')) {
		} else {
      addHistoryList(d.items);
		}
	});
}



