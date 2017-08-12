var mongoose = require("mongoose");
var playlistSchema = mongoose.Schema({
    dateCreated: {type: Date, default: Date.now()},
    description: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref:"UsersModel"},
    songs: []
}, {collection: "playlists"});
module.exports = playlistSchema;