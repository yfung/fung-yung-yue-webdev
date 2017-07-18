var app = angular.module("my-app", ["ngRoute"]);

app.controller("loginController", loginController);

app.config(configuration);

function configuration($routeProvider) {
    $routeProvider
        .when("/login", {templateURL: "login.html"})
        .when("/register", {templateURL: "register.html"});
}

function loginController($scope) {
    var users = [
        {_id: "123", username: "alice", password: "alice"}
    ];

    $scope.login = function (user) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === user.username && _user.password === user.password) {
                $scope.welcomeUser = _user;
            }
        }
    }
}