/**
 * Created by dimitry.friedman on 7/28/2014.
 */
(function (window, angular) {
    angular.module('app', [])

        .directive('dfSwitch', function () {
            return {
                restrict: 'AE',
                require: 'dfSwitch',
                controller: ['$scope', function dfSwitchController() {
                    this.cases = [];
                }],

                link: function (scope, e, attr, dfSwitchController) {
                    var watchExpr = attr.dfSwitch;

                    scope.$watch(watchExpr,function(value){
                        //recieves a, b or c
                        console.log(value);
                        console.log(dfSwitchController.cases)
                    })

                }
            }

        })
        .directive('dfSwitchWhen', function () {
            return{

                transclude: 'element',
                require: '^dfSwitch',


                link: function (scope, e, attr, ctrl, linker) {
                    //logs clone
                    console.log(linker());
                    ctrl.cases.push(linker());
                    //logs comment
                    console.log(e)
                }
            }
        })
        .directive('dfSwitchDefault', function () {
            return{
//all should be hidden

                require: '^dfSwitch',

                link: function (scope, e, att, ctrl) {

                  }
            }
        })


})(window, angular);