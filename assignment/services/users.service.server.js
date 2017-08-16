var app = require("../../express");
var passport = require("passport");
var usersModel = require("../models/users.model.server");
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));

app.post("/api/login", passport.authenticate('local'), login);
app.get("/api/users/:userId", getUserById);
app.post("/api/users", findUser);
app.post("/api/users", registerUser);
app.put("/api/users/:userId", updateUser);
app.delete("/api/users/:userId", deleteUser);
app.get("/api/allusers", getAllUsers);
app.put("/api/users/:userId/follow/:followId", follow);

function localStrategy(username, password, done) {
    usersModel
        .findUserByCredentials(username, password)
        .then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            }, function(err) {
                if (err) { return done(err); }
            }
        );
}


function login(request, response) {
    var user = request.user;
    response.json(user);
}

function getUserById(request, response) {
    usersModel
        .findUserById(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function findUser(request, response) {
    var username = request.body.username;

    usersModel.findUserByUsername(username)
        .then(function (user) {
            response.json(user);
            return;
        });
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
        .then(function (users) {
            response.json(users);
        });
}

function follow(request, response) {
    var userId = request.params.userId;
    var followId = request.params.followId;

    usersModel
        .follow(userId, followId)
        .then(function (user) {
            response.json(user);
        });
}