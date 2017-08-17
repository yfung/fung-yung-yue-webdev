var app = require("../../express");
var playlistModel = require("../models/playlist.model.server");

app.post("/api/profile/:userId/playlist", createPlaylist);
app.delete("/api/profile/:userId/playlist/:playlistId", deletePlaylist);
app.get("/api/profile/:userId/playlist/:playlistId", findPlaylistById);
app.put("/api/profile/:userId/playlist/:playlistId/song", addSong);
app.put("/api/playlist/:playlistId", updatePlaylist);
app.delete("/api/profile/:userId/playlist/:playlistId/song/:songId", removeSong);


function updatePlaylist(request, response) {
    var playlistId = request.params.playlistId;
    var playlist = request.body;

    playlistModel
        .updatePlaylist(playlistId, playlist)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findPlaylistById(request, response) {
    var playlistId = request.params.playlistId;

    playlistModel
        .findPlaylistById(playlistId)
        .then(function (playlist) {
            response.json(playlist);
        });
}

function createPlaylist(request, response) {
    var playlist = request.body;

    playlistModel
        .createPlaylist(playlist)
        .then(function (playlistDoc) {
            response.json(playlistDoc);
        }, function (err) {
            response.sendStatus(500).send(err);
        });
}

function deletePlaylist(request, response) {
    var playlistId = request.params.playlistId;
    var userId = request.params.userId;

    playlistModel
        .deletePlaylist(userId, playlistId)
        .then(function (status) {
            response.json(status);
        });
}

function addSong(request, response) {
    var song = request.body;
    var playlistId = request.params.playlistId;

    playlistModel
        .addSong(playlistId, song)
        .then(function (playlist) {
            response.json(playlist);
        });
}

function removeSong(request, response) {
    var songId = request.params.songId;
    var playlistId = request.params.playlistId;

    playlistModel
        .deleteSong(songId, playlistId)
        .then(function (playlist) {
            response.json(playlist);
        });

}