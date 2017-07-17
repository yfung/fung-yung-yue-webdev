var app = angular.module("my-app", []);

app.controller("loginController", loginController);

function loginController($scope) {
    $scope.login = function(username, password) {
        var users = [
            {_id: "123", username: "alice", password: "alice"}
        ];

        $scope.login = function(user) {
            for(var u in users) {
                var _user = users[u];
                if(_user.username === user.username && _user.password === user.password) {
                    $scope.welcomeUser = _user;
                }
            }
        }

    }
}