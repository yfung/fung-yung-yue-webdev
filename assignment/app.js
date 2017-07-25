var app = require("../express");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

// All url with api are meant to return dynamic data
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    for (var u in users) {
        if (users[u]._id === req.params.userId) {
            response.send(users[u])
        }
    }
}