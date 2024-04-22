import logout from "../modules/logout";

export default function verifyPage () {
    const token = window.localStorage.getItem("grokth_token")
    if (!token) {
        window.location.href = "../eng"
    }

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
                let p = response.data
                if (p.fullfiled_conditions) {
                    window.location.href = "../eng/cabinet";
                }
            }));
        } else if (res.status == 401 || res.status == 404) {
            logout();
        } else {
            console.error("failed to get participant", res);
        }
    }).catch((res) => {
        console.error("failed to get participant", res);
    });
    document.querySelector(".verify a.btn_primary").addEventListener("click", (e) => {
        e.preventDefault();

        fetch(window.apiUrl+"v1/tickets/check-status", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: "POST",
        }).then(res => {
            if (res.status === 200) {
                window.location.href = "../eng/cabinet";
            } else {
                document.querySelector(".verify a.btn_primary").classList.add("error")
            }
        }).catch((res) => {
            console.error("failed to create participant", res);
        });
    });
}
