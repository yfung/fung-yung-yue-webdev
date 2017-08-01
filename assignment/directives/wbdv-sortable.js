(function () {
    angular
        .module("yungDirectives", [])
        .directive("widgetList", widgetListDirective);

    function widgetListDirective() {
        function linkFunction(scope, element) {

            var widgetList = element.find("widget-list");
            widgetList.sortable({
                start: function (event, ui) {
                    var initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    var final = $(ui.item).index();
                    $http.put("/page/:pageId/widget?initial=" + initial + "&final=" + final);
                }
            });

        }
        return {
            templateURL: "",
            link: linkFunction
        }
    }

});

/*var app = require("../../express");

app.put("/page/:pageId/widget", sortWidgets);

function sortWidgets(request, response) {
    var initial = request.query.initial;
    var final = request.query.final;

}*/