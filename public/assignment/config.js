(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", "/default", {
                templateURL: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateURL: "views/user/register.view.client.html"
            })
            // : refers to a place holder with the name userId
            .when("/profile/:userId", {
                templateURL: "views/user/profile.view.client.html"
            })
            .when("/profile/:userId/website", {
                templateURL: "views/website/website-list.view.client.html"
            })
            .when("/profile/:userId/website/new", {
                templateURL: "views/website/website-new.view.client.html"
            })
            .when("/profile/:userId/website/:websiteId", {
                templateURL: "views/website/website-list.view.client.html"
            });
    }

})();