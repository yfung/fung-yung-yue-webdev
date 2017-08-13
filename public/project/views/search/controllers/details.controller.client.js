(function () {
    angular
        .module("rhythmShark")
        .controller("detailsController", detailsController);

    var api_key = '78d4d2baebb25b906657a9a40ff7e684';

    function detailsController($routeParams, userService) {
        var model = this;
        model.trackId = $routeParams.trackID;
        model.userId = $routeParams["userId"];

        function init() {
            getTrack(model.trackId);
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.playlists = model.user.playlists;
                });
        }

        init();

        function getTrack(id) {
            $.ajax({
                type: 'GET',
                url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=' + id + '&api_key=' + api_key + '&format=json&limit=5',
            }).done(function (response) {
                var songName = $("<div>");
                var songArtist = $("<div>");
                var songPlays = $("<div>");
                var songId = $("<div>");

                songName.append("Track Title: " + response.track.name);
                songArtist.append("Artist: " + response.track.artist.name);
                songPlays.append("Total Listens: " + response.track.playcount);
                songId.append("Track ID: " + response.track.mbid);

                $("#trackData").append(songName);
                $("#trackData").append(songArtist);
                $("#trackData").append(songPlays);
                $("#trackData").append(songId);

            });
        }
    }
})();