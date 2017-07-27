var app = require("../express");

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
app.put("/api/user", updateUser);

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(request, response) {
    for (var u in users) {
        if (users[u]._id === request.params.userId) {
            response.send(users[u])
        }
    }
}

function findUser(request, response) {
    var username = request.query.username;
    var password = request.query.password;

    if (username && password) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === username && _user.password === password) {
                response.send(_user);
                return;
            }
        }
    } else {
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
    user._id = (new Date()).getTime() + "";
    users.push(user);
    response.send(user);
}

function updateUser(request, response) {
    var userId = request.params.userId;
    var user = request.body;

    for (var u in users) {
        if (users[u]._id === userId) {
            users[u] = user;
            response.send(user);
            return;
        }
    }
    response.send("404");
}