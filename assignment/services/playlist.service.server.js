var app = require("../../express");
var playlistModel = require("../models/playlist.model.server");

app.post("/api/profile/:userId/playlist", createPlaylist);
app.delete("/api/profile/:userId/playlist/:playlistId", deletePlaylist);

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