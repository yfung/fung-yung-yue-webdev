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
                    if (_user === null) {
                        return userService.registerUser(user);
                    } else {
                        model.error = "User already exists!";
                        return;
                    }
                })
                .then(function (response) {
                    userService.logOut()
                        .then(function (status) {
                            $location.url("/login");
                        });
                });

        }
    }

})();