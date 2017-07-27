(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("yungApp")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {

        }

        init();

        function login(user) {
            userService.findUserByUsernameAndPassword(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if (user === "0") {
                        model.errorMessage = "Username or password was incorrect. Please try again!"
                    } else {
                        $rootScope.currentUser = user;
                        $location.url("user/" + user._id);
                    }
                });
        }
    }
})();