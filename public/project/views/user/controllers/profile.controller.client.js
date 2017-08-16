(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("rhythmShark")
        .controller("profileController", profileController);

    function profileController(userService, $location, $rootScope, currentUser) {
        var model = this;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logOut = logOut;

        function init() {
            // routeParams is a map to all parameters of possible routes we gave i.e. /login
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });
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

        function logOut() {
            $rootScope.user = null;
        }

    }

})();