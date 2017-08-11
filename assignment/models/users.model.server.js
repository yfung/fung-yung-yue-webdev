var mongoose = require("mongoose");
var usersSchema = require("./users.schema.server");
var usersModel = mongoose.model("UsersModel", usersSchema);

module.exports = usersModel;