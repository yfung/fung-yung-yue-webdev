var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var usersModel = require("./users.model.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
playlistModel.createPlaylist = createPlaylist;
playlistModel.deletePlaylist = deletePlaylist;
playlistModel.findPlaylistbyId = findPlaylistById;

module.exports = playlistModel;

function findPlaylistById(playlistId) {
    return playlistModel.findById(playlistId)
        .populate("songs");
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