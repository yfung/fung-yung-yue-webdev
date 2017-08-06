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
            });
    }
})();