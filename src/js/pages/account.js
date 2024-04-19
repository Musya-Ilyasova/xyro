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
                setParticipantData(response.data, token)
            }));
        } else if (res.status == 401 || res.status == 404) {
            logout();
        } else {
            console.error("failed to get participant", res);
        }
    }).catch((res) => {
        console.error("failed to get participant", res);
    });
    setTicketsData(token);
    setTotalReadyTickets(token)
    twitterConnect(token);
    eventScrollToNftFaq();
    document.querySelector('.btn_logout').addEventListener('click', () => {
        logout();
    })
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

function setParticipantData(p, token) {
    document.querySelector('.dc .connect-list-item__status').textContent = p.auth_data.name;
    document.querySelector('.tg .connect-list-btn').setAttribute('href', `${window.telegram}?start=${p.id}`);

    if(p.socials) {
        const twObj = p.socials.filter(item => {
            return item.type === "twitter";
        })
        if(twObj.length>0) {
            document.querySelector('.tw .connect-list-btn').classList.remove('twConnect');
            document.querySelector('.tw .connect-list-btn').textContent = "Follow";
            document.querySelector('.tw .connect-list-btn').setAttribute("target", "_blank");
            document.querySelector('.tw .connect-list-btn').href = "https://x.com/xyro_io";
            document.querySelector('.tw .connect-list-item__status').textContent = twObj[0].username;
        }
    }

    if(p.fullfiled_conditions) {
        document.querySelector('.connect').style.display = 'none';
    }

    if(p.rewards_shards) {
        const list = document.querySelector('.playstation-list__wrapper');
        checkRewardsShards(list, p.rewards_shards[0].current);
    }
    // set refLink
    const refUrl = new URL(window.location);
    let path = `${refUrl.host}/en?r=${p.ref_code}`
    Array.prototype.forEach.call( document.getElementsByClassName("copyInput"), (e) => {
        e.innerHTML = path.replace('https://', '').replace('http://', '');
        e.dataset.text = path;
    });

    const searchUrl = new URL(window.location).searchParams;
    if(searchUrl.has('oauth_token') && searchUrl.has('oauth_verifier')) {
        setParticipantTwitterData(searchUrl, token);
    }

    // set soc links
    const links = document.querySelectorAll('.inviting-soclist__link');
    links.forEach(link => {
        if(link.classList.contains('tg')) {
            link.href = `https://t.me/share/url?url=${path}&text=Hey!%20Join%20XYRO%20with%20my%20link%20${path}%20and%20secure%20a%20Whitelist%20NFT,%20cash%20bonuses,%20a%20PlayStation%205,%20or%20other%20valuable%20rewards!`
        } else if(link.classList.contains('tw')) {
            link.href = `https://twitter.com/intent/tweet?original_referer=${path}&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&related=xyro_io&text=Hey!%20Join%20XYRO%20using%20my%20link%20${path}%20and%20secure%20a%20Whitelist%20NFT,%20cash%20bonuses,%20a%20PlayStation%205,%20or%20other%20valuable%20rewards!&hashtags=xyro,referral,rewards,web3,whitelist,airdrop`;
        }
    })
}

function setParticipantTwitterData(searchUrl, token) {
    const oauthToken = searchUrl.get('oauth_token');
    const oauthVerifier = searchUrl.get('oauth_verifier');

    fetch(window.apiUrl+"v1/participant/add-social", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            type:"twitter",
            data: {
                token:  oauthToken,
                verifier: oauthVerifier
            },
        }),
        method: "POST",
    }).then(res => {
        if (res.status === 200) {
            window.location.href = "../en/cabinet";
        } else {
            console.error("failed to create participant", res.status);
        }
    }).catch((res) => {
        console.error("failed to create participant", res);
    });
}

function getTicketsData(token, limit, callback, status = 0) {
    const ticketsUrl = new URL(window.apiUrl+ "v1/tickets");
    ticketsUrl.searchParams.set("limit", limit);

    if(status) {
        ticketsUrl.searchParams.set("status", status);
    }

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

function setTotalReadyTickets (token) {
    getTicketsData(token, 100, (d) => {
        const btn = document.querySelector(".getticket");
        if(d.total>0) {
            document.querySelector(".hero-prizes__count").textContent = d.total;
            document.querySelector('.hero').classList.add('hero_light');
            let params = new URLSearchParams();
            params.append("id", d.items[0].id);
            btn.setAttribute("href", `${btn.getAttribute("href")}?${params.toString()}`);
            btn.classList.remove("btn_disabled");
        }
    }, 'ready')

}

function setTicketsData(token) {
    getTicketsData(token, 100, (d) => {
        const items = d.items.slice(0, 3);
        if(items.length>=3) {
            document.querySelector('.history-list').classList.add('history-list_gradient')
        }
        addHistoryList(items);
	});
}




