chrome.runtime.onMessage.addListener(async function(msg, sender, response) {
    if (msg.trigger) {
        window.location.replace(msg.link);
    }
    response(msg);
});
$(document).ready(async function() {
    var location = window.location.href.split("/")
    if (location[4] == 'videos') {
        var timer = setInterval(function() {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, scrollHeight);
            if ($(".scb9dxdr.dflh9lhu").length == 48) {
                clearInterval(timer);
                sendDataPopup()
                console.log("clear")
            }
        }, 1000);

        chrome.runtime.onMessage.addListener(async function(msg, sender, response) {
            if (msg.clear) {
                clearInterval(timer);
                sendDataPopup()
                console.log("clear")
            }
            response(msg);
        });
    }
});

function sendDataPopup() {
    var dom = document.querySelectorAll(".rq0escxv.rj1gh0hx.buofh1pr.ni8dbmo4.stjgntxs.l9j0dhe7 .j83agx80.l9j0dhe7.k4urcfbm")
    var locate = window.location.href.split("/")[3]
    var data = [];
    var flag = false;
    var image = document.querySelector(".b3onmgus.e5nlhep0.ph5uu5jm.ecm0bbzt.spb7xbtv.bkmhp75w.emlxlaya.s45kfl79.cwj9ozl2 svg image").getAttribute("xlink:href")
    var page = {
        name: locate,
        image: image,
        uid: ""
    };
    for (let i = 0; i < dom.length; i++) {
        let a_arr = dom[i].querySelectorAll('a')
        let href = a_arr[0].getAttribute("href");
        let title = a_arr[1].text;
        var regex = /^(?:\/)[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/
        if (regex.test(href)) {
            if (!flag) {
                let uid = href.split("/")[1]
                if (uid != undefined && uid != "") {
                    page.uid = uid
                    flag = true
                }
            }
            data.push({
                title: title,
                href: "https://facebook.com" + href,
                thumbnail: dom[i].querySelector('img').getAttribute("src")
            })
        }
    }
    var response = {
        data: Array.from(new Set(data)),
        page: page
    };
    json = [JSON.stringify(response)];
    var blob1 = new Blob(json, { type: "application/json" });
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, locate + ".json");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = locate + ".json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

function addLoading() {
    var div = document.createElement("div")
    var loader = document.createElement("div")
    loader.setAttribute("class", "loader");
    div.setAttribute("id", "fixed-loader")
    div.appendChild(loader)
    document.querySelector("body").appendChild(div);
}

function clearLoading(flag) {

}