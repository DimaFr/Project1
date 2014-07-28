/**
 * Created by admin on 7/23/14.
 */
(function(){
    var app = angular.module('app',[])

    app.controller('parent',function($scope){
        $scope.msg = console.log('scope message')

    })
    app.directive('table',function(){
        return{
            scope:{
                config:'='
            },
            template:'<div>{{config}}</div>'
        }
    })



}())