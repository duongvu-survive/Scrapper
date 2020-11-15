$(document).ready(function() {
    $("#scroller").click(function(e) {
        var link = $("#url").val().split("/");
        if (link.length < 3) {
            return
        }
        var url = "https://facebook.com/" + link[3] + "/videos"
        chrome.tabs.query({
                active: true,
                currentWindow: true
            },
            function(tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id, { trigger: true, link: url }
                );
            }
        );
    });
    $("#clear").click(function(e) {
        chrome.tabs.query({
                active: true,
                currentWindow: true
            },
            function(tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id, { clear: true }
                );
            }
        );
    })


    chrome.runtime.onMessage.addListener(async function(msg, sender, response) {
        if (msg.response) {
            console.log(msg.data)
        }
        response(msg);
    });

});