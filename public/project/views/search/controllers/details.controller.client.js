(function () {
    angular
        .module("rhythmShark")
        .controller("detailsController", detailsController);

    var api_key = 'c4e8f9d79935bb08a49633af8cbf10b1';

    function detailsController($routeParams, userService, playlistService, $location, currentUser) {
        var model = this;
        model.trackId = $routeParams.trackID;
        model.userId = currentUser._id;

        model.addToPlaylist = addToPlaylist;
        model.logOut = logOut;

        function init() {
            getTrack(model.trackId);
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    model.playlists = model.user.playlists;
                });

        }

        init();

        function logOut() {
            userService.logOut()
                .then(function (response) {
                    $location.url("/");
                });
        }

        function addToPlaylist(playlist) {
            playlistService.addSong(model.userId, playlist._id, model.song)
                .then(function (response) {
                    $location.url("/community/playlist/" + playlist._id);
                });
        }

        function getTrack(id) {
            $.ajax({
                type: 'GET',
                url: 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=' + id + '&api_key=' + api_key + '&format=json&limit=5',
            }).done(function (response) {
                var songName = $("<h1>");
                var songArtist = $("<h2>");
                var songAlbum = $("<h2>");
                var songPlays = $("<h4>");
                var songImage = $("<img>");
                var songWiki = $("<p>");

                model.song = {name: response.track.name,
                    artist: response.track.artist.name,
                    mbid: response.track.mbid,
                    album: response.track.album.title,
                    duration: response.track.duration
                };

                songName.append(response.track.name);
                songArtist.append(response.track.artist.name);
                songPlays.append("Plays: " + response.track.playcount);
                songWiki.append(response.track.wiki.content);
                songImage.attr("src", response.track.album.image[response.track.album.image.length - 1]['#text']);
                songAlbum.append(response.track.album.title);

                $("#trackData").append(songName);
                $("#trackData").append(songArtist);
                $("#trackData").append(songAlbum);
                $("#trackData").append(songPlays);
                $("#trackData").append(songWiki);
                $("#trackImage").append(songImage);

            });
        }
    }
})();