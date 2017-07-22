(function () {

    angular
        .module("yungApp")
        .factory("userService", userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;

        function findUserByUsernameAndPassword(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                     return _user._id;
                }
            }
            return null;
        }

        function registerUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function findUserByUsername(user) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === user.username) {
                    return _user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users[u] = user;
                    return;
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                    return;
                }
            }
            return null;
        }

    }

})();