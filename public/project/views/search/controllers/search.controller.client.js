(function () {
    angular
        .module("rhythmShark")
        .controller("searchController", searchController);

    var api_key = 'c4e8f9d79935bb08a49633af8cbf10b1';

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
                    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + search + '&api_key=' + api_key + '&format=json&limit=11',
                    success: renderSongs
                });
            } else {
                $.ajax({
                    type: 'GET',
                    url: 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=' + search + '&api_key=' + api_key + '&format=json&limit=11',
                    success: renderSongId
                });
            }
        }

        function renderSongId(response) {
            var results = response.track;
            var table = $("<ul class='list-group'></ul>");
            var th = $("<li class='list-group-item' id='table-header'></li>");
            var thRow = $("<div class='row'></div>");
            var trData = $("<div class='row'></div>");
            var thData = $("<div class='col-xs-4'>Name</div><div class='col-xs-4'>Artist</div><div class='col-xs-4'>Album</div>");
            thRow.append(thData);
            th.append(thRow);
            var tr = $("<li class='list-group-item'></li>");
            var tdname = $("<a class='col-xs-4'></a>");
            var tdartist = $("<div class='col-xs-4'></div>");
            var tdalbum = $("<div class='col-xs-4'></div>");
            tdname.append(results.name);
            tdname.attr('href', function () {
                return this.href + "/project/#!/community/" + model.userId + "/track/" + results.mbid;
            });
            tdartist.append(results.artist.name);
            tdalbum.append(results.album.title);

            trData.append(tdname);
            trData.append(tdartist);
            trData.append(tdalbum);
            tr.append(trData);
            table.append(th);
            table.append(tr);

            $("#searchResults").append(table);

        }

        function renderSongs(response) {
            var results = response.results.trackmatches.track;

            var table = $("<ul class='list-group'>");
            var th = $("<li class='list-group-item' id='table-header'></li>");
            var thRow = $("<div class='row'></div>");
            var thData = $("<div class='col-xs-4'>Name</div><div class='col-xs-4'>Artist</div><div class='col-xs-4'>Album</div>");
            thRow.append(thData);
            th.append(thRow);
            table.append(th);

            for (var s in results) {
                var song = results[s];

                if (song.mbid != "") {
                    var trRow = $("<div class='row'></div>");
                    var tr = $("<li class='list-group-item'></li>");
                    var tdname = $("<a class='col-xs-4'></a>");
                    var tdartist = $("<div class='col-xs-4'></div>");
                    var tdalbum = $("<div class='col-xs-4'></div>");
                    tdname.append(song.name);
                    tdname.attr('href', function () {
                        return this.href + "/project/#!/community/" + model.userId + "/track/" + song.mbid;
                    });
                    tdartist.append(song.artist);
                    tdalbum.append(song.album);
                    trRow.append(tdname);
                    trRow.append(tdartist);
                    trRow.append(tdalbum);
                    tr.append(trRow);
                    table.append(tr);
                }
            }

            $("#searchResults").append(table);
        }
    }
})();
