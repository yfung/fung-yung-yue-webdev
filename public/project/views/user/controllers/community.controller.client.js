(function () {
    angular
        .module("rhythmShark")
        .controller("communityController", communityController);

    function communityController(userService, currentUser) {
        var model = this;

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

        //delete users from this page as admin?

    }

})();