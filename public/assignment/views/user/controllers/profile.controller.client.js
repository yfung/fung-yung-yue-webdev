(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("yungApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            // routeParams is a map to all parameters of possible routes we gave i.e. /login
            var promise = userService.findUserById(model.userId);
            promise.then(function(response) {
                model.user = response.data;
            })
        }
        init();

        function updateUser() {
            userService.updateUser(model.userId, model.user);
        }

        function unregister() {
            userService.deleteUser(model.user._id);
            $location.url("/login");
        }
    }

})();