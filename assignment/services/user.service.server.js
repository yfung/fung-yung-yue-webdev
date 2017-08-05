var app = require("../../express");
var userModel = require("../models/user.model.server");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

// All url with api are meant to return dynamic data
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function getAllUsers(req, response) {
    userModel
        .getAllUsers
        .then(function (users) {
            response.send(users);
        });
}

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
        for (var u in users) {
            if (users[u].username === username) {
                response.send(users[u]);
                return;
            }
        }
    }
    response.send("0");
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

    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u, 1);
            // 1 means success
            response.send("1");
            return;
        }
    }
    response.sendStatus(404);
}