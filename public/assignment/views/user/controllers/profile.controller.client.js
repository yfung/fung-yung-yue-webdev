(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        this.updateUser = updateUser;
        this.unregister = unregister;

        function init() {
            // routeParams is a map to all parameters of possible routes we gave i.e. /login
            this.user = (userService.findUserById(userId));
        }
        init();

        function updateUser() {

        }

        function unregister() {

        }
    }

})();