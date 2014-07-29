/**
 * Created by dimitry.friedman on 7/29/2014.
 */
(function (window, angular) {
    angular.module('app', [])
        .controller('MyAmpersandController', function ($scope) {
            $scope.doSmth = function (msg) {
                console.log(msg);

            }
        })
        .directive('myAmpersandDirective', function () {

            return{
                restrict: 'A',
                scope: {
                    dosmth: "&"
                },
                template: '</br><input type="text" ng-model="myInput"/></br> {{myInput}}</br><button class="btn btn-primary" ng-click="dosmth({value:myInput})">Click</button>'
            };

        })
        .controller('EqualsController',function($scope){
            $scope.myFlavor="tut";


        })
        .directive('equalDirective',function(){
            return {
                scope:{
                    flavor:'='
                },
                template:'<div><input type="text" ng-model="flavor"/></div>'

            }
        })


        .controller('AtController',function($scope){
            $scope.myFlavor='default'
        })
        .directive('atDirective',function(){
            return {
                scope:{
                    flavor:"@"
                },
                template:'<div>{{flavor}}</div>',
            }
        })

        .controller('TransclueController',function(){

        })
        .directive('transcludeDirective',function(){
            return{
                restrict:"E",
                transclude: true,
                template:'<div class="panel panel-primary" ng-transclude><h2>This is panel component</h2></div>'

            }
        })


})(window, angular);