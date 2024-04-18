export default function indexPage() {
    // redirect to account if authorized
    if (window.localStorage.getItem("grokth_token")) {
        window.location.href = "../en/cabinet";
    }

    const url = new URL(window.location);
    const refCode = url.searchParams.get("r");

    if (!refCode) {
        url.searchParams.append("r", window.defaultCode);
        window.location.href = url.toString();
    }

    const btn = document.getElementById("discord-login");
    if (refCode) {
        let hrefUrl = new URL(window.discordLink);
        hrefUrl.searchParams.append("state", refCode);
        btn.setAttribute("href", hrefUrl.toString());
    }
}
