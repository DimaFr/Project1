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
                    scope.$watch(attr.dfSwitch, function (value) {
                        console.log(attr.dfSwitch + " " + value);
                        scope.$eval(attr.change);
                        if (value) {
//unhide relevant

                           // dfSwitchController.cases = value;
                            console.log("Case: " + dfSwitchController.cases);

                        }
                    })

                }
            }

        })
        .directive('dfSwitchWhen', function () {
            return{
//all should be hidden
                transclude: 'element',
                require: '^dfSwitch',
//                controller: ['$scope',function dfSwitchWhenController() {
//                }],
                link: function (scope, e, attr, ctrl) {
                    console.log(attr.dfSwithWhen);
                    console.log(ctrl.cases);

                }
            }
        })
        .directive('dfSwitchDefault', function () {
            return{
//all should be hidden

                require: '^dfSwitch',
//                controller: ['$scope',function dfSwitchWhenController() {
//                }],
                link: function (scope, e, att, ctrl) {

                    scope.$watch(ctrl.cases, function (value) {
                        console.log(value);
                    })
                    console.log(ctrl.cases.length);
                    if (ctrl.cases.length == 0) {
                        e.css('visibility', 'visible');
                    } else {
                        e.css('visibility', 'hidden');
                    }
                }
            }
        })

})(window, angular);