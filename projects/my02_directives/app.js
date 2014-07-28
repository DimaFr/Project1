/**
 * Created by admin on 7/21/14.
 */
(function () {

    var app = angular.module('app', []);

    app.config(function () {
        console.log('config')
    })

    app.run(function () {
        console.log('run phase')
    })

    app.value('five', 5)

    app.directive('dfInit', function () {
        return{
            compile: function (tElement, tAttr) {
                console.log('directive compile')
                //console.log(tAttr);
                return{
                    pre: function (scope, e, att) {
                        scope.$eval(att.dfInit)
                        // console.log(scope.$eval(att.dfInit))
                        console.log('pre link')
                    },
                    post: function (scope, e, att) {
                        console.log('post link')
                    }
                }
            }
        }
    });

    app.directive('dfClick', function () {
        return {

            controller: function (five) {
                console.log('directive controller')
                console.log(five)
            },
            compile: function (tElement, tAttr) {
                //console.log(tAttr)
                console.log('directive compile')
                return {
                    pre: function (scope, e, att) {
                        //no need to evaluate if yes - value changes
                        //scope.$eval(att.dfClick)
                        console.log('pre link')
                    },
                    post: function (scope, e, att) {

                        e.on('click', function () {
                            console.log('post link')
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
                // console.log(tAttr)
                //  console.log('directive compile')
                return {
                    pre: function (scope, e, att) {
                        scope.$eval(att.dfShow)
                        //  console.log('pre link')
                    },
                    post: function (scope, e, att) {
                        scope.$watch(att.dfShow, function (dfShow) {
                            //console.log(dfShow + " watch dfShow");
                            //  console.log('post link')
                            dfShow ? e.css('visibility', 'visible') : e.css('visibility', 'hidden')
                        })
                    }
                }
            }
        }
    });

    app.directive('dfInclude', function ($http) {
        return {
            compile: function (tElement, tAttr) {
                // console.log(tAttr)
                return {
                    pre: function (scope, e, att) {
                        //scope.eval(att.dfInclude);
                    },
                    post: function (scope, e, att) {
                        $http.get(att.dfInclude).then(function (result) {
                            e.append(result.data);
                        })
                    }
                }
            }
        }
    });

    app.directive('dfSwitch',function(){
        return {

        }
    })


}())