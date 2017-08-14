var mongoose = require("mongoose");
var playlistSchema = mongoose.Schema({
    name: String,
    dateCreated: {type: Date, default: Date.now()},
    description: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:"UsersModel"},
    songs: [{name: String, artist: String, mbid: String, album: String, duration: String}]
}, {collection: "playlists"});
module.exports = playlistSchema;