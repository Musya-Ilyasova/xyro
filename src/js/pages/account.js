import addHistoryList from "../modules/addHistoryList"
import logout from "../modules/logout";
import checkRewardsShards from "../modules/checkRewardsShards";
import twitterConnect from "../modules/twitterConnect";


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
                if (!response.data.fullfiled_conditions) {
                    // window.location.href = "../en/verify";
                }
                setParticipantData(response.data)
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
    setPendingTicketsData(token);
    setReadyTicketsData(token);
    setCollectedTicketsData(token);
    twitterConnect(token);
    eventScrollToNftFaq();
}

function scrollToNftFaq() {
    document.querySelector('#nft').classList.add('open');
    window.scrollTo({
        top: document.querySelector('#nft').getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
    });
}

function eventScrollToNftFaq() {
    if(window.location.href.includes('nft')) {
        scrollToNftFaq();
    }
    const btnModal  = document.querySelector('.modal .btn_grey');
    btnModal.addEventListener('click', () => {
        if(btnModal.getAttribute('href').includes('nft')) {
            scrollToNftFaq();
        }
    });
}







function setParticipantData(p) {
    document.querySelector('.dc .connect-list-item__status').textContent = p.auth_data.name;
    document.querySelector('.tg .connect-list-btn').setAttribute('href', `https://t.me/GrokthXyroStageBot?start=${p.id}`);
    if(p.rewards_shards) {
        const list = document.querySelector('.playstation-list__wrapper');
        checkRewardsShards(list, p.rewards_shards[0].current);
    }
    // set refLink
    const refUrl = new URL(window.location);
    let path = refUrl.pathname.split('/');
    path = path.slice(0, path.length - 1)
    refUrl.pathname = path.join("/")
    refUrl.searchParams.append("r", p.ref_code)
    Array.prototype.forEach.call( document.getElementsByClassName("bannerinv-link__url"), (e) => {
        e.innerHTML = refUrl.toString().replace('https://', '').replace('http://', '');
        e.dataset.text = refUrl.toString();
    });

    // set friends
    Array.prototype.forEach.call(document.getElementsByClassName("count-friends"), (e) => {
        e.innerHTML = p.referrals_count.new || 0;
    });

    // set soc links
    const links = document.querySelectorAll('.inviting-soclist__link');
    links.forEach(link => {
        if(link.classList.contains('tg')) {
            link.href = ``
        } else if(link.classList.contains('tw')) {
            link.href = ``;
        } else if(link.classList.contains('fb')) {
            link.addEventListener('click', function() {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + refUrl.toString(),
                    'facebook-share-dialog',
                    'width=400,height=600'
                );
            });
        }
    })

    // if (p.promos) {
    //     for (let i = 0; i < p.promos.length; i++) {
    //         let promo = p.promos[i];
    //         if (promo.type === "invite_multiplier") {
    //             var date = new Date(promo.end * 1000);
    //             document.getElementById("bannerTimer").dataset.deadline = date.toISOString();
    //             document.getElementById("modalTimer").dataset.deadline = date.toISOString();
    //             timer('#bannerTimer');
    //             timer('#modalTimer');
    //             let shownPromos = window.localStorage.getItem("grokth_shown_promos") || [];
    //             if (shownPromos.indexOf(promo.id) !== -1) {
    //                 document.querySelector('.getx3').classList.remove("hide");
    //             } else {
    //                 showGetX3();
    //                 shownPromos.push(promo.id);
    //                 window.localStorage.setItem("grokth_shown_promos", shownPromos);
    //             }
    //             break;
    //         }
    //     }
    // }
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

function setPendingTicketsData(token) {
    getTicketsData(token, "pending", 1, (d) => {
        Array.prototype.forEach.call(document.getElementsByClassName("count-pending"), (e) => {
            e.innerHTML = d.total;
        });
    })
}

function setReadyTicketsData(token) {
    getTicketsData(token, "ready", 1, (d) => {
        Array.prototype.forEach.call(document.getElementsByClassName("hero-prizes__count"), (e) => {
            e.innerHTML = d.total;
            if (d.items.length > 0) {
                document.querySelector('.hero').classList.add('hero_light')
                document.querySelectorAll(".getticket").forEach((e) => {
                    let params = new URLSearchParams();
                    params.append("id", d.items[0].id);
                    e.setAttribute("href", `${e.getAttribute("href")}?${params.toString()}`);
                    e.classList.remove("btn_disabled");
                })
            }
        });
    });
}

function setCollectedTicketsData(token) {
	getTicketsData(token, "collected", 100, (d) => {
		if (d.items.length === 0 && !document.body.classList.contains('account-page_ticket')) {
		} else {
            const items = d.items.slice(0, 3);
            if(items.length>=3) {
                document.querySelector('.history-list').classList.add('history-list_gradient')
            }
            addHistoryList(items);
		}
	});
}



