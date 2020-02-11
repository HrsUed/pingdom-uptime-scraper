let $site, url, uptime, downtime, responsetime;
let list = [];
let site = {};
let clst = [];

list = [];
site = {};
$(".pd-table-row").each((idx, row) => {
    $site = $($(row).children("td")[2])
    clst = $site.children("strong")[0].innerText.match(/\[prod([1-6])\].*/i);
    if (clst == null) {
      clst = "corporate";
    } else {
      clst = clst[1];
    }
    url = $site.children(".pd-check-hostname")[0].innerText;
    uptime = $(row).children("td")[5].innerText
    $outage = $($(row).children("td")[8])
    responsetime = $outage.children(".responsetime")[0].innerText
    downtime = $outage.children(".js-totaldowntime")[0].innerText
    if (responsetime != "N/A") list.push(`${clst},${url},${uptime},${downtime}`);
});
copy(list.join("\n"));
