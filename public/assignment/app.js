var app = angular.module("my-app", ["ngRoute"]);

app.controller("loginController", loginController);

app.config(configuration);

var users = [
    {_id: "123", username: "alice", password: "alice"}
];

function configuration($routeProvider) {
    $routeProvider
        .when("/login", {templateURL: "login.html"})
        .when("/register", {templateURL: "register.html"})
        // : refers to a place holder with the name userId
        .when("/profile/:userId", {templateURL: "profile.html"});
}

function profileController($scope, $routeParams) {
    // routeParams is a map to all parameters of possible routes we gave i.e. /login
    var userId = $routeParams["userId"]
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