(function () {

    // controllers and configs return the app itself, so they do not all need to be declared
    angular
        .module("my-app")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateURL: "/views/user/login.view.client.html"
            })
            .when("/register", {
                templateURL: "/views/user/register.view.client.html"
            })
            // : refers to a place holder with the name userId
            .when("/profile/:userId", {
                templateURL: "/views/user/profile.view.client.html"
            });
    }

})();