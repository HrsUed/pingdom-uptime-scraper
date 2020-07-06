let status, sitename, url, uptime, downtime, responsetime;
let list = [];
let serverNo = [];
let siteNamePrefix = /\[prod(\d)\].*/i;
let rows = Array.from(document.getElementsByClassName("pd-table-row show"));

if ( rows.length < 1) console.log("取得できませんでした");

list = rows.map((row, index) => {
    status = row.getElementsByTagName("td")[1].getElementsByClassName("pd-check-status-up").length;
    if (!status) return undefined;

    siteName = row.getElementsByTagName("td")[2];

    serverNo = siteName.getElementsByTagName("strong")[0].innerText.match(siteNamePrefix)[1];

    url = siteName.getElementsByClassName("pd-check-hostname")[0].innerText;

    uptime = row.getElementsByTagName("td")[5].innerText;
    // >99.99% という表示がある場合は、>を取り除く
    uptime = uptime.match(/^>/) ? uptime.match(/^>(.+)/)[1] : uptime;

    outage = row.getElementsByTagName("td")[8];
    responsetime = outage.getElementsByClassName("responsetime")[0].innerText;
    downtime = outage.getElementsByClassName("js-totaldowntime")[0].innerText;

    if (responsetime != "N/A") return `${serverNo},${url},${uptime},${downtime}`;
}).filter(row => row != undefined).sort((a, b) => {
    return parseInt(a.split(",")[0],10) - parseInt(b.split(",")[0],10);
})
copy(list.join("\n"));
