var app = angular.module("my-app", []);

app.controller("loginController", loginController);

function loginController($scope) {
    $scope.login = function() {
        alert("login clicked");
    };
}