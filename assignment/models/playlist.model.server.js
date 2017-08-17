var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var usersModel = require("./users.model.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
playlistModel.createPlaylist = createPlaylist;
playlistModel.deletePlaylist = deletePlaylist;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.addSong = addSong;
playlistModel.deleteSong = deleteSong;
playlistModel.updatePlaylist = updatePlaylist;

module.exports = playlistModel;

function findPlaylistById(playlistId) {
    return playlistModel.findById(playlistId)
        .populate("songs");
}

function updatePlaylist(playlistId, playlist) {
    return playlistModel.update({_id: playlistId},
        {$set: playlist});
}

function createPlaylist(playlist) {
    var tempPlaylist = null;
    return playlistModel
        .create(playlist)
        .then(function (playlistDoc) {
            tempPlaylist = playlistDoc;
            return usersModel.addPlaylist(playlistDoc.createdBy, playlistDoc._id);
        })
        .then(function () {
            return tempPlaylist;
        });
}

function deletePlaylist(userId, playlistId) {
    return playlistModel
        .remove({_id: playlistId})
        .then(function (status) {
            return usersModel.deletePlaylist(userId, playlistId);
        });
}

function addSong(playlistId, song) {
    return playlistModel
        .findPlaylistById(playlistId)
        .then(function (playlist) {
            playlist.songs.push(song);
            return playlist.save();
        });
}

function deleteSong(songId, playlistId) {
    return playlistModel
        .findPlaylistById(playlistId)
        .then(function (playlist) {
            var index = playlist.songs.indexOf(songId);
            playlist.songs.splice(index, 1);
            return playlist.save();
        });
}