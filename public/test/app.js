(function () {
    angular
        .module("lastFM", ['ngRoute'])
        .config(configuration)
        .controller("trackController", trackController)
        .controller("detailsController", detailsController);

    var api_key = '78d4d2baebb25b906657a9a40ff7e684';

    function trackController() {
        this.buttonSearch = buttonSearch;

        function init() {
        }

        init();

        function buttonSearch(search) {
            $.ajax({
                type: 'GET',
                url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + search + '&api_key=' + api_key + '&format=json&limit=5',
                success: renderSongs
            })
        }
    }

    function detailsController($routeParams) {
        var model = this;
        model.id = $routeParams.trackID;

        function init() {
            getTrack(model.id);
        }

        init();

        function getTrack(id) {
            $.ajax({
                type: 'GET',
                url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=' + id + '&api_key=' + api_key + '&format=json&limit=5',
            }).done(function(response) {
                var songName = $("<div>");
                var songArtist = $("<div>");
                var songPlays = $("<div>");

                songName.append("Track Title: " + response.track.name);
                songArtist.append("Artist: " + response.track.artist.name);
                songPlays.append("Total Listens: " + response.track.playcount);

                $("#trackData").append(songName);
                $("#trackData").append(songArtist);
                $("#trackData").append(songPlays);

            });
        }
    }

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "trackController",
                controllerAs: "model"
            })
            .when("/track/:trackID", {
                templateUrl: "track.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }

    function renderSongs(response) {

        console.log(response);

        var table = $("<table>");
        table.addClass("table");

        var results = response.results.trackmatches.track;

        for (var s in results) {
            var song = results[s];
            var tr = $("<tr>");
            var a = $("<a>");
            var tdname = $("<td>");
            var tdartist = $("<td>");
            a.append(song.name);
            a.attr('href', function () {
                return this.href + "/test/#!/track/" + song.mbid;
            });
            tdname.append(a);
            tdartist.append(song.artist);
            tr.append(tdname);
            tr.append(tdartist);

            table.append(tr);
        }

        $("#searchResults").append(table);
    }
})();
