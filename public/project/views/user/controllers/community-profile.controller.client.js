(function () {
    angular
        .module("rhythmShark")
        .controller("communityUserController", communityUserController);

    function communityUserController(userService, $routeParams, $rootScope) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.follow = follow;

        function init() {

            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    if ($rootScope.user.follows.length === 0) {model.follows = "Follows";}
                    for (var i = 0; i < $rootScope.user.follows.length; i++) {
                        if (model.user._id === $rootScope.user.follows[i]._id) {
                            model.followed = "Followed";
                            break;
                        } else {
                            model.follows = "Follows";
                        }
                    }
                });
        }

        init();

        function follow() {
            userService
                .follow($rootScope.user._id, model.userId)
                .then(function (response) {
                    //window.location.reload(true);
                });
        }

    }

})();