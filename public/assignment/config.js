(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", "/default", {
                templateURL: "views/user/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateURL: "views/user/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            // : refers to a place holder with the name userId
            .when("/user/:userId", {
                templateURL: "views/user/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateURL: "views/website/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateURL: "views/website/website-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId", {
                templateURL: "views/website/website-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateURL: "views/page/page-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateURL: "views/page/page-new.view.client.html"
            });
    }
})();