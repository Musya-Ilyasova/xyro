import idxBanner from "../modules/idxBanner"

export default function indexPage() {
    // redirect to account if authorized
    // if (window.localStorage.getItem("grokth_token")) {
    //     debugger;
    //     // window.location.href = "../eng/cabinet";
    // }

    const url = new URL(window.location);
    const refCode = url.searchParams.get("r");

    // if (!refCode) {
    //     url.searchParams.append("r", window.defaultCode);
    //     window.location.href = url.toString();
    // } else {
    //     fetch(`${window.apiUrl}v1/participant/check?ref_code=${refCode}&campaign_id=${window.campaignID}`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         method: "GET",
    //     }).then(res => {
    //         if (res.status === 200) {
    //             res.json().then((response => {
    //                 const date = response.data.promos[0].end * 1000;
    //                 const d = new Date();
    //                 if(Date.parse(d) < date) {
    //                     idxBanner(response.data.promos[0], date)
    //                 }
    //             }));
    //         } else {
    //             document.querySelector(".error-block").style.display= "flex";
    //         }
    //     }).catch((res) => {
    //         console.error("failed to get participant", res);
    //         document.querySelector(".error-block").style.display= "flex";
    //     });
    // }

    const btn = document.getElementById("discord-login");
    if (refCode) {
        let hrefUrl = new URL(window.discordLink);
        hrefUrl.searchParams.append("state", refCode);
        btn.setAttribute("href", hrefUrl.toString());
    }
}
