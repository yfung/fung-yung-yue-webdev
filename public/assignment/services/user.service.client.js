(function () {
    angular
        .module("yungApp")
        .factory("userService", userService);

    function userService($http) {

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
            return $http.put("/api/user/" + userId, user)
        }

        function registerUser(user) {
            return $http.post("/api/user", user);
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
            return $http.delete("/api/user/" + userId);
        }

    }
})();