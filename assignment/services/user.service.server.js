var app = require("../../express");
var userModel = require("../models/user.model.server");

// All url with api are meant to return dynamic data
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function getUserById(request, response) {
    userModel
        .findUserById(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function findUser(request, response) {
    var username = request.query.username;
    var password = request.query.password;

    if (username && password) {
        userModel
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
        userModel.findUserByUsername(username)
            .then(function (user) {
                response.json(user);
                return;
            });
    }
}

function registerUser(request, response) {
    var user = request.body;
    userModel.createUser(user)
        .then(function (user) {
            response.send(user);
        });
}

function updateUser(request, response) {
    var userId = request.params.userId;
    var user = request.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteUser(request, response) {
    var userId = request.params.userId;

    userModel
        .deleteUser(userId)
        .then(function () {
            response.send("1");
        }, function (err) {
            response.sendStatus(404).send(err);
        });

}