var mongoose = require("mongoose");
var usersSchema = require("./users.schema.server");
var usersModel = mongoose.model("UsersModel", usersSchema);
usersModel.createUser = createUser;
usersModel.findUserById = findUserById;
usersModel.updateUser = updateUser;
usersModel.findUserByUsername = findUserByUsername;
usersModel.deleteUser = deleteUser;
usersModel.findUserByCredentials = findUserByCredentials;
usersModel.addPlaylist = addPlaylist;
usersModel.deletePlaylist = deletePlaylist;
usersModel.getAllUsers = getAllUsers;
usersModel.follow = follow;
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

function addPlaylist(userId, playlistId) {
    return usersModel
        .findUserById(userId)
        .then(function (user) {
            user.playlists.push(playlistId);
            return user.save();
        });
}

function deletePlaylist(userId, playlistId) {
    return usersModel
        .findUserById(userId)
        .then(function (user) {
            user.playlists.remove({_id: playlistId});
            return user.save();
        });
}

function getAllUsers() {
    return usersModel
        .find()
        .populate("playlists");
}

function follow(userId, followId) {
    return usersModel
        .findUserById(userId)
        .then(function (user) {
            var followOrNo = user.follows.indexOf(followId);
            if (followOrNo === -1) {
                user.follows.push(followId);
                user.save();
            } else {
                user.follows.splice(followOrNo, 1);
            }
        })
        .findUserById(followId)
        .then(function (follow) {
            var followOrNo = follow.followers.indexOf(userId);
            if (followOrNo === -1) {
                follow.followers.push(userId);
                follow.save();
            } else {
                follow.followers.splice(followOrNo, 1);
                return follow.save();
            }
        });
}