(function () {
    angular
        .module("rhythmShark")
        .controller("searchController", searchController);

    var api_key = '78d4d2baebb25b906657a9a40ff7e684';

    function searchController($routeParams) {

        var model = this;

        model.buttonSearch = buttonSearch;

        model.userId = $routeParams["userId"];

        function init() {
        }

        init();

        function buttonSearch(search) {
            $("table").remove();
            if (!$("#cbox").is(":checked")) {
                $.ajax({
                    type: 'GET',
                    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + search + '&api_key=' + api_key + '&format=json&limit=11',
                    success: renderSongs
                });
            } else {
                $.ajax({
                    type: 'GET',
                    url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=' + search + '&api_key=' + api_key + '&format=json&limit=11',
                    success: renderSongId
                });
            }
        }

        function renderSongId(response) {
            var table = $("<table>");
            table.addClass("table");
            var results = response.track;
            var tr = $("<tr>");
            var a = $("<a>");
            var tdname = $("<td>");
            var tdartist = $("<td>");
            a.append(results.name);
            a.attr('href', function () {
                return this.href + "/project/#!/profile/" + model.userId + "/track/" + results.mbid;
            });
            tdname.append(a);
            tdartist.append(results.artist.name);
            tr.append(tdname);
            tr.append(tdartist);

            table.append(tr);
            $("#searchResults").append(table);

        }

        function renderSongs(response) {

            var table = $("<table>");
            table.addClass("table");

            var results = response.results.trackmatches.track;

            for (var s in results) {
                var song = results[s];

                if (song.mbid != "") {
                    var tr = $("<tr>");
                    var a = $("<a>");
                    var tdname = $("<td>");
                    var tdartist = $("<td>");
                    a.append(song.name);
                    a.attr('href', function () {
                        return this.href + "/project/#!/profile/" + model.userId + "/track/" + song.mbid;
                    });
                    tdname.append(a);
                    tdartist.append(song.artist);
                    tr.append(tdname);
                    tr.append(tdartist);

                    table.append(tr);
                }
            }

            $("#searchResults").append(table);
        }
    }
})();
