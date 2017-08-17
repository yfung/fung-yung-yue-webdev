(function () {
    angular
        .module("rhythmShark")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    currentUser: homeCheck
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    currentUser: loginRegCheck
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model",
                resolve: {
                    currentUser: loginRegCheck
                }
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community/playlist", {
                templateUrl: "views/playlist/templates/playlist.view.client.html",
                controller: "playlistController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community/playlist/new", {
                templateUrl: "views/playlist/templates/new-playlist.view.client.html",
                controller: "newPlaylistController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community/playlist/:playlistId", {
                templateUrl: "views/playlist/templates/playlist-detail.view.client.html",
                controller: "playlistDetailController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community/search", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community/track/:trackID", {
                templateUrl: "views/search/templates/track.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community", {
                templateUrl: "views/user/templates/community.view.client.html",
                controller: "communityController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/community/:userId", {
                templateUrl: "views/user/templates/community-profile.view.client.html",
                controller: "communityUserController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            });

        function checkLogin(userService, $q, $location) {
            var deferred = $q.defer();
            userService
                .checkLogin()
                .then(function (user) {
                    if (user === "0") {
                        deferred.reject();
                        $location.url("/login");
                    } else {
                        deferred.resolve(user);
                    }
                });
            return deferred.promise;
        }

        function loginRegCheck(userService, $q, $location) {
            var deferred = $q.defer();
            userService
                .checkLogin()
                .then(function (user) {
                    if (user !== "0") {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve(user);
                    }
                });
            return deferred.promise;
        }

        function homeCheck(userService, $q) {
            var deferred = $q.defer();
            userService
                .checkLogin()
                .then(function (user) {
                    if (user === "0") {
                        deferred.resolve(null);
                    } else {
                        deferred.resolve(user);
                    }
                });
            return deferred.promise;
        }
    }
})();