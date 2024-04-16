import faq from "../modules/faq";

export default function authPage () {
    // redirect to account if authorized
    if (window.localStorage.getItem("grokth_token")) {
        window.location.href = "../en/cabinet";
    }

    const url = new URL(window.location);
    const authCode = url.searchParams.get("code");
    const refCode = "TEST";
    // redirect to index if missing data
    if (!authCode || !refCode) {
        window.location.href = "../en";
    }

    // resolve auth
    fetch(window.apiUrl+"v1/participant/resolve-auth", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            campaign_id: window.campaignID,
            auth: {
                type:"discord",
                data: {code:  authCode},
            }
        })
    }).then(res => {
        if (res.status === 200) {
            res.json().then((response => {
                let login = document.getElementById("login");
                login.classList.remove("btn_disabled");
                login.dataset.authToken = response.data.token;
            }));
        } else {
            document.getElementById("wallet").classList.add("error");
            document.querySelectorAll(".error__text").forEach(e => {
                e.innerHTML = "Try connecting the discord again";
            });
            console.error("failed to resolve auth", res);
        }
    }).catch((res) => {
        document.getElementById("wallet").classList.add("error");
        document.querySelectorAll(".error__text").forEach(e => {
            e.innerHTML = "Try connecting the discord again";
        });
        console.error("failed to resolve auth", res);
    });

    // login button
    document.getElementById("login").addEventListener("click", (e) => {
        e.preventDefault();
        let login = document.getElementById("login");

        const wallet = document.getElementById("wallet").value;
        if (!wallet) {
            document.getElementById("wallet").classList.add("error");
            document.querySelectorAll(".error__text").forEach(e => {
                e.innerHTML = "Please enter your Polygon wallet ID";
            });
            return;
        }

        login.classList.add("disabled");

        fetch(window.apiUrl+"v1/participant", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                campaign_id: window.campaignID,
                account_id: wallet,
                ref_code: refCode,
                auth: {
                    type:"resolved",
                    data: {token: login.dataset.authToken},
                }
            })
        }).then(res => {
            login.classList.remove("disabled");
            if (res.status === 200 || res.status == 201) {
                res.json().then((response => {
                    let p = response.data.participant;
                    window.localStorage.setItem("grokth_token", response.data.token)
                    window.localStorage.setItem("grokth_name", p.auth_data.name)
                    if (res.status === 201) {
                        window.location.href = "../en/verify";
                        return;
                    }
                    window.location.href = "../en/cabinet";
                }));
            } else {
                document.getElementById("wallet").classList.add("error");
                if (res.status === 403) {
                    document.querySelectorAll(".error__text").forEach(e => {
                        e.innerHTML = "Wallet is already linked to another account.";
                    });
                } else {
                    document.querySelectorAll(".error__text").forEach(e => {
                        e.innerHTML = "Invalid wallet address";
                    });
                }
                console.error("failed to create participant", res);
            }
        }).catch((res) => {
            login.classList.remove("disabled");
            document.getElementById("wallet").classList.add("error");
            document.querySelectorAll(".error__text").forEach(e => {
                e.innerHTML = "Failed to check wallet address";
            });
            console.error("failed to create participant", res);
        });
    });
}

