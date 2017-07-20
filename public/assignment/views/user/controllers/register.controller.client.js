(function () {
    angular
        .module("my-app")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            var user = userService.registerUser(user);
            $location.url("/user/" + user._id);
        }
    }

})();