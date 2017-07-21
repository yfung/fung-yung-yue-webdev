(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateURL: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateURL: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            // : refers to a place holder with the name userId
            .when("/user/:userId", {
                templateURL: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
                templateURL: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateURL: "views/website/templates/website-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId", {
                templateURL: "views/website/templates/website-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateURL: "views/page/templates/page-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateURL: "views/page/templates/page-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateURL: "views/page/templates/page-edit.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateURL: "views/page/templates/widget-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateURL: "views/page/templates/widget-choose.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateURL: "views/page/templates/widget-edit.view.client.html"
            });
    }
})();