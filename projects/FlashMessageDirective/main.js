/**
 * Created by dimitry.friedman on 8/4/2015.
 */
(function (window, angular) {
    angular.module('app',[])

        .directive ('flashLabel',function(){
        return {
            restrict:"E",
            template: "<div>This is my label: select one or two images.</div>"
        }
    })




})(window, angular);