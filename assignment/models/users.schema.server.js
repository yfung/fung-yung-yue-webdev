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
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref:"PlaylistModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"UsersModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"UsersModel"}]
}, {collection: "users"});
module.exports = usersSchema;