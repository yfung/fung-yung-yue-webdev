(function () {
    angular
        .module("rhythmShark")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.html",
                controller: "phomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "ploginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "pregisterController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "pprofileController",
                controllerAs: "model"
            });
    }
})();