var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var playListModel = mongoose.model("PlaylistModel", playlistSchema);

module.exports = playListModel;