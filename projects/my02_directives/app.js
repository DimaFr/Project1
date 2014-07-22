/**
 * Created by admin on 7/21/14.
 */
(function(){

    var app=angular.module('app',[]);

    app.directive('dfInit',function(){
        return{
            compile:function(tElement,tAttr){

                console.log(tAttr);
                return{
                    pre:function(scope,e,att){
                       scope.$eval(att.dfInit)
                       console.log(scope.$eval(att.dfInit))

                    },
                    post:function(scope,e,att){

                    }
                }
            }
        }
    });

    app.directive('dfClick',function(){
       return {
//again $eval      scope.$apply(scope.$eval(attr.dfClick))
//!!!!! apply - in custom directive we need to refresh scope to see the change on click
       }
    });

    //dfshow  use scope.watch element if show then .css visibility visible if not css.hidden

}())