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
            var _user = userService.findUserByUsername(user.username);
            if (!_user) {
                model.error = "User already exists!"
            }
            var user = userService.registerUser(user);
            $location.url("/user/" + user._id);
        }

        function updateUser(user) {
            userService.updateUser(user._id, user);
        }
    }

})();