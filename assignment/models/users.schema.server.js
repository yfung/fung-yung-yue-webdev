var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    email: String
}, {collection: "user"});
module.exports = userSchema;