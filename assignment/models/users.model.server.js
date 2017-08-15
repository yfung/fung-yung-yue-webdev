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
        .populate("playlists")
        .populate("follows")
        .populate("followers");
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
    var updatedUser = null;
    usersModel
        .findUserById(userId)
        .then(function (user) {
            if (user.follows.length === 0) {
                user.follows.push(followId);
            } else {
                for (var i = 0; i < user.follows.length; i++) {
                    if (user.follows[i].id === followId) {
                        user.follows.splice(i, 1);
                        break;
                    } else {
                        user.follows.push(followId);
                        break;
                    }
                }
            }
            user.save();
            updatedUser = user;
        });
    usersModel
        .findUserById(followId)
        .then(function (follow) {
            if (follow.followers.length === 0) {
                follow.followers.push(userId);
            } else {
                for (var i = 0; i < follow.followers.length; i++) {
                    if (follow.followers[i].id === userId) {
                        follow.followers.splice(i, 1);
                        break;
                    } else {
                        follow.followers.push(userId);
                        break;
                    }
                }
            }
            follow.save();
        });
    return updateUser;
}