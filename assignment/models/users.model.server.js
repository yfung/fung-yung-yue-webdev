var mongoose = require("mongoose");
var usersSchema = require("./users.schema.server");
var usersModel = mongoose.model("UsersModel", usersSchema);
usersModel.createUser = createUser;
usersModel.findUserById = findUserById;
usersModel.updateUser = updateUser;
usersModel.findUserByUsername = findUserByUsername;
usersModel.deleteUser = deleteUser;
usersModel.findUserByCredentials = findUserByCredentials;
module.exports = usersModel;

function findUserById(userId) {
    return usersModel.findById(userId)
        .populate("playlists");
}

function findUserByCredentials(username, password) {
    return usersModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return usersModel.findOne({username: username});
}

function createUser(user) {
    return usersModel.create(user);
}

function updateUser(userId, user) {
    return usersModel.update({_id: userId},
        {$set: user});
}

function deleteUser(userId) {
    return usersModel.remove({_id: userId});
}