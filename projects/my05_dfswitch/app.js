/**
 * Created by dimitry.friedman on 7/28/2014.
 */
(function (window, angular) {
    angular.module('app', [])

        .directive('dfSwitch', function () {
            return {
                restrict: 'AE',
                //require: 'dfSwitch',
                controller: ['$scope', function dfSwitchController() {
                    this.cases = [];
                }],

                link: function (scope, e, attr, dfSwitchController) {
                    var watchExpr = attr.dfSwitch;

                    scope.$watch(watchExpr, function (value) {
                        //recieves a, b or c
                        console.log(value);
                        //console.log(e.children());
                        //remove previous child
                        e.children().remove();

                        //console.log(dfSwitchController.cases)
                        //eterate array of objects with options and elements
                        angular.forEach(dfSwitchController.cases, function (currentCase) {
                        //compare option with switch value and append relevant as child
                            if (currentCase.switchOption == value) {
                                e.append(currentCase.clone);
                            } else {
                                if (!value && currentCase.switchOption == "") {
                                    e.append(currentCase.clone);
                                }
                            }
                        })

                    })

                }
            }

        })

        .directive('dfSwitchWhen', function () {
            return{
                require: '^dfSwitch',
                link: function (scope, e, attr, ctrl) {
                    console.log(attr.dfSwitchWhen)
                    //push object with option value and element to array
                    ctrl.cases.push({switchOption: attr.dfSwitchWhen, clone: e});
                }
            }
        })
        .directive('dfSwitchDefault', function () {
            return{
                require: '^dfSwitch',
                link: function (scope, e, attr, ctrl) {
                    console.log(attr.dfSwitchDefault);
                    //push object with option value and element to array
                    ctrl.cases.push({switchOption: attr.dfSwitchDefault, clone: e})
                }
            }
        })
    /* this is version which tries to use transclude*/

//        .directive('dfSwitchWhen', function () {
//            return{
//
//                transclude: 'element',
//                require: '^dfSwitch',
//
//
//                link: function (scope, e, attr, ctrl, linker) {
//                    //logs option value
//                    console.log(attr.dfSwitchWhen)
//                    //logs clone
//                    console.log(linker());
//
//                    ctrl.cases.push({switchOption: attr.dfSwitchWhen, clone: linker()});
//                    //logs comment
//                    //console.log(e)
//                }
//            }
//        })

//        .directive('dfSwitchDefault', function () {
//            return{
////all should be hidden
//                transclude: 'element',
//                require: '^dfSwitch',
//
//                link: function (scope, e, attr, ctrl,linker) {
//
//                    console.log(attr.dfSwitchDefault);
//                    ctrl.cases.push({switchOption: attr.dfSwitchDefault, clone: linker()})
//                }
//            }
//        })


})(window, angular);