(function() {
    angular
        .module("rhythmShark")
        .controller("homeController", homeController);

    function homeController(currentUser) {
        var model = this;
        model.user = currentUser;

        function init() {

        }
        init();
    }

})();