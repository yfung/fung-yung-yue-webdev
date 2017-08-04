(function () {
    $(init);

    function init() {
        var api_key = '78d4d2baebb25b906657a9a40ff7e684';
        var searchButton = $("#searchButton");

        searchButton.click(function () {
            var songSearchField = $("#songSearchField");
            $.ajax({
                type: 'GET',
                url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + songSearchField.val() + '&api_key=' + api_key + '&format=json&limit=5',
                success: renderSongs
            })
        });

    }

    function renderSongs(response) {

        console.log(response);

        var table = $("<table>");
        table.addClass("table");

        var results = response.results.trackmatches.track;

        for (var s in results) {
            var song = results[s];
            var tr = $("<tr>");
            var tdname = $("<td>");
            var tdartist = $("<td>");
            tdname.append(song.name);
            tdartist.append(song.artist);
            tr.append(tdname);
            tr.append(tdartist);

            table.append(tr);
        }

        $("#searchResults").append(table);
    }
})();
