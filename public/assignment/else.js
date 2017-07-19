(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .controller("loginController", loginController)
        .controller("profileController", profileController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function profileController($scope, $routeParams) {
        // routeParams is a map to all parameters of possible routes we gave i.e. /login
        var userId = $routeParams["userId"];
        for (var u in users) {
            if (users[u]._id === userId) {
                $scope.user = users[u];
            }
        }
    }

    function loginController($scope, $location) {
        $scope.login = function (user) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === user.username && _user.password === user.password) {
                    $location.url("profile/" + _user._id);
                }
            }
            $scope.errorMessage = "Username or password was incorrect. Please try again!"
        }
    }
})();