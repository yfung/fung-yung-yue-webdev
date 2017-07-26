(function () {
    angular
        .module("yungApp")
        .factory("userService", userService);

    function userService($http) {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u].username = user.username;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    return;
                }
            }
            return null;
        }

        function registerUser(user) {
            return $http.post("/api/users", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsernameAndPassword(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
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