(function () {
    angular
        .module("rhythmShark")
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
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user.length === 0) {
                        return userService.registerUser(user);
                    } else {
                        model.error = "User already exists!";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/profile/" + _user._id);
                });

        }
    }

})();