/**
 * Created by admin on 7/26/14.
 */


    var app = angular.module('app', []);

    app.provider('myMsg', function () {
        var msg = "this is configurable message";
        this.configMsg = function(otherMsg) {
            msg = otherMsg;
        };

    this.$get = function () {
        return {
            getMsg: function () {
                return msg;
            }
        }
    }
    });
    app.config(['myMsgProvider',function(myMsgProvider){
        myMsgProvider.configMsg('new configured Msg');
    }]);

    app.run(['$rootScope','myMsg',function($rootScope,myMsg){
        $rootScope.msg =myMsg.getMsg();
    }]);


