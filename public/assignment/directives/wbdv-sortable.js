(function () {
    angular
        .module("yungDirectives", [])
        .directive("widgetList", widgetListDirective);

    function widgetListDirective($http, widgetService) {
        function linkFunction(scope, element) {

            var widgetList = element.find("div");
            var initial = -1;
            widgetList.sortable({
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    var final = $(ui.item).index();
                    $http.put("/page/" + widgetService.model.pageId + "/widget?initial=" + initial + "&final=" + final);
                }
            });
        }
        return {
            templateUrl: "views/widget/templates/widget-list.html",
            link: linkFunction
        }
    }

})();