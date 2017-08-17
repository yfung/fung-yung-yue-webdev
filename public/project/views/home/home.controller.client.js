(function() {
    angular
        .module("rhythmShark")
        .controller("homeController", homeController);

    function homeController(currentUser, userService) {
        var model = this;
        model.logOut = logOut;

        function init() {
            if(currentUser !== null) {
                model.currentUser = currentUser;
                if (model.currentUser.firstName === null || model.currentUser.lastName === null || model.currentUser.lastName === "" || model.currentUser.firstName === "") {
                    model.welcomeMessage = "Welcome Back " + model.currentUser.username;
                } else {
                    model.welcomeMessage = "Welcome Back " + model.currentUser.firstName + " " + model.currentUser.lastName;
                }
            }
        }
        init();

        function logOut() {
            userService.logOut()
                .then(function (response) {
                    window.location.reload(true);
                });
        }

    }

})();