(function () {
    angular
        .module("rhythmShark")
        .controller("communityController", communityController);

    function communityController(userService) {
        var model = this;

        function init() {
            userService.getAllUsers()
                .then(function (response) {
                    model.users = response.data;
                });
        }

        init();

        //delete users from this page as admin?

    }

})();