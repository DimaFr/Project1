/**
 * Created by dimitry.friedman on 7/14/2014.
 */
(function (angular, window) {

    var app = angular.module('TaskManager', []);

    app.controller('TaskMangerController', function ($scope) {

        $scope.$on('addTask', function () {

            $scope.$broadcast('newTask');
        });
        $scope.$on('editTask', function (event, data) {
            $scope.$broadcast('oldTask', data);
        })

    })

    app.controller('TaskFormController', function ($scope, DataService) {
        $scope.tasks = DataService.RestoreState();
        //should pass task from model??? or use this
        $scope.addTask = function (t) {
            if ($scope.tasks.indexOf(t) == -1) {
                $scope.tasks.push(t);
                DataService.SaveState($scope.tasks);
                $scope.$emit('addTask');
            }
//            DataService.SaveState(this.tasks);
            $scope.task = {};
        };
        $scope.$on('oldTask', function (event, data) {
            $scope.task = data;
        });
    })

    app.controller('TaskTableController', function ($scope, DataService) {

        $scope.tasks = DataService.RestoreState();

        $scope.$on('newTask', function (event, data) {
            $scope.tasks = DataService.RestoreState();
        });
        //listens to check box
        $scope.updateWithTask = function (task) {
            var taskIndex = $scope.tasks.indexOf(task);
            $scope.tasks[taskIndex] = task;
            DataService.SaveState($scope.tasks);
        };
        $scope.removeTask = function (task) {
            console.log("remove task ");
            //remove from array
            //find index
            var taskIndex = $scope.tasks.indexOf(task);
            $scope.tasks.splice(taskIndex, 1);
            //remove from locale storage
            DataService.SaveState($scope.tasks);
        };
        $scope.editTask = function (t) {
            $scope.task = $scope.tasks[$scope.tasks.indexOf(t)];

            //emit task for editing
            $scope.$emit('editTask', $scope.task);
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
        return {
            model: _model,
            SaveState: _saveState,
            RestoreState: _restoreState
        };
    });


})(angular, window);