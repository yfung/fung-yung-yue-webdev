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
    about: String
}, {collection: "users"});
module.exports = usersSchema;