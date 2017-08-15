(function () {
    angular
        .module("rhythmShark")
        .controller("communityUserController", communityUserController);

    function communityUserController(userService, $location, $routeParams) {
        var model = this;
        model.userId = $routeParams["userId"];

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                });
        }

        init();

        //delete users from this page as admin?

    }

})();