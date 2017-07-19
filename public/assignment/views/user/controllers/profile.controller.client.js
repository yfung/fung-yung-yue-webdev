(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, userService) {
        // routeParams is a map to all parameters of possible routes we gave i.e. /login
        var userId = $routeParams["userId"];
        for (var u in users) {
            if (users[u]._id === userId) {
                $scope.user = users[u];
            }
        }
    }

})();