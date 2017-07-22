(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("yungApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
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
            // : refers to a place holder with the name userId
            .when("/user/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/templates/website-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/page/templates/page-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/page/templates/page-edit.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/page/templates/widget-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl: "views/page/templates/widget-choose.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl: "views/page/templates/widget-edit.view.client.html"
            });
    }
})();