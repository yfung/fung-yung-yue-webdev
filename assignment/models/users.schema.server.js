var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    isAdmin: Boolean,
    email: String,
    dob: Date,
    gender: {type: String, enum:['Male', 'Female']}
}, {collection: "user"});
module.exports = userSchema;