var app = require("../../express");
var passport = require("passport");
var usersModel = require("../models/users.model.server");
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : "346999439175-de661ijvmlv1mtoo8i45lqflq3thdnhk.apps.googleusercontent.com",
    clientSecret : "Uwc_SCM7pDNoB4jVINUmoYYw"
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post("/api/login", passport.authenticate('local'), login);
app.get("/api/users/:userId", getUserById);
app.post("/api/users", findUser);
app.post("/api/register", registerUser);
app.put("/api/users/:userId", updateUser);
app.delete("/api/users/:userId", deleteUser);
app.get("/api/allusers", getAllUsers);
app.put("/api/users/:userId/follow/:followId", follow);
app.get("/api/checkLogin", checkLogin);
app.get("/api/logout", logout);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

function checkLogin(request, response) {
    response.send(request.isAuthenticated() ? request.user : '0');
}

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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    usersModel
        .findUserById(user._id)
        .then(function (user){
                done(null, user);
            }, function(err){
                done(err, null);
            }
        );
}

function login(request, response) {
    var user = request.user;
    response.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
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

function googleStrategy(token, refreshToken, profile, done) {
    usersModel
        .findUserById(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return usersModel.registerUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}