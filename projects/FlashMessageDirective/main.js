/**
 * Created by dimitry.friedman on 8/4/2015.
 */
(function (window, angular) {
    angular.module('app',[])

        .directive ('flashLabel',function(){
        return {
            restrict:"A",
            template: "<div ng-show=''>This is my label: select one or two images.</div>",
            link: function(scope, e, attr, ctrl){
                alert("here is my label");
                console.log(attr);
            }

        }
    })




})(window, angular);