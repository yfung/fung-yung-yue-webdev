(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .controller("loginController", loginController);

    function loginController($scope, $location, userService) {
        $scope.login = function (user) {
            if (userService.findUserByUsernameAndPassword(user.username, user.password) === null) {
                $scope.errorMessage = "Username or password was incorrect. Please try again!"
            } else {
                $location.url("user/" + "");
            }
        }
    }
})();