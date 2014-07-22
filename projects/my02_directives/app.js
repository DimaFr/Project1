/**
 * Created by admin on 7/21/14.
 */
(function () {

    var app = angular.module('app', []);

    app.directive('dfInit', function () {
        return{
            compile: function (tElement, tAttr) {

                console.log(tAttr);
                return{
                    pre: function (scope, e, att) {
                        scope.$eval(att.dfInit)
                        console.log(scope.$eval(att.dfInit))

                    },
                    post: function (scope, e, att) {
                    }
                }
            }
        }
    });

    app.directive('dfClick', function () {
        return {
            compile: function (tElement, tAttr) {
                console.log(tAttr)
                return {
                    pre: function (scope, e, att) {
                        //no need to evaluate if yes - value changes
                        //scope.$eval(att.dfClick)
                    },
                    post: function (scope, e, att) {

                        e.on('click', function () {
                            //change value
                            scope.$eval(att.dfClick)
                            //refresh to see change other scope
                            scope.$apply();
                        })
                    }
                }
            }
        }
    });
    app.directive('dfShow', function () {
        return {
            compile: function (tElement, tAttr) {
                console.log(tAttr)
                return {
                    pre: function (scope, e, att) {
                        scope.$eval(att.dfShow)
                    },
                    post: function (scope, e, att) {
                        scope.$watch(att.dfShow, function (dfShow) {
                            console.log(dfShow + " watch dfShow");
                            dfShow ? e.css('visibility', 'visible') : e.css('visibility', 'hidden')
                        })
                    }
                }
            }
        }
    });


}())