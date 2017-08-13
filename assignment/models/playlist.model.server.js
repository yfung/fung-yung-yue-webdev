var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var usersModel = require("./users.model.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
playlistModel.createPlaylist = createPlaylist;
playlistModel.deletePlaylist = deletePlaylist;

module.exports = playlistModel;

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

function deletePlaylist(playlistId) {
    return playlistModel.remove({_id: playlistId});
}