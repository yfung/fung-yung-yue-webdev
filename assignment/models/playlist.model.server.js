var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);

module.exports = playlistModel;

function createPlaylist(playlist) {
    return playlistModel.create(playlist);
}