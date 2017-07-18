var app = angular.module("my-app", ["ngRoute"]);

app.controller("loginController", loginController);

app.config(configuration);

function configuration($routeProvider) {
    $routeProvider
        .when("/login", {templateURL: "login.html"})
        .when("/register", {templateURL: "register.html"})
        .when("/profile", {templateURL: "profile.html"});
}

function loginController($scope, $location) {
    var users = [
        {_id: "123", username: "alice", password: "alice"}
    ];

    $scope.login = function (user) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === user.username && _user.password === user.password) {
                $location.url("profile");
            }
        }
        $scope.errorMessage = "Username or password was incorrect. Please try again!"
    }
}