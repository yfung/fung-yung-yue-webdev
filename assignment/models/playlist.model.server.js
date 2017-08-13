var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
playlistModel.createPlaylist = createPlaylist;
playlistModel.deletePlaylist = deletePlaylist;

module.exports = playlistModel;

function createPlaylist(playlist) {
    return playlistModel.create(playlist)
        .populate("songs");
}

function deletePlaylist(playlistId) {
    return playlistModel.remove({_id: playlistId});
}