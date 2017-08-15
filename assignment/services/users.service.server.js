var app = require("../../express");
var usersModel = require("../models/users.model.server");

app.get("/api/users/:userId", getUserById);
app.get("/api/users", findUser);
app.post("/api/users", registerUser);
app.put("/api/users/:userId", updateUser);
app.delete("/api/users/:userId", deleteUser);
app.get("/api/allusers", getAllUsers);
app.put("/api/users/:userId/follow/:followId", follow);

function getUserById(request, response) {
    usersModel
        .findUserById(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function findUser(request, response) {
    var username = request.query.username;
    var password = request.query.password;

    if (username && password) {
        usersModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.sendStatus(404).send(err);
                return;
            });
        return;
    } else if (username) {
        usersModel.findUserByUsername(username)
            .then(function (user) {
                response.json(user);
                return;
            });
    }
}

function registerUser(request, response) {
    var user = request.body;
    usersModel.createUser(user)
        .then(function (user) {
            response.send(user);
        });
}

function updateUser(request, response) {
    var userId = request.params.userId;
    var user = request.body;

    usersModel
        .updateUser(userId, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteUser(request, response) {
    var userId = request.params.userId;

    usersModel
        .deleteUser(userId)
        .then(function () {
            response.send("1");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function getAllUsers(request, response) {
    usersModel
        .getAllUsers()
        .then(function(users) {
            response.json(users);
        });
}

function follow(request, response) {
    var userId = request.params.userId;
    var followId = request.params.followId;

    usersModel
        .follow(userId, followId)
        .then(function(user) {
            response.json(user);
        });
}