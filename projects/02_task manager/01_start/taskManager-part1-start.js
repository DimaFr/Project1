/**
 * Created by dimitry.friedman on 7/14/2014.
 */
(function (angular, window) {

    var app = angular.module('TaskManager', []);

    app.controller('MainController', function () {


    })

    app.controller('TaskTableController', function ($scope,DataService) {

        $scope.tasks = DataService.RestoreState();
        //listens to check box
        $scope.updateWithTask = function (task) {
            var taskIndex = $scope.tasks.indexOf(task);
            $scope.tasks[taskIndex] = task;
            DataService.SaveState($scope.tasks);
        };


    })
    /*
    SERVICES
    */
    app.factory("DataService", function () {
        var _model = [];
        var _saveState = function (model) {
            localStorage.dataService = angular.toJson(model);
        };
        var _restoreState = function () {
            //return saved data or empty array
            _model = angular.fromJson(localStorage.dataService) || [];
            return _model;
        }
        var DataService = {
            model: _model,
            SaveState: _saveState,
            RestoreState: _restoreState
        }
        return DataService;
    });


})(angular, window);