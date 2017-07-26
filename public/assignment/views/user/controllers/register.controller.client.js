(function () {
    angular
        .module("yungApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }

        init();

        function registerUser(user) {
            if (user.passwordv != user.password) {
                model.error = "Passwords do not match!";
                return;
            }
            var promise = userService.findUserByUsername(user.username);
            promise
                .then(function (response) {
                    var _user = response.data;
                    if (_user === "0") {
                        user = userService.registerUser(user);
                        $location.url("/user/" + user._id);
                    } else {
                        model.error = "User already exists!";
                    }
                });
        }
    }

})();