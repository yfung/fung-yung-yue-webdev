function init() {
    gapi.client.setApiKey("AIzaSyDZgNj95Ym17jJOTZYmXron01aQezQBVwc");
    gapi.client.load("youtube", "v3", searchForVideo);

}

function searchForVideo() {

    var videoSearchField = $("#videoSearchField");
    var searchButton = $("#searchButton");

    searchButton.click(function () {

        var request = gapi.client.youtube.search.list({
            type: "video",
            maxResults: 10,
            order: "viewCount",
            q: videoSearchField
        });

        request.execute(renderVideo(response));

    });
}

function renderVideo(response) {

    var table = $("<table>");
    table.addClass("table");

    var results = response.result;

    for (var v in results.items) {
        var video = results[v];
        var tr = $("<tr>");
        var td = $("<td>");
        td.append(video.snippet.title);
        tr.append(td);

        var vid = $("<iframe>");
        vid.attr("src", "https://www.youtube.com/watch?v=" + video.snippet.id.videoId);
        vid.attr("width", "40");

        td = $("<td>");
        td.append(vid);
        tr.append(td);

        table.append(tr);
    }

    $("#searchResults").append(table);
}
