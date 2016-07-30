/**
 * Created by Ameya on 7/28/2016.
 */

var webSocketObj, playlistObj;

function handleMessage(msg) {
    console.log(msg);
    if (msg.indexOf("status->") != -1) {
        var status = msg.split("status->")[1];
        status = JSON.parse(status);
        if (status.playing == false) {
            $("#play-btn").show();
            $("#stop-btn").hide();
            deactivateAllItems();
        } else {
            $("#play-btn").hide();
            $("#stop-btn").show();
            $("#now-playing").html(status.name);
            var currentIndex = status.index;
            playlistObj.setCurrentItemIndex(currentIndex);
            deactivateAllItems();
            $("#item-" + currentIndex).addClass("active");
        }
    } else { // this is playlist
        playlistObj = new playlistInstance(msg);
        if(playlistObj.getItemsLength() > 0) {
            var playlist = playlistObj.getItems();
            displayPlaylist(playlist);
        }
    }
}

function displayPlaylist(playlist) {
    var listView = "<div class='list-group'>";
    for (var item in playlist) {
        listView += "<a href='#' class='list-group-item' id='item-" + item + "' onclick='selectItem(" + item + ");'>" +
            playlist[item] + "</a>";
    }
    listView += "</div>";
    $("#playlist").html(listView);
}

function selectItem(item) {
    webSocketObj.sendMessage("play " + item.toString());
    playlistObj.setCurrentItemIndex(item);
    deactivateAllItems();
    $("#item-" + item).addClass("active");
}

function deactivateAllItems() {
    $(".list-group-item").removeClass("active");
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    //get client ip address
    var serverAddr = window.location.hostname;
    webSocketObj = new webSocketInstance(serverAddr);

    $("#play-btn").click(function() {
        var currentIndex = playlistObj.getCurrentItemIndex();
        webSocketObj.sendMessage("play " + currentIndex.toString());
    });

    $("#stop-btn").click(function() {
        webSocketObj.sendMessage("stop");
        deactivateAllItems();
    });

    $("#skip-btn").click(function() {
        webSocketObj.sendMessage("skip");
    });

    $("#playall-btn").click(function() {
        webSocketObj.sendMessage("play all");
    });

    $("#shuffle-btn").click(function() {
        webSocketObj.sendMessage("play shuffle");
    });
});