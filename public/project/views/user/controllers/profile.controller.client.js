(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("rhythmShark")
        .controller("pprofileController", profileController);

    function profileController($routeParams, userService, $location) {
        var model = this;
        model.userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            // routeParams is a map to all parameters of possible routes we gave i.e. /login
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                })
        }

        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
        }

        function unregister() {
            userService
                .deleteUser(model.userId)
                .then(function (response) {
                    if (response.data === "1") {
                        $location.url("/login");
                    }
                });
        }
    }

})();