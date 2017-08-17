(function () {
    angular
        .module("rhythmShark")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": login,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "getAllUsers": getAllUsers,
            "follow": follow,
            "checkLogin": checkLogin,
            "logOut": logOut
        };
        return api;

        function updateUser(userId, user) {
            return $http.put("/api/users/" + userId, user);
        }

        function registerUser(user) {
            return $http.post("/api/register", user);
        }

        function findUserByUsername(username) {
            return $http.post("/api/users", {username: username});
        }

        function findUserById(userId) {
            return $http.get("/api/users/" + userId);
        }

        function login(username, password) {
            return $http.post("/api/login", {username: username, password: password});
        }

        function deleteUser(userId) {
            return $http.delete("/api/users/" + userId);
        }

        function getAllUsers() {
            return $http.get("/api/allusers");
        }

        function follow(userId, followId) {
            return $http.put("/api/users/" + userId + "/follow/" + followId);
        }

        function checkLogin() {
            return $http.get("/api/checkLogin")
                .then(function (response) {
                    return response.data;
                });
        }

        function logOut() {
            return $http.get("/api/logout");
        }

    }
})();