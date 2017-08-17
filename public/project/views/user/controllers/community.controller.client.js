(function () {
    angular
        .module("rhythmShark")
        .controller("communityController", communityController);

    function communityController(userService, currentUser, $location) {
        var model = this;
        model.logOut = logOut;
        model.removeUser = removeUser;

        function init() {
            userService.getAllUsers()
                .then(function (response) {
                    model.users = response.data;
                    if (currentUser.isAdmin) {
                        model.edit = true;
                    }
                });
        }

        init();

        function logOut() {
            userService.logOut()
                .then(function (response) {
                    $location.url("/");
                });
        }

        function removeUser(user) {
            userService
                .deleteUser(user._id)
                .then(function (response) {
                    window.location.reload(true);
                });
        }
    }

})();