var mongoose = require("mongoose");
var usersSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    email: String,
    dob: Date,
    gender: {type: String, enum:['Male', 'Female']},
    about: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"UsersModel"}],
    follows: [{type: mongoose.Schema.Types.ObjectId, ref:"UsersModel"}],
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref:"PlaylistModel"}]
}, {collection: "users"});
module.exports = usersSchema;