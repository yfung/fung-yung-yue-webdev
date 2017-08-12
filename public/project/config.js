(function () {
    angular
        .module("rhythmShark")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/profile/:userId/playlist", {
                templateUrl: "views/playlist/templates/playlist.view.client.html",
                controller: "playlistController",
                controllerAs: "model"
            })
            .when("/profile/:userId/playlist/new", {
                templateUrl: "views/playlist/templates/new-playlist.view.client.html",
                controller: "newPlaylistController",
                controllerAs: "model"
            });
    }
})();