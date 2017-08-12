var app = require("../../express");
var playlistModel = require("../models/playlist.model.server");

app.post("/api/playlist", createPlaylist);
app.delete("/api/playlist/:playlistId", deletePlaylist);

function createPlaylist(request, response) {
    var playlist = request.body;

    playlistModel
        .createPlaylist(playlist)
        .then(function (res) {
            response.json(res);
        }, function (err) {
            response.sendStatus(500).send(err);
        });
}

function deletePlaylist(request, response) {
    var playlistId = request.params.playlistId;

    playlistModel
        .deletePlaylist(playlistId)
        .then(function (status) {
            response.json(status);
        });
}