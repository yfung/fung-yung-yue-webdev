(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, userService) {
        var userId = $routeParams["userId"];

        $scope.updateUser = updateUser;
        $scope.unregister = unregister;

        function init() {
            // routeParams is a map to all parameters of possible routes we gave i.e. /login
            $scope.user = (userService.findUserById(userId));
        }
        init();

        function updateUser() {

        }

        function unregister() {

        }
    }

})();